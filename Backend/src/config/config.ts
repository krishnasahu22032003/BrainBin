import dotenv from "dotenv"
dotenv.config()
const JWT_USER_SECRET=process.env.JWT_USER_SECRET
export default JWT_USER_SECRET