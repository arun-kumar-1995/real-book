import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

// connect to mongoose
mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: process.env.DB_NAME,
});

// setting up mongose connection
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Error connecting to the DB"));

// export db instance
export default db;
