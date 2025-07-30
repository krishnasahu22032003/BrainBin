import mongoose from "mongoose";
import { model,Schema } from "mongoose";
import { email, string } from "zod";

const UserSchema =new Schema({
    email:{type:string,unique:true},
    password:string
})

export const UserModel = model ("users",UserSchema);