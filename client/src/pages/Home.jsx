import {

  useEffect,

  useState

} from "react";

import {

  useNavigate

} from "react-router-dom";

import {

  signOut,

  onAuthStateChanged

} from "firebase/auth";

import { auth } from "../firebase";

function Home() {

  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  useEffect(() => {

    const unsubscribe = onAuthStateChanged(

      auth,

      (currentUser) => {

        setUser(currentUser);

      }

    );

    return () => unsubscribe();

  }, []);

  const handleLogout = async () => {

    try {

      await signOut(auth);

      alert("Logout Successful");

      navigate("/login");

    }

    catch (error) {

      alert(error.message);

    }

  };

  return (

    <div className="min-h-screen bg-[#f5f5f5] p-10">

      {/* Navbar */}

      <div className="flex justify-between items-center mb-16">

        <h1 className="text-4xl font-bold">

          InterviewIQ AI 🚀

        </h1>

        <div className="flex gap-4">

          {

            user ? (

              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-6 py-2 rounded-full"
              >

                Logout

              </button>

            ) : (

              <button
                onClick={() => navigate("/login")}
                className="bg-black text-white px-6 py-2 rounded-full"
              >

                Login

              </button>

            )

          }

        </div>

      </div>

      {/* Hero Section */}

      <div className="text-center mb-16">

        <h2 className="text-6xl font-bold mb-6">

          AI Mock Interview Platform

        </h2>

        <p className="text-2xl text-gray-600">

          Practice Interviews Like Real Companies

        </p>

      </div>

      {/* Interview Categories */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Frontend */}

        <div className="bg-white p-10 rounded-3xl shadow-lg text-center">

          <h2 className="text-3xl font-bold mb-5">

            Frontend

          </h2>

          <p className="text-gray-500 mb-8">

            React, JavaScript, CSS, HTML

          </p>

          <button
            onClick={() => navigate("/mock/frontend")}
            className="bg-black text-white px-8 py-4 rounded-full"
          >

            Start Interview

          </button>

        </div>

        {/* Backend */}

        <div className="bg-white p-10 rounded-3xl shadow-lg text-center">

          <h2 className="text-3xl font-bold mb-5">

            Backend

          </h2>

          <p className="text-gray-500 mb-8">

            Node.js, Express, MongoDB

          </p>

          <button
            onClick={() => navigate("/mock/backend")}
            className="bg-blue-500 text-white px-8 py-4 rounded-full"
          >

            Start Interview

          </button>

        </div>

        {/* Python */}

        <div className="bg-white p-10 rounded-3xl shadow-lg text-center">

          <h2 className="text-3xl font-bold mb-5">

            Python

          </h2>

          <p className="text-gray-500 mb-8">

            Python, Loops, OOPs

          </p>

          <button
            onClick={() => navigate("/mock/python")}
            className="bg-green-500 text-white px-8 py-4 rounded-full"
          >

            Start Interview

          </button>

        </div>

      </div>

      {/* History Button */}

      <div className="text-center mt-16">

        <button
          onClick={() => navigate("/history")}
          className="bg-purple-500 text-white px-10 py-4 rounded-full text-lg"
        >

          View Interview History

        </button>

      </div>

    </div>

  );

}

export default Home;