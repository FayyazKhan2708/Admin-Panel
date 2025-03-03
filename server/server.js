import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import connectDB from "./config/database.js";
import authRoutes from "./routes/auth.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

// Validate required environment variables
if (!process.env.JWT_SECRET) {
  console.error("FATAL ERROR: JWT_SECRET is not defined.");
  process.exit(1);
}

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.static(path.join(__dirname, "../client/build")));
app.use(cors());
app.use(express.json());

// Routes
app.use("/", authRoutes);

// Serve static files in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
