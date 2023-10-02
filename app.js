import  express  from "express";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import addRouter from "./routes/addStudent.js";
import searchRouter from "./routes/findStudent.js";
import { errorMiddleware } from "./middlewares/error.js";



export const app=express();

config({
    path:"./data/config.env",
});

//middlewares 
app.use(express.json());//accept data in req.body
app.use(cookieParser());//accept req.cookie;

app.use(
    cors({
      origin: "http://localhost:5173",
      credentials: true,
    })
  );

//routes 
app.use("/api/v1/new",addRouter);
app.use("/api/v1/find",searchRouter);

app.get("*",(req,resp)=>{
    resp.send("This page is not Found/ 404 Eror ");
});


// using error middlewares
app.use(errorMiddleware);
