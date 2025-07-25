import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "1mb" }));

const DUMMY_SUGGESTIONS = [
  "Reduce marketing expenses by switching to social media ads.",
  "Optimize inventory management to lower storage costs.",
  "Introduce loyalty discounts to improve customer retention.",
  "Negotiate with suppliers for better pricing.",
  "Automate repetitive tasks to save operational costs.",
  "Outsource non-core tasks to save time and money.",
  "Use energy-efficient appliances to cut utility costs."
];

// Root route
app.get("/", (req, res) => {
  res.send("API is running! Use /suggest-improvement for suggestions.");
});

// Utility to get 3 random suggestions
function getRandomSuggestions() {
  const shuffled = [...DUMMY_SUGGESTIONS].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 3);
}

// GET endpoint
app.get("/suggest-improvement", (req, res) => {
  const suggestions = getRandomSuggestions();
  res.json({ suggestions });
});

// POST endpoint
app.post("/suggest-improvement", (req, res) => {
  const suggestions = getRandomSuggestions();
  res.json({ suggestions });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`🚀 API running on http://localhost:${PORT}`)
);
