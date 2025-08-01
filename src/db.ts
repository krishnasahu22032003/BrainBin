import mongoose, { Schema, model } from "mongoose";
import dotenv from "dotenv";
import { boolean } from "zod";
dotenv.config();
mongoose.connect(process.env.MONGO_URL as any)
  .then(() => {
    console.log("✅ Connected to MongoDB");
  })
  .catch((err) => {
    console.error("❌ Failed to connect to MongoDB:", err);
  });


const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const ContentSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["document", "tweet", "youtube", "link"],
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  tags: {
    type: [String], // Array of strings
    enum: ["productivity", "politics"],
    default: [],
  },
    userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true, // 👈 important to ensure it’s always there
  },
});
const ShareSchema = new mongoose.Schema({
  content:String,
  owner:mongoose.Schema.Types.ObjectId,
  shareId:{
    type:String,
    unique:true,
    sparse:true
  },
  accessCount:{
    type:Number,
    dafault:0,
  },
  shareExpiry:Date,
  isShared:{
    type:boolean,
    default:false
  }
})
export const ShareModel=model("share",ShareSchema)
export const ContentModel=model("content",ContentSchema);
export const UserModel = model("User", UserSchema);
