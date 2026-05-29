import { useState } from "react";

import {

  useNavigate,

  useParams

} from "react-router-dom";

import { questionsData } from "../data/questions";

function MockInterview() {

  const navigate = useNavigate();

  const { field } = useParams();

  const questions = questionsData[field];

  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [answer, setAnswer] = useState("");

  const [score, setScore] = useState(0);

  const [communicationScore, setCommunicationScore] = useState(0);

  const [confidenceScore, setConfidenceScore] = useState(0);

  if (!questions) {

    return <h1>No Questions Found</h1>;

  }

  const nextQuestion = () => {

    if (answer.trim() === "") {

      alert("Please answer first");

      return;

    }

    let updatedScore = score;

    let communication = communicationScore;

    let confidence = confidenceScore;

    const correctAnswer =
      questions[currentQuestion]
        ?.correctAnswer
        .toLowerCase()
        .trim();

    const userAnswer =
      answer
        .toLowerCase()
        .trim();

    if (userAnswer === correctAnswer) {

      updatedScore += 2;

    }

    if (answer.length > 20) {

      communication += 2;

    }

    if (answer.length > 10) {

      confidence += 2;

    }

    setScore(updatedScore);

    setCommunicationScore(communication);

    setConfidenceScore(confidence);

    if (currentQuestion < questions.length - 1) {

      setCurrentQuestion(currentQuestion + 1);

      setAnswer("");

    }

    else {

      const history = JSON.parse(
        localStorage.getItem("history")
      ) || [];

      history.push({

        field,

        score: updatedScore,

        communication,

        confidence,

        date: new Date().toLocaleString()

      });

      localStorage.setItem(
        "history",
        JSON.stringify(history)
      );

      navigate("/result", {

        state: {

          score: updatedScore,

          communicationScore: communication,

          confidenceScore: confidence

        }

      });

    }

  };

  return (

    <div className="min-h-screen bg-[#f5f5f5] flex justify-center items-center p-10">

      <div className="bg-white w-full max-w-3xl p-10 rounded-3xl shadow-lg">

        <h1 className="text-4xl font-bold mb-10 capitalize">

          {field} Mock Interview 🚀

        </h1>

        <div className="mb-8">

          <h2 className="text-2xl font-semibold mb-5">

            Question {currentQuestion + 1}

          </h2>

          <p className="text-xl">

            {

              questions[currentQuestion]
                ?.question

            }

          </p>

        </div>

        <textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Write your answer..."
          className="w-full border p-5 rounded-2xl h-40 mb-8"
        />

        <button
          onClick={nextQuestion}
          className="bg-black text-white px-10 py-4 rounded-full text-lg"
        >

          Next Question

        </button>

      </div>

    </div>

  );

}

export default MockInterview;