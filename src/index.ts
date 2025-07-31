import express from "express"
import mongoose from "mongoose"
import jwt from "jsonwebtoken"
import { z } from "zod"
import { UserModel,ContentModel } from "./db"
import bcrypt from "bcrypt"
import usermiddleware from "./middleware"
import JWT_USER_SECRET from "./config/config"

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


app.post("/api/v1/signin", async(req, res) => {
const email=req.body.email
const password=req.body.password
const user = await UserModel.findOne({
    email:email
})
if(!user){
res.status(403).json({
    Message:"User does not exists"
})
return
}
const comparedpassword =await bcrypt.compare(password,user.password)
console.log(user)
if(comparedpassword){
    const token = jwt.sign({id:user._id},JWT_USER_SECRET as any)

    res.json({
        token:token
    })
}else{
    res.status(403).json({
        Message:"incorrect credentials"
    })
}
})
app.post("/api/v1/content",usermiddleware,async(req,res)=>{
  const { type, link, title, tags } = req.body;

  try {
    const content = await ContentModel.create({
      link,
      title,
      tags,
      type,
      userId: req.userId, // ✅ Fixed this line
    });

    res.status(201).json({
      message: "Content created successfully",
      content,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating content",
      error: (error as Error).message,
    });
  }
})
app.listen(3000)