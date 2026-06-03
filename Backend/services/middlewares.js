import { verifyAccessToken } from "./jwtService.js";


export function authenticateToken(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        console.log("Auth header not found");
        return res.status(401).json({ message: "Unauthorized" });
    }
    const token = authHeader.split(" ")[1];
    const decoded = verifyAccessToken(token);
    if (!decoded) {
        console.log("Invalid token");
        return res.status(403).json({ message: "Forbidden" });
    }
    console.log("User verified successfully");
    req.userId = decoded;
    next();
}