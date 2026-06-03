const express = require("express");
const router = express.Router();

const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY
);

console.log("API KEY EXISTS:", !!process.env.GEMINI_API_KEY);

router.post("/feedback", async (req, res) => {
  try {
    const { answers } = req.body;

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash"
    });

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

    const result = await model.generateContent(prompt);

    const feedback =
      result.response.text();

    res.json({
      success: true,
      feedback
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "AI Feedback Error"
    });
  }
});

module.exports = router;