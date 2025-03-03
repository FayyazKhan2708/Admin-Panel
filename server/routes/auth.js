import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import auth from "../middleware/auth.js";

const router = express.Router();

/**
 * @route   POST /signup
 * @desc    Register a new user
 * @access  Public
 */
router.post("/signup", async (req, res) => {
  console.log("Received signup request:", req.body);

  try {
    const { username, email, password, mobile } = req.body;

    // Check if user already exists with same email or username
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

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user instance
    const user = new User({
      username,
      email,
      mobile,
      password: hashedPassword,
    });

    // Save user to database
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

/**
 * @route   POST /login
 * @desc    Authenticate user & get token
 * @access  Public
 */
router.post("/login", async (req, res) => {
  console.log("Received login request:", req.body);

  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    console.log("User found:", user);

    if (!user) {
      console.log("No user found with email:", email);
      return res.status(404).json({
        success: false,
        message: "User not found. Please sign up first.",
      });
    }

    // Validate password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      console.log("Invalid password for user:", email);
      return res.status(401).json({
        success: false,
        message: "Invalid password",
      });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    console.log("Login successful for user:", email);
    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        mobile: user.mobile,
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

/**
 * @route   GET /user/me
 * @desc    Get current user's profile
 * @access  Private (requires authentication)
 */
router.get("/user/me", auth, async (req, res) => {
  try {
    // Find user by ID (excluding password and version key)
    const user = await User.findById(req.userId)
      .select("-password")
      .select("-__v");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Return user data
    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        mobile: user.mobile,
        createdAt: user._id.getTimestamp(),
      },
    });
  } catch (error) {
    console.error("Error fetching user details:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching user details",
    });
  }
});

/**
 * @route   POST /test-signup
 * @desc    Test route for user registration
 * @access  Public
 * @note    Used for testing purposes only
 */
router.post("/test-signup", async (req, res) => {
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

export default router;
