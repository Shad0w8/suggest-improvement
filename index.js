import express from "express";
import dotenv from "dotenv";
import OpenAI from "openai";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "1mb" }));

// ---- OpenAI Client ----
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// ---- System Prompt ----
const SYSTEM_PROMPT = `
You are a sharp, no-fluff business operations consultant.
Return EXACTLY ONE sentence (<= 25 words) that gives the single most leveraged, actionable improvement suggestion.
Use imperative voice, no emojis, no labels, no explanations, no line breaks.
If you need to reference a product link, do it generically (e.g., "switch to a lower-cost CRM")—never paste URLs.
`;

// ---- POST Endpoint ----
app.post("/suggest-improvement", async (req, res) => {
  try {
    const payload = req.body;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0.2,
      max_tokens: 120,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: JSON.stringify(payload, null, 2) },
      ],
    });

    const suggestion =
      completion.choices?.[0]?.message?.content?.trim() ||
      "Reduce non-essential costs and renegotiate supplier contracts.";

    res.json({ suggestion });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message || "Something went wrong." });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 API running on http://localhost:${PORT}`));
