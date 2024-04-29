import express from 'express'
import { BlogModel } from '../models/Blogs.js'
import { UserModel } from '../models/Users.js'

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const response = await BlogModel.find({});
    res.json(response);
  } catch (err) {
    res.json(err)
  }
})

router.post("/", async (req, res) => {
  const blog = new BlogModel(req.body)
  try {
    const response = await blog.save();
    res.json(response);
  } catch (err) {
    res.json(err)
  }
})

router.put("/", async (req, res) => {
  try {
    // const user = await UserModel.findById(window.localStorage.getItem("userID"));
    const user = await UserModel.findById(req.body.userId);
    console.log(user);
  }catch(err){
    res.json(err)
  }
})

export { router as blogRouter }