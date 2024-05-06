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

router.get("/generateDesc", async (req, res) => {
  // const { reqBody } = req.body;

  const requestBody = {
    contents: [
      {
        parts: [
          {
            text: `Could you Please Provie me description about 100-150 words with of Title - 
            npm package, Summary = node js ecosystem. 
            And no need to mention Title and Summary name at the top just give me a description for it.`,
          },
        ],
      },
    ],
  };

  if (!requestBody) {
    res.status(400).send("No request body found")
    return
  }

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GOOGLE_GEMINI_API}`, {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json"
      }
    })

    const result = await response.json();

    res.send(result.candidates[0].content.parts[0])
  } catch (error) {
    console.log(error);

    res.status(500).send({
      msgg: "something went wrong",
      err: error.msgg
    })

  }

})


export { router as blogRouter }