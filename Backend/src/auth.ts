import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_USER_SECRET = process.env.JWT_USER_SECRET || "dev_secret";

export interface AuthRequest extends Request {
  userId?: string;
}

export const auth = (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.cookies?.auth_token;
  if (!token) return res.status(401).json({ message: "Not authenticated" });

  try {
    const payload = jwt.verify(token, JWT_USER_SECRET) as { id: string };
    req.userId = payload.id;
    next();
  } catch {
    return res.status(401).json({ message: "Invalid token" });
  }
};
