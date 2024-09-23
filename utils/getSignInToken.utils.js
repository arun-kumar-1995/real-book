import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const { JWT_SECRET, TOKEN_EXPIRE } = process.env;

const getSignInToken = (user) => {
  return jwt.sign({ id: user._id }, JWT_SECRET, {
    expiresIn: TOKEN_EXPIRE || "7d",
  });
};

export default getSignInToken;
