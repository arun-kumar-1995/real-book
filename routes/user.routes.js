import express from "express";
const router = express.Router();
// import controller
import { signIn, signUp, register } from "../controllers/user.controller.js";

// define routes
router.route("/sign-in").get(signIn);
router.route("/sign-up").get(signUp);
router.route("/register").post(register);

// export user route
export default router;
