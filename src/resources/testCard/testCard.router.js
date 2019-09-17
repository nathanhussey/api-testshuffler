import { Router } from "express";
import mongoose from "mongoose";
import TestCard from "./testCard.model";
import { checkAuth } from "../../middlewares/jwt_auth.js";
const router = Router();

// /testcard

// cretes new testCard in database
router.post("/create-new", checkAuth, async (req, res) => {
  const testCard = new TestCard({
    _id: mongoose.Types.ObjectId(),
    testTitle: req.body.testTitle,
    testCard: req.body.testCard,
    userId: req.user
  });
  try {
    const saveTestCard = await testCard.save();
    res.send("new test was saved");
  } catch (err) {
    res.send(err);
  }
});

// gets existing testCard to be edited
router.get("/edit/:id", checkAuth, async (req, res) => {
  try {
    let getTestCard = await TestCard.findById(req.params.id);
    res.send(getTestCard);
  } catch (err) {
    res.send(err);
  }
});

// saves edited testCard to database
router.put("/edit/:id", checkAuth, async (req, res) => {
  try {
    let updateTestCard = await TestCard.findByIdAndUpdate(req.params.id, {
      testTitle: req.body.testTitle,
      testCard: req.body.testCard
    });
    res.status("200").send("test was updated");
  } catch (err) {
    res.send(err);
  }
});

router.delete("/edit/:id", checkAuth, async (req, res) => {
  try {
    let deleteTestCard = await TestCard.deleteOne({ _id: req.params.id });
    res.status("200").send("test was updated");
  } catch (err) {
    res.send(err);
  }
});

export default router;
