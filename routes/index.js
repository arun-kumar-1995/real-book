import express from "express";
const router = express.Router();

router.get("/", async (req, res, next) => {
  return res.status(200).json({
    success: true,
    message: "Route was successfully called",
  });
});

export default router;
