import mongoose from "mongoose";
import User from "./models/user.js";
import "dotenv/config";

main().catch(err => console.log("Error", err));

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/vantix");
    console.log("Connected to MongoDB");
}

let userId = await User.findOne({ email: "monkeydluffypk95@gmail.com" });
console.log(typeof userId.id);