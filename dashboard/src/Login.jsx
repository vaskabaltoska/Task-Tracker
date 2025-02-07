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

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:5176/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password: pass }),
      });

      if (!response.ok) {
        throw new Error("Invalid credentials");
      }

      const data = await response.json();
      localStorage.setItem("authToken", data.token);

      console.log("Login successful! Navigating to dashboard...");
      alert("Login successful!");

      navigate("/dashboard");
    } catch (error) {
      console.error("Error:", error);
      alert("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="auth-form-container">
      <h2>Login</h2>
      <form className="login-form" onSubmit={handleLogin}>
        <label htmlFor="email">Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email"
          id="email"
          name="email"
        />
        <label htmlFor="password">Password</label>
        <input
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          type="password"
          placeholder="Password"
          id="password"
          name="password"
        />
        {/* <button type="submit">Login</button> */}

        <button
          onClick={handleLogin}
          className="bg-blue-500 text-white px-4 py-2"
        >
          Login
        </button>
      </form>
      <button className="link-btn" onClick={() => navigate("/register")}>
        Don't have an account? Register here
      </button>
    </div>
  );
};

export default Login;
