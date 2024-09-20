import http from "http";
import app from "./app.js";
import connectDB from "./config/db.config.js";
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
};
await startServer();
