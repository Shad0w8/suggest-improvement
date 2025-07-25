import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "1mb" }));

// Dummy suggestions list
const DUMMY_SUGGESTIONS = [
  "Reduce marketing expenses by switching to social media ads.",
  "Optimize inventory management to lower storage costs.",
  "Introduce loyalty discounts to improve customer retention.",
  "Negotiate with suppliers for better pricing.",
  "Automate repetitive tasks to save operational costs."
];

// ---- POST Endpoint ----
app.post("/suggest-improvement", async (req, res) => {
  try {
    // Randomly select a dummy suggestion
    const suggestion =
      DUMMY_SUGGESTIONS[Math.floor(Math.random() * DUMMY_SUGGESTIONS.length)];

    res.json({ suggestion });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong." });
  }
});

// ---- GET Endpoint (when URL is directly visited) ----
app.get("/suggest-improvement", (req, res) => {
  const suggestion =
    DUMMY_SUGGESTIONS[Math.floor(Math.random() * DUMMY_SUGGESTIONS.length)];
  res.json({ suggestion });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 API running on http://localhost:${PORT}`));
