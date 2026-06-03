import express from "express";
import mongoose from "mongoose";
import Order from "./models/order.js";
import User from "./models/user.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import ejs from "ejs";
import path from "path";
import client from "./configs/redisClient.mjs";
import { initWebSockets } from "./services/webSocketsService.js";
import { getGoogleAuthURL, getGoogleUserInfo } from "./services/googleAuthService.js";
import { generateAccessToken, verifyAccessToken, generateRefreshToken } from "./services/jwtService.js";
import { authenticateToken } from "./services/middlewares.js";
import "dotenv/config";

const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.set("views", path.join(path.resolve(), "views"));

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
        secure: false,
        sameSite: "lax",
        maxAge: 5 * 60 * 1000
    })
    let existingUser = await User.findOne({ email: user.email });
    if (!existingUser) {
        let newUser = new User(user);
        await newUser.save();
        console.log("User saved successfully");
    } else {
        console.log("User already exists");
    }
    let info = await User.findOne({ email: user.email });
    let id = info.id;
    await client.set(`refreshToken:${token}`, id, {
        EX: 5 * 60
    })
    res.redirect("http://localhost:5173/terminal");
})

app.get("/api/token/refresh", async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    const userId = await client.get(`refreshToken:${refreshToken}`);
    if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    const token = generateAccessToken({ userId });
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
        secure: false,
        sameSite: "lax"
    });
    await client.del("refreshToken");
    res.send({ success: true });
})

app.post("/orders", authenticateToken, async (req, res) => {
    const data = req.body;
    console.log(data);
    let newOrder = new Order(data);
    await newOrder.save();
    console.log("Order saved successfully");
    res.status(201).json({ message: "Order placed successfully", order: newOrder });
})

app.get("/orders", authenticateToken, async (req, res) => {
    const orders = await Order.find();
    res.json(orders);
})

app.patch("/orders/:id", authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        const updatedOrder = await Order.findByIdAndUpdate(id, { status: "CLOSED" });
        if (!updatedOrder) {
            return res.status(404).json({ message: "Order not found" });
        }
        console.log("Order updated successfully", updatedOrder);
        res.json({ message: "Order updated successfully", order: updatedOrder });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
})

app.get("/office", async (req, res) => {
    const data = await Order.find();
    res.render("office", { data });
})

// app.get("/set", async (req, res) => {
//     await client.set("name", "Aryan");
//     res.send("Set successfully");
// })

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