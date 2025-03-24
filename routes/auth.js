import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const authRouter = Router();
const JWT_SECRET = process.env.JWT_SECRET;

authRouter.post(`/register`, async (req, res) => {
  const { first_name, last_name, email, password } = req.body;
  try {
    const emailVerification = await User.findOne({ email });
    if (emailVerification) {
      return res.status(409).json("Email already taken");
    }
    const saltPassword = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, saltPassword);

    const newUser = await new User({
      first_name,
      last_name,
      email,
      password: hashedPassword,
    });

    newUser.save();
    return res.status(201).json(`Welcome ${first_name}`);
  } catch (err) {
    console.log(err);
    return res.status(500).json("Internal serveur error", err);
  }
});

authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json("Email or password invalid");
    }
    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword) {
      return res.status(404).json("Email or password invalid");
    }

    const token = await jwt.sign({ id: user._id }, JWT_SECRET);
    return res.status(200).json(token);
  } catch (err) {
    console.log(err);
    return res.status(500).json("Internal server error", err);
  }
});

export default authRouter;
