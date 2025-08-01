import mongoose, { Schema, model } from "mongoose";
import dotenv from "dotenv";
dotenv.config();


mongoose
  .connect(process.env.MONGO_URL as string)
  .then(() => {
    console.log("✅ Connected to MongoDB");
  })
  .catch((err) => {
    console.error("❌ Failed to connect to MongoDB:", err);
  });

// User Schema
const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Content Schema
const ContentSchema = new Schema({
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
    type: [String],
    enum: ["productivity", "politics"],
    default: [],
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  // Add optional fields for sharing if needed here too
  shareId: {
    type: String,
    unique: true,
    sparse: true,
  },
  isShared: {
    type: Boolean,
    default: false,
  },
  shareExpiry: Date,
  accessCount: {
    type: Number,
    default: 0,
  },
});

// Share Schema (if you’re using a separate collection)
const ShareSchema = new Schema({
  content: { type: String }, // or contentId: { type: mongoose.Schema.Types.ObjectId, ref: 'content' }
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  shareId: {
    type: String,
    unique: true,
    sparse: true,
  },
  accessCount: {
    type: Number,
    default: 0, 
  },
  shareExpiry: Date,
  isShared: {
    type: Boolean, 
    default: false,
  },
});
ContentSchema.set("toJSON", {
  transform: function (doc, ret:any) {
    delete ret.shareId;
    delete ret.isShared;
    delete ret.shareExpiry;
    delete ret.accessCount;
    return ret;
  },
});

// ✅ Models
export const UserModel = model("User", UserSchema);
export const ContentModel = model("content", ContentSchema);
export const ShareModel = model("share", ShareSchema);
