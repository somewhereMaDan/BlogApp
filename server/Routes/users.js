import express from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { UserModel } from '../models/Users.js'

const router = express.Router()

// router.post("/register", async (req, res, next) => {
//   const { username, password } = req.body;
//   const user = await UserModel.findOne({ username: username });

//   if (user) {
//     return res.json({ message: "User already exist" })
//   }

//   const hashedPassword = await bcrypt.hash(password, 10);
//   const newUser = new UserModel({ username: username, password: hashedPassword });
//   await newUser.save();
//   res.json({ message: "User registered successfully" });
// })

router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const user = await UserModel.findOne({ username: username });
  if (user) {
    return res.json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  // 10 is default valut which we put for hashing

  const newUser = new UserModel({ username, password: hashedPassword });
  await newUser.save();
  // this will save the newUser inside the DB 
  res.json({ message: "Registration Completed, now Login!" });
})


router.post("/login", async (req, res, next) => {
  const { username, password } = req.body;
  const user = await UserModel.findOne({ username: username });
  if (!user) {
    return res.status(401).json({ message: "User does not exist" });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(401).json({ message: "Username or Password is incorrect" });
  }
  const token = jwt.sign({ id: user._id }, "secret");

  res.status(200).json({ token, username: username, userId: user._id });
})

export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if(token){
    jwt.verify(token, "secret", (err) => {
      if(err) return res.sendStatus(403);
      next();
    })
  }else{
    res.sendStatus(401);
  }
} 

export { router as userRouter }
