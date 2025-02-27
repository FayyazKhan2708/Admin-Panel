import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import cors from "cors";
import dotenv from "dotenv";
import User from "./models/User.js";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
dotenv.config();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB successfully!"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use(express.static(path.join(__dirname, "../client/build")));
app.use(cors());
app.use(express.json());

// First define all your API routes
app.post("/signup", async (req, res) => {
  console.log("Received signup request:", req.body);

  try {
    const { username, email, password, mobile } = req.body;

    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message:
          existingUser.email === email
            ? "Email already registered"
            : "Username already taken",
      });
    }

    // Hash password before storing
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user with hashed password
    const user = new User({
      username,
      email,
      mobile,
      password: hashedPassword,
    });

    await user.save();
    console.log("User created successfully:", {
      username: user.username,
      email: user.email,
      mobile: user.mobile,
    });

    res.status(201).json({
      success: true,
      message: "User created successfully",
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Server error",
    });
  }
});

app.post("/login", async (req, res) => {
  console.log("Received login request:", req.body);

  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    console.log("User found:", user); // Log full user object (be careful with this in production)

    if (!user) {
      console.log("No user found with email:", email);
      return res.status(404).json({
        success: false,
        message: "User not found. Please sign up first.",
      });
    }

    // Compare password with hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log("Password comparison result:", isPasswordValid);
    console.log("Input password:", password);
    console.log("Stored hashed password:", user.password);

    if (!isPasswordValid) {
      console.log("Invalid password for user:", email);
      return res.status(401).json({
        success: false,
        message: "Invalid password",
      });
    }

    console.log("Login successful for user:", email);
    return res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error during login",
    });
  }
});

app.post("/test-signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    console.log("Received signup request:", { username, email });

    console.log("User model:", !!User);

    const newUser = await User.create({
      username,
      email,
      password,
    });

    console.log("User created successfully:", newUser);
    res.json({ success: true, user: newUser });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Then add the static file serving and catch-all route at the end
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
