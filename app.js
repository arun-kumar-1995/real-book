import express from "express";
import cookieParser from "cookie-parser";
const app = express();

import expressLayouts from "express-ejs-layouts";
import path from "path";
import { fileURLToPath } from "url";

// Get the file path and directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
// Use express-ejs-layouts middleware
app.use(expressLayouts);

// Set EJS as the template engine
app.set("view engine", "ejs");

// Set the directory for views
app.set("views", path.join(__dirname, "./views"));

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, "./public")));

// serving static files
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

export default app;
