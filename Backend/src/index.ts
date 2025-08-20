import express from "express"
import jwt from "jsonwebtoken"
import { z } from "zod"
import { UserModel,ContentModel,ShareModel } from "./db"
import { auth, AuthRequest } from "./auth";
import bcrypt from "bcrypt"
import JWT_USER_SECRET from "./config/config"
import { nanoid } from "nanoid"
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express()
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173", // your React dev URL
  credentials: true,               // ✅ allow cookies
}));
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
app.get("/api/v1/me", auth, async (req: AuthRequest, res) => {
  const user = await UserModel.findById(req.userId).select("_id email");
  res.json({ user });
});


app.post("/api/v1/logout", (req, res) => {
  res.clearCookie("auth_token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  });
  res.json({ message: "Logged out" });
});

// backend/index.ts (or routes)
app.post("/api/v1/signin", async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });
  if (!user) return res.status(403).json({ message: "User does not exist" });

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.status(403).json({ message: "Incorrect credentials" });

  const token = jwt.sign({ id: user._id }, JWT_USER_SECRET, { expiresIn: "7d" });

  // ✅ Set cookie
  res.cookie("auth_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", 
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.json({ message: "Signin successful" });
});

app.post("/api/v1/content",auth,async(req,res)=>{
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
app.get("/api/v1/content",auth,async(req,res)=>{
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
app.delete("/api/v1/content",auth,async(req,res)=>{
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