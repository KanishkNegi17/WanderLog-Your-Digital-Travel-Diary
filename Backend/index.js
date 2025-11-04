import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import path from "path"
import cors from "cors"

import authRoutes from "./routes/auth.route.js"
import userRoutes from "./routes/user.route.js"
import travelStoryRoutes from "./routes/travelStory.route.js"
import { fileURLToPath } from "url"


dotenv.config()

mongoose.connect(process.env.MONGO_URI).then(()=>{console.log("Database Is Connected")}).catch((err)=>{console.log(err)})

const app = express() 
const frontendUrl = process.env.FRONTEND_URL;
const allowedOrigins = [
  "http://localhost:5173", // Your local frontend
  frontendUrl  // Your deployed Vercel URL (we'll add this to Vercel's settings)
];

app.use(cors({
    //origin: "http://localhost:5173",//frontend URL
    origin: function(origin,callback){
        if(!origin) return callback(null,true);
        
        if (allowedOrigins.indexOf(origin) === -1) {
        const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    methods: ["GET","POST","PUT","DELETE"],
    credentials:true,
}))
app.use(cookieParser())

//for allowing json object in req body
app.use(express.json())

const PORT = process.env.PORT || 3000; 

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}`);
});

// app.listen(3000, ()=>{
//     console.log("Server is Running on Port 3000")
// })

app.use("/api/auth", authRoutes)
app.use("/api/user", userRoutes)  
app.use("/api/travel-story", travelStoryRoutes)  

//Accessing static files images

const __filename= fileURLToPath(import.meta.url)
const __dirname= path.dirname(__filename)

app.use("/uploads", express.static(path.join(__dirname,"uploads")))  
app.use("/assets", express.static(path.join(__dirname,"assets")))  

app.use((err, req, res, next )=>{
    const statusCode = err.statusCode || 500

    const message = err.message || "Internal Server Error"

    res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    })
})