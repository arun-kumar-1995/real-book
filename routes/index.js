import express from "express";
const router = express.Router();
// import routes
import userRoutes from "./user.routes.js";
// define routes
router.use("/" , userRoutes);
//export default route
export default router;
