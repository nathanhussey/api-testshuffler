import jwt from "jsonwebtoken";

export const checkAuth = (req, res, next) => {
  console.log(req.headers);
  const token = req.headers.authorization.split(" ")[1];

  if (!token) return res.status(401).send("access denied");

  try {
    const verified = jwt.verify(token, process.env.JWT_KEY);
    req.user = verified;
    console.log("auth worked");
    next();
  } catch (err) {
    res.status(400).send("invalid token");
  }
};
