import express from "express"
import mongoose from "mongoose"
import jwt from "jsonwebtoken"
import {z} from "zod"
import { UserModel } from "./db"

const app = express()

app.post("/api/v1/signup",(req,res)=>{
const requiredbody=z.object({
    email:z.email().min(5).max(50),
 password: z.string().min(5).max(50).regex(/[a-z]/).regex(/[A-Z]/),
})
const email= req.body.email;
const password=req.body.password
UserModel.create({
    
})
})  


app.post("/api/v1/signin",(req,res)=>{

})

