import mongoose from "mongoose";

const techniqueSchema = new mongoose.Schema({
  id: String,
  name: String,
  confidence: Number,
});

const historySchema = new mongoose.Schema(
  {
    inputText: { type: String, required: true },
    techniques: [techniqueSchema],
  },
  { timestamps: true }
);

export default mongoose.model("History", historySchema);
