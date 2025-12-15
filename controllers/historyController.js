import History from "../models/History.js";

export const getHistory = async (req, res) => {
  try {
    const history = await History.find().sort({ createdAt: -1 });

    // 🔁 Transform data to frontend format
    const formatted = history.map((item) => ({
      id: item._id.toString(),
      inputText: item.text,
      techniques: item.techniques,
      timestamp: item.createdAt,
    }));

    res.json(formatted);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch history" });
  }
};
