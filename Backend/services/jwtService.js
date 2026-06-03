import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from 'uuid';
import "dotenv/config";

export function generateAccessToken(user) {
    const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: 60 * 5 });
    return token;
}

export function verifyAccessToken(token) {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded;
    } catch (error) {
        console.log("Error verifying access token:", error);
        return null;
    }
}

export function generateRefreshToken() {
    const refreshToken = uuidv4();
    return refreshToken;
}
