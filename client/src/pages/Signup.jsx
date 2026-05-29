import { useState } from "react";

import { useNavigate } from "react-router-dom";

import {

  createUserWithEmailAndPassword

} from "firebase/auth";

import { auth } from "../firebase";

function Signup() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const handleSignup = async () => {

    try {

      await createUserWithEmailAndPassword(

        auth,

        email,

        password

      );

      alert("Signup Successful 🚀");

      navigate("/login");

    }

    catch (error) {

      alert(error.message);

    }

  };

  return (

    <div className="min-h-screen flex justify-center items-center bg-[#f5f5f5]">

      <div className="bg-white p-10 rounded-3xl shadow-lg w-[400px]">

        <h1 className="text-4xl font-bold mb-8 text-center">

          Signup

        </h1>

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-4 rounded-xl mb-5"
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-4 rounded-xl mb-5"
        />

        <button
          onClick={handleSignup}
          className="w-full bg-blue-500 text-white py-4 rounded-xl"
        >

          Signup

        </button>

      </div>

    </div>

  );

}

export default Signup;