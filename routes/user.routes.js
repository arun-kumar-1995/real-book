import express from "express";
const router = express.Router();
// import controller
import {
  signIn,
  signUp,
  register,
  createSession,
  signOut
} from "../controllers/user.controller.js";

// define routes
router.route("/sign-in").get(signIn);
router.route("/sign-up").get(signUp);
router.route("/register").post(register);
router.route("/create-session").post(createSession);
router.route("/sign-out").post(signOut);
// export user route
export default router;
