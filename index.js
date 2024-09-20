import http from "http";
import app from "./app.js";
import connectDB from "./config/db.config.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import InitializeSocketConnection from "./sockets/index.js";

const { PORT: port = 8000 } = process.env;

// connect socket only if db connected
const startServer = async () => {
  try {
    // connect to db
    await connectDB();
    // create server
    const expressServer = http.createServer(app);
    const io = InitializeSocketConnection(expressServer);
    // listen for the server
    expressServer.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
  // socket connection
};
await startServer();

// // connect express app only if connected to db instance
// db.once("open", function () {
//   console.log("Connected to Database", db.host);
// });

// // create express server
// expressServer = http.createServer(app);

// // Start the Express server
// expressServer.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });

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
