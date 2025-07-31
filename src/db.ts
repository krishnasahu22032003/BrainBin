import mongoose, { Schema, model } from "mongoose";

mongoose.connect("mongodb+srv://krishnasahuwork:krishna22032003k@cluster0.gygsits.mongodb.net/BrainBinApp")


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
});

const ContentModel = mongoose.model("Content", ContentSchema);
export default ContentModel;
export const UserModel = model("User", UserSchema);
