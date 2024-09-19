import express from "express";
const router = express.Router();
// import routes
import userRoutes from "./user.routes.js";
// define routes
router.get("/", async (req, res, next) => {
  return res.render("home", { title: "Real Book" });
});

router.get("/sign-in", async (req, res, next) => {
  return res.render("signin", { title: "Real Book | Sign In" });
});

router.get("/sign-up", async (req, res, next) => {
  return res.render("signup", { title: "Real Book | Sign Up" });
});

router.use("/", userRoutes);
//export default route
export default router;
