import express from "express";
import { authenticateUser } from "../src/api/v1/middleware/authenticationMiddleware"; 
import { authorizeRole } from "../src/api/v1/middleware/authorizationMiddleware"; 
import admin from "../config/firebase"; // Ensure Firebase Admin SDK is imported

const router = express.Router();

// Route: Get Profile (Only Authenticated Users)
router.get("/profile", authenticateUser, (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized access" });
  }
  res.json({ message: "User profile data", user: req.user });
});

// Route: Get User by ID (Only Admins)
router.get("/users/:id", authenticateUser, authorizeRole("admin"), async (req, res) => {
  const userId = req.params.id;

  if (!userId || typeof userId !== "string") {
    return res.status(400).json({ message: "Invalid user ID format" });
  }

  try {
    const userRecord = await admin.auth().getUser(userId);
    res.json({ user: userRecord });
  } catch (error) {
    res.status(404).json({ message: "User not found", error: error.message });
  }
});

export default router;