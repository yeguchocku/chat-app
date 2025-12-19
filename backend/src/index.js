import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import authRoutes from "./routes/auth.route.js";
import { connectDB } from "./lib/db.js";
import messageRoutes from "./routes/message.route.js";
import{app,server} from "./lib/socket.js"

dotenv.config();

const PORT = process.env.PORT
const __dirname = path.resolve();
app.use(express.json());
app.use(cookieParser());
/* ✅ REQUIRED MIDDLEWARE */
app.use(cors({
  origin: "http://localhost:3000", // frontend URL
  credentials: true
}));



/* ✅ ROUTES */
app.use("/api/auth", authRoutes);
app.use("/api/messages",messageRoutes);
if(process.env.NODE_ENV =="production" ){
  app.use(express.static(path.join(__dirname,"../frontend/dist")));

  app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,"../frontend","dist","index.html"));
  })
}
/* ✅ START SERVER + DB */
server.listen(PORT, () => {
  console.log("server is running on PORT:" + PORT);
  connectDB();
});
