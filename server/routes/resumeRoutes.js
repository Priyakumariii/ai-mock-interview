const express = require("express");
const router = express.Router();
const multer = require("multer");
const pdf = require("pdf-parse");
const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post(
  "/analyze",
  upload.single("resume"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "No resume uploaded",
        });
      }

      const data = await pdf(req.file.buffer);

      const resumeText = data.text;

      const prompt = `
Analyze this resume.

Resume Content:
${resumeText}

Give:

1. Resume Score out of 10
2. Strengths
3. Weaknesses
4. Missing Skills
5. ATS Improvement Suggestions

Keep response professional and easy to understand.
`;

      const completion =
        await groq.chat.completions.create({
          messages: [
            {
              role: "user",
              content: prompt,
            },
          ],
          model: "llama-3.1-8b-instant",
        });

      const feedback =
        completion.choices[0]?.message?.content ||
        "No feedback generated";

      res.json({
        success: true,
        feedback,
      });
    } catch (error) {
      console.error("RESUME AI ERROR:", error);

      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
);

module.exports = router;