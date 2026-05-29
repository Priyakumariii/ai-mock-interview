import { useLocation } from "react-router-dom";

function Result() {

  const location = useLocation();

  const {

    score = 0,

    communicationScore = 0,

    confidenceScore = 0

  } = location.state || {};

  return (

    <div className="min-h-screen bg-[#f5f5f5] flex justify-center items-center p-10">

      <div className="bg-white w-full max-w-3xl p-10 rounded-3xl shadow-lg text-center">

        <h1 className="text-5xl font-bold mb-10">

          Interview Result 🚀

        </h1>

        <div className="space-y-6">

          <div className="bg-gray-100 p-6 rounded-2xl">

            <h2 className="text-3xl font-bold">

              Technical Score

            </h2>

            <p className="text-5xl mt-4 font-bold text-green-500">

              {score}

            </p>

          </div>

          <div className="bg-gray-100 p-6 rounded-2xl">

            <h2 className="text-3xl font-bold">

              Communication Score

            </h2>

            <p className="text-5xl mt-4 font-bold text-blue-500">

              {communicationScore}

            </p>

          </div>

          <div className="bg-gray-100 p-6 rounded-2xl">

            <h2 className="text-3xl font-bold">

              Confidence Score

            </h2>

            <p className="text-5xl mt-4 font-bold text-purple-500">

              {confidenceScore}

            </p>

          </div>

        </div>

      </div>

    </div>

  );

}

export default Result;