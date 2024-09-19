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
export default app;
