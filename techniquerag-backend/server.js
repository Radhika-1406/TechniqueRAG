import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// ------------------------------------------------
// 🔧 Properly load .env from the same folder as server.js
// ------------------------------------------------
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, ".env") });

console.log("✅ dotenv loaded from:", path.resolve(__dirname, ".env"));
console.log("🔍 Loaded MONGO_URI from .env:", process.env.MONGO_URI);

// ------------------------------------------------
// Express setup
// ------------------------------------------------
const app = express();
app.use(express.json());
app.use(cors());

// ------------------------------------------------
// MongoDB connection
// ------------------------------------------------
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI?.trim();

console.log("⏳ Connecting to MongoDB...");

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    ssl: true,
    tlsAllowInvalidCertificates: true, // helpful on Windows
    serverSelectionTimeoutMS: 30000,
  })
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
  });

// Routes
app.get("/", (req, res) => {
  res.send("🚀 Backend is running successfully!");
});

app.listen(PORT, () => {
  console.log(`🌐 Server running on http://localhost:${PORT}`);
});
