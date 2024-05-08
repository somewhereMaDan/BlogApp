import express from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { UserModel } from '../models/Users.js'
import createSessionKey from '../utils/createSessionKey.js'
import { addSessionKey, checkSessionKey } from '../auth/sessionModel.js'

const router = express.Router()

router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const user = await UserModel.findOne({ username: username });
  if (user) {
    return res.status(403).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  // 10 is default valut which we put for hashing

  const newUser = new UserModel({ username, password: hashedPassword });
  await newUser.save();
  // this will save the newUser inside the DB 
  res.status(200).json({ message: "Registration Completed, now Login!" });
})


// router.post("/login", async (req, res, next) => {
//   const { username, password } = req.body;
//   const user = await UserModel.findOne({ username: username });
//   if (!user) {
//     return res.status(401).json({ message: "User does not exist" });
//   }

//   const isMatch = await bcrypt.compare(password, user.password);

//   if (!isMatch) {
//     return res.status(401).json({ message: "Username or Password is incorrect" });
//   }
//   const token = jwt.sign({ id: user._id }, "secret");

//   res.status(200).json({ token, username: username, userId: user._id });
// })

router.post("/login", async (req, res) => {
  // const { username, password } = req.body;
  // const user = await UserModel.findOne({ username: username });
  // if (!user) {
  //   return res.status(401).json({ message: "User does not exist" });
  // }

  // const isMatch = await bcrypt.compare(password, user.password);
  // if (!isMatch) {
  //   return res.status(401).json({ message: "Username or Password is incorrect" });
  // }

  // // Store user data in session
  // req.session.user = { id: user._id, username: username };

  // res.status(200).json({ message: "Login successful", username: username, userId: user._id });

  const { username, password } = req.body;
  console.log("hii");

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }

  try {
    const user = await UserModel.findOne({ username: username });

    if (!user) {
      return res.status(401).json({ message: "User does not exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Username or Password is incorrect" });
    }

    const sessionKey = createSessionKey(user._id);
    console.log(sessionKey);

    addSessionKey(user._id, sessionKey);

    res.status(200).json({ message: "Login successful", username: username, userId: user._id, sessionKey: sessionKey });

  } catch (error) {

  }
});

export const verifySessionToken = (req, res, next) => {
  let { authorization: sessionKey } = req.headers
  const { userId } = req.body


  sessionKey = sessionKey.split(" ")[1]
  const check = checkSessionKey(userId, sessionKey)

  check ? next() : res.status(401).send({ msgg: "unauthorized" })
}





export { router as userRouter }
