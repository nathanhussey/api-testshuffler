import { Router } from "express";
import mongoose from "mongoose";
import User from "./user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { userValidation } from "../../middlewares/validation.js";
const router = Router();

// /user
//signs up users and assigns auth token
router.post("/signup", async (req, res) => {
  //check for validation
  const { error } = userValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  //error.details[0].message
  // check if email already exists in database
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send("email already exists");

  //hash the passwords
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  // create a new user
  const user = new User({
    _id: mongoose.Types.ObjectId(),
    email: req.body.email,
    password: hashPassword
  });
  try {
    const savedUser = await user.save();
    const token = jwt.sign({ _id: user._id }, process.env.JWT_KEY, {
      expiresIn: "1h"
    });
    res.status(200).send(token);
  } catch (err) {
    res.status(400).send(err);
  }
});

// logins in user and assigns auth token
router.post("/login", async (req, res) => {
  //validation
  const { error } = userValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //check for email
  const user = await User.findOne({ email: req.body.email });

  if (!user) return res.status(409).send("email or password is incorrect");

  //check if password is correct
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send("email or password is incorrect");
  // create and assign jwt token
  const token = jwt.sign({ _id: user._id }, process.env.JWT_KEY, {
    expiresIn: "1h"
  });
  res.status(200).send(token);
});

// deletes users -->unfinished
router.delete("/:userId", (req, res) => {
  User.remove({ _id: req.params.id })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "user deleted"
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

export default router;
