import express from "express";
const router = express.Router();

import { classroom } from "../controllers/classromm.controller.js";

// define classroom routes
router.route("/").get(classroom);
export default router;
