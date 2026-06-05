const express = require("express");
const router = express.Router();

const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

router.post("/feedback", async (req, res) => {
  try {
    const { answers } = req.body;

    const prompt = `
You are an interview evaluator.

Candidate Answers:
${answers.join("\n")}

Give:
1. Technical Feedback
2. Communication Feedback
3. Confidence Feedback
4. Overall Rating out of 10

Keep response short and professional.
`;

    const completion = await groq.chat.completions.create({
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
    console.error("GROQ ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;