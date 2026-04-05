import express from "express";
import mongoose from "mongoose";
import Order from "./models/order.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import client from "./configs/redisClient.mjs";
import { initWebSockets } from "./services/webSocketsService.js";
import { getGoogleAuthURL, getGoogleUserInfo } from "./services/googleAuthService.js";
import { generateAccessToken, verifyAccessToken, generateRefreshToken } from "./services/jwtService.js";
import "dotenv/config";

const app = express();
const port = 3000;

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/vantix");
    console.log("Connected to MongoDB");
}

app.get("/auth/google", async (req, res) => {
    const authUrl = getGoogleAuthURL();
    res.redirect(authUrl);
})

app.get("/api/auth/google/callback", async (req, res) => {
    const { code } = req.query;
    const user = await getGoogleUserInfo(code);
    console.log(user);
    const token = generateRefreshToken();
    res.cookie("refreshToken", token, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 5 * 60 * 1000
    })
    client.set("refreshToken", token, {
        EX: 60
    })
    res.redirect("http://localhost:5173/terminal")
})

app.get("/api/token/refresh", async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    const storedToken = await client.get("refreshToken");
    if (refreshToken !== storedToken) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    const token = generateAccessToken({ name: "Aryan", age: "19" });
    console.log("Called /refresh", token);
    res.send(token);
})

app.get("/api/token/verify", (req, res) => {
    const token = req.headers.authorization;
    const decoded = verifyAccessToken(token);
    if (decoded) {
        res.json(decoded);
    } else {
        res.status(401).json({ message: "Unauthorized" });
    }
})

app.get("/signout", async (req, res) => {
    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: true,
        sameSite: "strict"
    });
    await client.del("refreshToken");
    res.send({ success: true });
})

app.post("/orders", async (req, res) => {
    const data = req.body;
    console.log(data);
    let newOrder = new Order(data);
    await newOrder.save();
    console.log("Order saved successfully");
})

app.get("/orders", async (req, res) => {
    const orders = await Order.find();
    res.json(orders);
})

app.get("/set", async (req, res) => {
    await client.set("name", "Aryan");
    res.send("Set successfully");
})

app.get("/get", async (req, res) => {
    const keys = await client.keys("*");
    const data = keys.map(async (key) => {
        return await client.get(key);
    })
    res.send({ "keys": keys, "values": data });
})

const server = app.listen(port, () => {
    console.log("Listening to localhost:3000")
})

const ws = initWebSockets(server);