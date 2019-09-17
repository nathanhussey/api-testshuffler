import { Router } from "express";
import mongoose from "mongoose";
import { checkAuth } from "../../middlewares/jwt_auth.js";
import TestCard from "../testCard/testCard.model";
import { exec } from "child_process";
const router = Router();
// /user/dashboard

// gets all test title data from database
router.get("/", checkAuth, async (req, res) => {
  try {
    let getTitles = await TestCard.find({ userId: req.user._id }, "testTitle");
    console.log(getTitles);
    res.status(200).send(getTitles);
  } catch (err) {
    res.send(err.response);
  }
});

export default router;
