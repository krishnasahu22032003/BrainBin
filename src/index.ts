import express from "express"
import mongoose from "mongoose"
import jwt from "jsonwebtoken"
import { z } from "zod"
import { UserModel } from "./db"
import bcrypt from "bcrypt"
const app = express()
app.use(express.json());
app.post("/api/v1/signup", async(req, res) => {
    const requiredbody = z.object({
        email: z.email().min(5).max(50),
        password: z.string().min(5).max(50).regex(/[a-z]/).regex(/[A-Z]/),
    })
    const parsedata=requiredbody.safeParse(req.body)
    if(!parsedata.success){
        res.status(401).json({
            Message:"incorrect credentials"
        })
return
    }
        const email = req.body.email;
    const password = req.body.password
    let thrownerror=false
    try{
        const hashedpassword=await bcrypt.hash(password,5)
        console.log(hashedpassword)
        await UserModel.create({
            email:email,
            password:hashedpassword
        })
    }catch(e){
        res.status(411).json({
            Message:"User already exists"
        })
        thrownerror=true
    }
if(!thrownerror){
    res.status(200).json({
        Message:"you are signed up"
    })
}
})


app.post("/api/v1/signin", (req, res) => {

})

app.listen(3000)