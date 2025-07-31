import mongoose, { Schema, model } from "mongoose";

mongoose.connect("mongodb+srv://krishnasahuwork:krishna22032003k@cluster0.gygsits.mongodb.net/BrainBinApp")


const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

export const UserModel = model("User", UserSchema);
