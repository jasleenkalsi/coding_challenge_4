import express, { Router } from "express";
import { getUserProfile, deleteUser } from "../controllers/userController";
import { authenticateUser } from "../../middleware/authMiddleware";
import { authorizeRole } from "../../middleware/authorizeMiddleware";

const router: Router = express.Router();

// Protect profile route - any authenticated user can access
router.get("/profile", authenticateUser, getUserProfile);

// Only admin can delete a user
router.delete("/:id", authenticateUser, authorizeRole(["admin"]), deleteUser);

export default router;