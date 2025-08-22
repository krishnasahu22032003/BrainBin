// Optional auth middleware if not using cookies based auth

import { verify, JwtPayload } from "jsonwebtoken";
import JWT_USER_SECRET from "./config/config";
import { Request, Response, NextFunction } from "express";

declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

export function usermiddleware(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      message: "Token is not present or malformed",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = verify(token, JWT_USER_SECRET as string) as JwtPayload;
    req.userId = decoded.id; 
    next();
  } catch (error) {
    console.error("Token verification failed:", error);
    return res.status(403).json({
      message: "Invalid or expired token",
    });
  }
}

export default usermiddleware;
