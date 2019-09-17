import express from "express";
import { json, urlencoded } from "body-parser";
import morgan from "morgan";
import cors from "cors";
import mongoose from "mongoose";
import userRouter from "./resources/user/user.router";
import testCardRouter from "./resources/testCard/testCard.router";
import dashboardRouter from "./resources/dashboard/dashboard.router";

require("dotenv").config();

export const app = express();

mongoose.connect(
  `${process.env.DB_LOGIN}`,
  { useCreateIndex: true, useNewUrlParser: true },
  () => console.log("connected to DB")
);

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use("/user", userRouter);
app.use("/testcard", testCardRouter);
app.use("/user/dashboard", dashboardRouter);

app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

app.listen(process.env.PORT || 3001);
