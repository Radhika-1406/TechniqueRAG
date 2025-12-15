import { execFile } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

// Fix __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Absolute path to Python file
const PYTHON_SCRIPT = path.join(
  __dirname,
  "../models/ctiPipeline.py"
);
export const analyze = (req, res) => {
  const { text } = req.body;

  if (!text || !text.trim()) {
    return res.status(400).json({ error: "Text is required" });
  }

  execFile(
    "python",
    [PYTHON_SCRIPT, text],
    { maxBuffer: 1024 * 1024 },
    (error, stdout, stderr) => {
      if (error) {
        console.error("Python error:", error);
        console.error(stderr);
        return res.status(500).json({ error: "ML analysis failed" });
      }

      try {
        const result = JSON.parse(stdout);
        res.json(result);
      } catch (e) {
        console.error("Invalid JSON from Python:", stdout);
        res.status(500).json({ error: "Invalid ML response" });
      }
    }
  );
};
