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
  const token = req.headers.token || req.headers.authorization;

  if (!token) {
    return res.status(401).json({
      message: "Token is not present"
    });
  }

  try {
    const decoded = verify(token as string , JWT_USER_SECRET as string) as JwtPayload;
    req.userId = decoded.id; // assuming your token includes `id` field
    next();
  } catch (error) {
    console.error("Token verification failed:", error);
    return res.status(403).json({
      message: "Invalid or expired token"
    });
  }
}
export default usermiddleware
