import express from "express"
import mongoose from "mongoose"
import bodyParser from "body-parser"
import dotenv from "dotenv"
import route from "./routes/userRoute.js"

const app = express();

app.use(bodyParser.json());
dotenv.config();
const PORT = 8000;
const MONGO_URL = "mongodb+srv://noddy:temp000@crud-api.xtov6fi.mongodb.net/?retryWrites=true&w=majority&appName=crud-api"


mongoose
    .connect(MONGO_URL)
    .then(()=>{
        console.log("Database connected successfully");
        app.listen(PORT, ()=>{
            console.log(`Server is running on port ${PORT}`);
        })
    })
    .catch((error)=> console.log(error));



app.use("/api/user", route);