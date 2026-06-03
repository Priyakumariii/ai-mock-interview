import { useEffect, useState } from "react";
import axios from "axios";

function App() {

  const [darkMode, setDarkMode] = useState(true);

  const [isLogin, setIsLogin] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [jobs, setJobs] = useState([]);

  const [search, setSearch] = useState("");

  const [message, setMessage] = useState("");

  const [chatHistory, setChatHistory] = useState([]);

  const [isTyping, setIsTyping] = useState(false);

  const [score, setScore] = useState(0);

  const [questionNumber, setQuestionNumber] = useState(1);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [jobData, setJobData] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
  });

  const handleRegister = async () => {

    try {

      const response = await axios.post(
        "https://ai-mock-interview-dazi.onrender.com/api/users/register",
        formData
      );

      alert(response.data.message);

      setIsLogin(true);

    // eslint-disable-next-line no-unused-vars
    } catch (error) {

      alert("Register Error");

    }

  };

  const handleLogin = async () => {
  try {
    const response = await axios.post(
      "https://ai-mock-interview-dazi.onrender.com/api/users/login",
      {
        email: formData.email,
        password: formData.password,
      }
    );

    alert(response.data.message);

    setIsLoggedIn(true);

    fetchJobs();

  } catch (error) {
    alert("Login Error");
    console.log(error);
  }
};

  const fetchJobs = async () => {

    try {

      const response = await axios.get(
        "https://ai-mock-interview-dazi.onrender.com/api/jobs"
      );

      setJobs(response.data);

    } catch (error) {

      console.log(error);

    }

  };

  const handleAddJob = async () => {

    try {

      const response = await axios.post(
        "https://ai-mock-interview-dazi.onrender.com/api/jobs/add",
        jobData
      );

      alert(response.data.message);

      fetchJobs();

      setJobData({
        title: "",
        company: "",
        location: "",
        salary: "",
      });

    // eslint-disable-next-line no-unused-vars
    } catch (error) {

      alert("Job Error");

    }

  };

  const handleDeleteJob = async (id) => {

    try {

      await axios.delete(
        `https://ai-mock-interview-dazi.onrender.com/api/jobs/${id}`
      );

      fetchJobs();

    } catch (error) {

      console.log(error);

    }

  };

  const handleChat = () => {

    const userMessage = message.toLowerCase();

    let botReply = "";

    if (userMessage.includes("frontend")) {

      const questions = [

        "What is React?",

        "Difference between props and state?",

        "What is Virtual DOM?",

        "Explain useEffect hook.",

        "What is Tailwind CSS?",

      ];

      const randomQuestion =
        questions[
          Math.floor(Math.random() * questions.length)
        ];

      botReply =
        `🎤 Frontend Interview Question

${randomQuestion}

Type your answer below.`;

    }

    else if (userMessage.includes("backend")) {

      const questions = [

        "What is Node.js?",

        "What is Express.js?",

        "Explain REST API.",

        "What is MongoDB?",

        "Difference between SQL and NoSQL?",

      ];

      const randomQuestion =
        questions[
          Math.floor(Math.random() * questions.length)
        ];

      botReply =
        `🎤 Backend Interview Question

${randomQuestion}

Type your answer below.`;

    }

    else if (userMessage.includes("react")) {

      const questions = [

        "What is JSX?",

        "Explain useState hook.",

        "What is component lifecycle?",

        "What is React Router?",

        "Difference between functional and class component?",

      ];

      const randomQuestion =
        questions[
          Math.floor(Math.random() * questions.length)
        ];

      botReply =
        `⚛️ React Interview Question

${randomQuestion}

Type your answer below.`;

    }

    else if (userMessage.includes("hr")) {

      const questions = [

        "Tell me about yourself.",

        "Why should we hire you?",

        "What are your strengths?",

        "Where do you see yourself in 5 years?",

        "Why do you want this job?",

      ];

      const randomQuestion =
        questions[
          Math.floor(Math.random() * questions.length)
        ];

      botReply =
        `🧑‍💼 HR Interview Question

${randomQuestion}

Type your answer below.`;

    }

    else {

      if (message.length > 15) {

        setScore(score + 1);

        setQuestionNumber(questionNumber + 1);

        botReply =
          `✅ Good Answer

Your communication looks confident.

Interview Score: ${score + 1}`;

      }

      else {

        botReply =
          "❌ Please explain your answer better.";

      }

    }

    setIsTyping(true);

    setTimeout(() => {

      setChatHistory([

        ...chatHistory,

        {
          sender: "You",
          text: message,
        },

        {
          sender: "AI",
          text: botReply,
        },

      ]);

      setIsTyping(false);

    }, 1500);

    setMessage("");

  };

  useEffect(() => {

    fetchJobs();

  }, []);

  if (isLoggedIn) {

    return (

      <div className={`${darkMode ? "bg-black text-white" : "bg-gray-100 text-black"} min-h-screen p-6`}>

        <div className={`${darkMode ? "bg-gray-900" : "bg-white"} p-8 rounded shadow-lg`}>

          <div className="flex justify-between items-center mb-8">

            <h1 className="text-5xl font-bold">
              AI Interview Platform 🚀
            </h1>

            <div className="flex gap-4">

              <button
                onClick={() => setDarkMode(!darkMode)}
                className="bg-blue-500 px-4 py-2 rounded text-white"
              >
                {darkMode ? "Light Mode" : "Dark Mode"}
              </button>

              <button
                onClick={() => setIsLoggedIn(false)}
                className="bg-red-500 px-4 py-2 rounded text-white"
              >
                Logout
              </button>

            </div>

          </div>

          <div className={`${darkMode ? "bg-gray-800" : "bg-gray-200"} p-6 rounded mb-8`}>

            <h2 className="text-3xl font-bold mb-4">
              🤖 AI Mock Interview
            </h2>

            <p className="text-green-400 mb-4 text-lg">
              Interview Score: {score}
            </p>

            <p className="text-yellow-400 mb-4">
  Question Number: {questionNumber}
</p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">

              <button
                onClick={() => setMessage("frontend")}
                className="bg-blue-600 p-3 rounded"
              >
                Frontend
              </button>

              <button
                onClick={() => setMessage("backend")}
                className="bg-green-600 p-3 rounded"
              >
                Backend
              </button>

              <button
                onClick={() => setMessage("react")}
                className="bg-purple-600 p-3 rounded"
              >
                React
              </button>

              <button
                onClick={() => setMessage("hr")}
                className="bg-red-600 p-3 rounded"
              >
                HR Interview
              </button>

            </div>

            <input
              type="text"
              placeholder="Answer interview question..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className={`${darkMode ? "bg-gray-700 text-white" : "bg-white text-black"} border p-3 rounded w-full mb-4`}
            />

            <button
              onClick={handleChat}
              className="bg-purple-600 px-6 py-3 rounded text-white"
            >
              Ask AI
            </button>

            <button
  onClick={() => setMessage("frontend")}
  className="bg-green-600 px-6 py-3 rounded text-white ml-4"
>
  Next Question
</button>

            {isTyping && (

              <div className="bg-gray-700 text-white p-4 rounded mt-4">

                AI is typing...

              </div>

            )}

            <div className="mt-5 space-y-4">

              {chatHistory.map((chat, index) => (

                <div
                  key={index}
                  className={`p-4 rounded ${
                    chat.sender === "You"
                      ? "bg-blue-600 text-white"
                      : darkMode
                      ? "bg-gray-700 text-white"
                      : "bg-white text-black"
                  }`}
                >

                  <strong>
                    {chat.sender}:
                  </strong>

                  <p className="mt-2 whitespace-pre-line">
                    {chat.text}
                  </p>

                </div>

              ))}

            </div>

          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-6">

            <input
              type="text"
              placeholder="Job Title"
              value={jobData.title}
              onChange={(e) =>
                setJobData({
                  ...jobData,
                  title: e.target.value,
                })
              }
              className={`${darkMode ? "bg-gray-700 text-white" : "bg-white text-black"} border p-3 rounded`}
            />

            <input
              type="text"
              placeholder="Company Name"
              value={jobData.company}
              onChange={(e) =>
                setJobData({
                  ...jobData,
                  company: e.target.value,
                })
              }
              className={`${darkMode ? "bg-gray-700 text-white" : "bg-white text-black"} border p-3 rounded`}
            />

            <input
              type="text"
              placeholder="Location"
              value={jobData.location}
              onChange={(e) =>
                setJobData({
                  ...jobData,
                  location: e.target.value,
                })
              }
              className={`${darkMode ? "bg-gray-700 text-white" : "bg-white text-black"} border p-3 rounded`}
            />

            <input
              type="text"
              placeholder="Salary"
              value={jobData.salary}
              onChange={(e) =>
                setJobData({
                  ...jobData,
                  salary: e.target.value,
                })
              }
              className={`${darkMode ? "bg-gray-700 text-white" : "bg-white text-black"} border p-3 rounded`}
            />

          </div>

          <button
            onClick={handleAddJob}
            className="bg-green-600 w-full py-3 rounded text-white mb-6"
          >
            Add Job
          </button>

          <input
            type="text"
            placeholder="Search Jobs"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={`${darkMode ? "bg-gray-700 text-white" : "bg-white text-black"} border p-3 rounded w-full mb-8`}
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

            {jobs
              .filter((job) =>
                job.title.toLowerCase().includes(search.toLowerCase())
              )
              .map((job) => (

                <div
                  key={job._id}
                  className={`${darkMode ? "bg-gray-800" : "bg-white"} border rounded p-5`}
                >

                  <h2 className="text-2xl font-bold mb-3">
                    {job.title}
                  </h2>

                  <p className="mb-2">
                    <strong>Company:</strong> {job.company}
                  </p>

                  <p className="mb-2">
                    <strong>Location:</strong> {job.location}
                  </p>

                  <p className="mb-4">
                    <strong>Salary:</strong> {job.salary}
                  </p>

                  <button
                    onClick={() => handleDeleteJob(job._id)}
                    className="bg-red-500 px-4 py-2 rounded text-white"
                  >
                    Delete
                  </button>

                </div>

              ))}

          </div>

        </div>

      </div>

    );

  }

  return (

    <div className="flex justify-center items-center min-h-screen bg-gray-100">

      <div className="bg-white p-8 rounded shadow-lg w-80">

        <h1 className="text-3xl font-bold text-center mb-5">

          {isLogin ? "Login" : "Register"}

        </h1>

        {!isLogin && (

          <input
            type="text"
            placeholder="Name"
            className="border p-2 w-full mb-4"
            onChange={(e) =>
              setFormData({
                ...formData,
                name: e.target.value,
              })
            }
          />

        )}

        <input
          type="email"
          placeholder="Email"
          className="border p-2 w-full mb-4"
          onChange={(e) =>
            setFormData({
              ...formData,
              email: e.target.value,
            })
          }
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-2 w-full mb-4"
          onChange={(e) =>
            setFormData({
              ...formData,
              password: e.target.value,
            })
          }
        />

        <button
          onClick={isLogin ? handleLogin : handleRegister}
          className="bg-blue-600 text-white p-2 rounded w-full"
        >
          {isLogin ? "Login" : "Register"}
        </button>

        <p
          onClick={() => setIsLogin(!isLogin)}
          className="text-center text-blue-600 mt-4 cursor-pointer"
        >
          {isLogin
            ? "Create New Account"
            : "Already have an account?"}
        </p>

      </div>

    </div>

  );

}

export default App;