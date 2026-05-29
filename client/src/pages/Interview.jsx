import { useNavigate } from "react-router-dom";
function Interview() {
    const navigate = useNavigate();

  return (

    <div className="min-h-screen bg-[#f5f5f5] flex justify-center items-center">

      <div className="bg-white p-10 rounded-3xl shadow-lg w-[600px]">

        <h1 className="text-4xl font-bold mb-8 text-center">

          Start AI Interview 🚀

        </h1>

        <div className="mb-6">

          <label className="block mb-2 font-semibold">

            Select Role

          </label>

          <select className="w-full border p-4 rounded-xl">

            <option>Frontend Developer</option>

            <option>Backend Developer</option>

            <option>Full Stack Developer</option>

            <option>Data Analyst</option>

          </select>

        </div>

        <div className="mb-8">

          <label className="block mb-2 font-semibold">

            Experience Level

          </label>

          <select className="w-full border p-4 rounded-xl">

            <option>Fresher</option>

            <option>1 Year</option>

            <option>2 Years</option>

            <option>3+ Years</option>

          </select>

        </div>

        <button
  onClick={() => navigate("/mock")}
  className="bg-black text-white w-full py-4 rounded-xl text-lg"
>

  Start Mock Interview

</button>

      </div>

    </div>

  );

}

export default Interview;