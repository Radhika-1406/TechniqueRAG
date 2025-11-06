import express from "express";
import { analyzeText } from "../controllers/analyzeController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Protected analyze endpoint (requires authentication)
router.post("/", protect, analyzeText);

export default router;
