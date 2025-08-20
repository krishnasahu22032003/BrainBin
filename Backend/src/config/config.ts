import dotenv from "dotenv";
dotenv.config();

const JWT_USER_SECRET = process.env.JWT_USER_SECRET || "dev_secret"; 
// ✅ always fallback to string

export default JWT_USER_SECRET;
