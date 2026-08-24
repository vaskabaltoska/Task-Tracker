import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";
import "./index.css";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [pass, setPass] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await fetch("http://localhost:5176/api/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password: pass }),
//       });

//       if (!response.ok) {
//         throw new Error(data.message || "Invalid credentials");
//       }

//       const data = await response.json();
//       localStorage.setItem("authToken", data.token);
//       console.log("Login successful! Navigating to dashboard...");

//       alert("Login successful!");

//       navigate("/dashboard");
//     } catch (error) {
//       console.error("Error:", error);
//       alert("Invalid credentials. Please try again.");
//     }
//   };

const Login = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (authToken) {
      console.log("Token found! Navigating to dashboard...");
      navigate("/dashboard");
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://task-tracker-qn6h.onrender.com/api/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password: pass }),
        },
      );

      if (!response.ok) {
        throw new Error("Invalid credentials");
      }

      const data = await response.json();
      localStorage.setItem("authToken", data.token);

      console.log("Login successful! Navigating to dashboard...");
      alert("Login successful!");

      window.location.href = "/dashboard";
    } catch (error) {
      console.error("Error:", error);
      alert("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="form-row">
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email"
          id="email"
          name="email"
        />
      </div>

      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          type="password"
          placeholder="Password"
          id="password"
          name="password"
        />
      </div>

      <button type="button" onClick={handleLogin}>
        Login
      </button>
    </div>
  );
};

export default Login;
