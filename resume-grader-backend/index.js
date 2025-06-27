import express from 'express';
import cors from 'cors';
import multer from 'multer';
import pdfParse from 'pdf-parse';
import fs from 'fs';
import dotenv from 'dotenv';
import { callClaude as analyzeClaude } from './utils/analyzeResume.js';
import { callClaude as chatClaude } from './utils/callClaude.js';


dotenv.config();

const app = express();


app.use(cors());
app.use(express.json());

const upload = multer({ dest: 'uploads/' });

app.post(
  '/api/analyze',
  upload.fields([
    { name: 'resume', maxCount: 1 },
    { name: 'jobDesc', maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const resumeFile = req.files?.resume?.[0];
      const jobDescFile = req.files?.jobDesc?.[0];
      const jobDescText = req.body.jobDescText;

      if (!resumeFile || (!jobDescFile && !jobDescText)) {
        return res.status(400).json({ error: 'Missing resume or job description.' });
      }

      const resumeText = (await pdfParse(fs.readFileSync(resumeFile.path))).text;
      const jobText =
        jobDescText || (await pdfParse(fs.readFileSync(jobDescFile.path))).text;

      const result = await analyzeClaude(resumeText, jobText);

     
      res.json({
        ...result,
        resumeText,
        jobDescText: jobText
      });

    } catch (err) {
      console.error('❌ Backend Error:', err.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
app.get("/env-test", (req, res) => {
  const keyExists = process.env.OPENROUTER_API_KEY ? "✔️ EXISTS" : "❌ MISSING";
  res.send(`KEY: ${keyExists}`);
});

app.post("/api/claude", async (req, res) => {
  const { messages, resumeText, jobDescText } = req.body;

  if (!messages || !resumeText || !jobDescText) {
    return res.status(400).json({ error: "Missing fields." });
  }

  try {
    const reply = await chatClaude(messages, resumeText, jobDescText);
    res.json({ reply });
  } catch (err) {
    console.error("Claude route error:", err.message);
    res.status(500).json({ error: "Failed to fetch AI response." });
  }
});

