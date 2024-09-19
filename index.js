import app from "./app.js";
import db from "./config/db.config.js";
import errorMiddleware from "./middlewares/error.middleware.js";

const { PORT: port = 8000 } = process.env;

process.on("SIGINT", async () => {
  await db.close();
  console.log("MongoDB connection closed on app termination");
  process.exit(0);
});

// connect express app only if connected to db instance
db.once("open", function () {
  console.log("Connected to Database", db.host);
  // Start the Express server
  const expressServer = app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
});

import checkAuth from "./middlewares/auth.middleware.js";
app.use(checkAuth);

// route
import appRoute from "./routes/index.js";
app.use("/", appRoute);

// page not found error
app.all("*", (req, res, next) => {
  return res.status(200).json({
    success: false,
    message: "Opps! , We unable to get the page you are looking for",
  });
});

// global error middleware
app.use(errorMiddleware);
