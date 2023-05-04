import jwt from "jsonwebtoken";
import dotenv from "dotenv";

export const verifyToken = async (req, res, next) => {
  const authHeader = req.header("authorization");
  const token = authHeader.split(" ")[1];
  if (!token) return res.status(403).send("incorrect token");
  jwt.verify(token, process.env.SECRET_TOKEN, (err, userData) => {
    if (err) return res.status(403).send("incorrect token");
    req.user = userData;
    next();
  });
};
