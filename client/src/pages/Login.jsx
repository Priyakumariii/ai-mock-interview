import { useState } from "react";

import { useNavigate } from "react-router-dom";

import {

  signInWithEmailAndPassword

} from "firebase/auth";

import { auth } from "../firebase";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const handleLogin = async () => {

    try {

      await signInWithEmailAndPassword(

        auth,

        email,

        password

      );

      alert("Login Successful 🚀");

      navigate("/");

    }

    catch (error) {

      alert(error.message);

    }

  };

  return (

    <div className="min-h-screen flex justify-center items-center bg-[#f5f5f5]">

      <div className="bg-white p-10 rounded-3xl shadow-lg w-[400px]">

        <h1 className="text-4xl font-bold mb-8 text-center">

          Login

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
          onClick={handleLogin}
          className="w-full bg-black text-white py-4 rounded-xl"
        >

          Login

        </button>

      </div>

    </div>

  );

}

export default Login;