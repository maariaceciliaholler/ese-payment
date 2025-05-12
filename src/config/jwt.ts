import jwt, { Secret, SignOptions } from "jsonwebtoken";

const jwtSecret: Secret = process.env.JWT_SECRET || "default_jwt_secret";

export function verifyToken(token: string) {
    return jwt.verify(token, jwtSecret);
}
