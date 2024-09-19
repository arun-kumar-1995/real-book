import express from "express";
const router = express.Router();

import { classroom  , bookSeat} from "../controllers/classromm.controller.js";

// define classroom routes
router.route("/").get(classroom);
router.route("/book-seat").post(bookSeat)
export default router;
