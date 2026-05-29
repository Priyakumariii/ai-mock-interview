import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Home from "./pages/Home";
import Interview from "./pages/Interview";
import MockInterview from "./pages/MockInterview";
import Result from "./pages/Result";
import History from "./pages/History";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProtectedRoute from "./components/ProtectedRoute";

ReactDOM.createRoot(document.getElementById("root")).render(

  <React.StrictMode>

    <BrowserRouter>

      <Routes>

  <Route path="/" element={<Home />} />

  <Route
    path="/interview"
    element={<Interview />}
  />

  <Route
  path="/mock/:field"
  element={
    <ProtectedRoute>
      <MockInterview />
    </ProtectedRoute>
  }
/>

  <Route
  path="/result"
  element={
    <ProtectedRoute>
      <Result />
    </ProtectedRoute>
  }
/>

<Route
  path="/history"
  element={
    <ProtectedRoute>
      <History />
    </ProtectedRoute>
  }
/>

<Route
  path="/login"
  element={<Login />}
/>

<Route
  path="/signup"
  element={<Signup />}
/>

</Routes>


    </BrowserRouter>

  </React.StrictMode>

);