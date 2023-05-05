import express from "express";
//bodyparser replaced with express() middleware
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.js"
import register from "./routes/register.js";
import { verifyToken } from "./middleware/auth.js";

// CONFIGURATION
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();

const app = express();

// MIDDLEWARE
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(express.json({ limit: "30mb" }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

// Routes
app.use("/auth", register);
app.use("/auth", authRoutes);
// app.use("/auth/verify", verifyToken);
//
const port = process.env.PORT;
const mongoURL = process.env.MONGO_URL;

mongoose
  .connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(port, _ => {
      console.log(`app listening in port ${port}`);
    });
  })
  .catch((err) => {
    console.error(err);
    console.error("couldnt connect");
  });

