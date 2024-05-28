import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import route from "./routes/userRoute.js";

const app = express()

app.use(bodyParser.json())

const MONGO_URL = "mongodb://127.0.0.1:27017/backend-practice"

mongoose
    .connect(MONGO_URL)
    .then(()=>{
        console.log("Database connected successfully")
        app.listen(8000, ()=>{
            console.log("Server is running on port 8000")
        })
    })
    .catch((error)=> console.log(error));

app.use("/api/user", route)