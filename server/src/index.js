import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import { verifySessionToken } from '../Routes/users.js'

import dotenv from 'dotenv'
dotenv.config()

import { blogRouter } from '../Routes/Posts.js'
import { userRouter } from '../Routes/users.js'

const app = express();

app.use(express.json())
app.use(cors());


app.use("/blogs", verifySessionToken, blogRouter)
app.use("/auth", userRouter)

app.get("/", (req, res) => {
  res.send("Hello World")
})

mongoose.connect("mongodb+srv://root:root@blogapp.ckkmiqw.mongodb.net/?retryWrites=true&w=majority&appName=BlogApp")

const db = mongoose.connection;

db.on("error", (error) => {
  console.error("MongoDB connection error:", error);
});

db.once("open", () => {
  console.log("Connected to MongoDB database");
});

db.on("disconnected", () => {
  console.log("Disconnected from MongoDB database");
});


const PORT = 5555
app.listen(PORT, () => console.log("SERVER STARTED AT: " + PORT));