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
    enum: ["document", "tweet", "youtube", "link", "instagram", "facebook"],
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
    default: [],
  },
  description: {
    type:[String],
    default:[]
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  accessCount: {
    type: Number,
    default: 0,
  }
},{ timestamps: true });

// Share Schema (if you’re using a separate collection)
const shareSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    shareId: {
      type: String,
      required: true,
      unique: true,
    },
    shareExpiry: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

ContentSchema.set("toJSON", {
  transform: function (doc, ret: any) {
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
export const ShareModel = model("Share", shareSchema);
