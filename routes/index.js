import express from "express";
const router = express.Router();
// import routes
import userRoutes from "./user.routes.js";
import classroomRoutes from "./classroom.route.js";
// define routes
router.get("/", async (req, res, next) => {
  if (req.isAuthenticated()) {
    return res.redirect("/classroom");
  }
  return res.render("home", { title: "Real Book" });
});

router.use("/", userRoutes);
router.use("/classroom", classroomRoutes);
//export default route
export default router;
