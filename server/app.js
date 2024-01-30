import express from "express";
import dotenv from 'dotenv';
import morgan from 'morgan'
import appRouter from "./routes/index.js";
import cookieParser from "cookie-parser";
import cors from "cors"


const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }))
dotenv.config();
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET))

// remove it on production  
app.use(morgan("dev"))

app.use("/api/v1", appRouter);

app.get('/',(req, res)=>{
    res.json("hello")
})

export default app;