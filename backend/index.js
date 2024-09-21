import express from "express";
import env from "dotenv";
import mongoose from "mongoose";
import {Book} from "./models/booksModel.js"
import bookRoutes from "./routes/bookRoutes.js";
import cors from "cors";
env.config();
const app=express();
const mongodbURL=process.env.MONGODB_URL;
app.use(express.json());
app.use(cors())

app.use("/books", bookRoutes);


mongoose.connect(mongodbURL)
    .then(()=>{
        console.log("DB Connection Successful")
    })
    .catch((error)=>{
        console.log("Failed DB connection",error)
    })

app.get("/",function(request,response){
    console.log("request");
    return response.status(200).send("Welcome");
});

app.listen(process.env.PORT,()=>{
    console.log(`App is listening on ${process.env.PORT}`);
});