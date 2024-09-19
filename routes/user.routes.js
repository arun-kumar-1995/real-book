import express from "express";
const router = express.Router();
// import controller
import { signIn, signUp } from "../controllers/user.controller.js";

// define routes
router.route("/sign-in").get(signIn);
router.route("/sign-up").get(signUp);

// export user route
export default router;
