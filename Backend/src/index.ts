import express from "express"
import mongoose from "mongoose"
import jwt from "jsonwebtoken"
import { z } from "zod"
import { UserModel,ContentModel,ShareModel } from "./db"
import bcrypt from "bcrypt"
import usermiddleware from "./middleware"
import JWT_USER_SECRET from "./config/config"
import { nanoid } from "nanoid"
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
app.get("/api/v1/content",usermiddleware,async(req,res)=>{
 try {
    const userId = req.userId; // added by your middleware

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized: No user ID found" });
    }

    const content = await ContentModel.find({ userId }).populate("userId","email");

    res.status(200).json({
      success: true,
      content,
    });
  } catch (error) {
    console.error("Error fetching content:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
})
app.delete("/api/v1/content",usermiddleware,async(req,res)=>{
    const contentId=req.body.contentId;
    await ContentModel.deleteMany({
contentId,
userId:req.userId
    })
    res.json({
        Message:"deleted"
    })
})

app.post("/api/v1/share/:id", async (req, res) => {
  try {
    const content = await ContentModel.findById(req.params.id);
    if (!content) return res.status(404).json({ message: "Content not found" });

    content.shareId = content.shareId || nanoid(8);
    content.isShared = true;
    content.shareExpiry = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // optional
    await content.save();

    res.json({ url: `http://localhost:3000/share/${content.shareId}` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});
app.get("/share/:shareId", async (req, res) => {
  try {
    const content = await ContentModel.findOne({ shareId: req.params.shareId });

    if (!content || !content.isShared) {
      return res.status(404).json({ message: "Share not found" });
    }

    // Optional: Check for expiry
    if (content.shareExpiry && new Date() > content.shareExpiry) {
      return res.status(403).json({ message: "Share link expired" });
    }

    // Optional: Increment access count
    content.accessCount = (content.accessCount || 0) + 1;
    await content.save();

    res.json({ content });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});


app.listen(3000)