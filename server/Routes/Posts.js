import express from 'express'
import { BlogModel } from '../models/Blogs.js'
import { UserModel } from '../models/Users.js'
import { verifyToken } from './users.js';

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const response = await BlogModel.find({}).populate('userOwner');
    res.json(response);
  } catch (err) {
    res.json(err)
  }
})

router.post("/", verifyToken, async (req, res) => {
  const blog = new BlogModel(req.body)
  try {
    const savedBlogs = await blog.save();

    const userId = req.body.userOwner;
    await UserModel.findByIdAndUpdate(userId, {
      $push: { TotalBlogs: savedBlogs._id }
    })
    res.json(savedBlogs);
  } catch (err) {
    res.json(err)
  }
})

router.get("/totalBlogs/ids/:userId", async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.userId);
    res.json(user.TotalBlogs);
  } catch (err) {
    res.json(err)
  }
})

router.get("/totalBlogs/:userId", async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.userId);
    const blogs = await BlogModel.find({ _id: { $in: user.TotalBlogs } }).populate('userOwner');
    res.json(blogs);
  } catch (err) {
    res.status(500).json(err)
  }
});

router.put("/", verifyToken, async (req, res) => {
  try {
    const user = await UserModel.findById(req.body.userId);
    const blog = await BlogModel.findById(req.body.blogId);
    user.SavedBlogs.push(blog);
    await user.save();

    res.json({ savedBlogs: user.SavedBlogs, blog });
  } catch (err) {
    res.json(err)
  }
})

router.put("/delete", async (req, res) => {
  try {
    const { userId, blogId } = req.body;
    const user = await UserModel.findByIdAndUpdate(
      userId,
      { $pull: { SavedBlogs: blogId } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "Blog deleted successfully" });
  } catch (err) {
    res.json(err)
  }
})

router.get("/savedBlogs/ids/:userId", async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.userId);
    res.json({ savedBlogs: user.SavedBlogs });
  } catch (err) {
    res.json(err)
  }
})

router.get("/savedBlogs/:userID", async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.userID);
    const savedBlogs = await BlogModel.find({
      _id: { $in: user.SavedBlogs }
    }).populate('userOwner')
    res.json({ savedBlogs });
  } catch (err) {
    res.json(err);
  }
})



export { router as blogRouter }