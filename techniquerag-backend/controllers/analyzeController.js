import { runCTIPipeline } from "../models/ctiPipeline.js";

export const analyzeText = async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).json({ error: "Text is required" });

    console.log("Running CTI pipeline for input:", text);
    const result = await runCTIPipeline(text);
    res.json(result);
  } catch (error) {
    console.error("Pipeline error:", error);
    res.status(500).json({ error: "Pipeline failed", details: error.message });
  }
};
