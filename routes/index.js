import express from "express";
const router = express.Router();
// import routes
import userRoutes from "./user.routes.js";
// define routes
router.get("/", async (req, res, next) => {
  return res.render("home", { title: "Real Book" });
});

router.use("/", userRoutes);
//export default route
export default router;
