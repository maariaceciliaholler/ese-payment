import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

const jwtSecret = process.env.JWT_SECRET || "default_jwt_secret";

export function checkAuth(req: Request, res: Response, next: NextFunction): void {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        res.status(401).json({ error: "Token não fornecido ou mal formatado." });
        return;
    }

    const token = authHeader.split(" ")[1];

    try {
        const payload = jwt.verify(token, jwtSecret) as JwtPayload;
        (req as any).user = payload;
        next();
    } catch (err) {
        res.status(403).json({ error: "Token inválido." });
    }
}
