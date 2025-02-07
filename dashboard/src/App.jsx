import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Dashboard from "./dashboard";
import TaskDetailsPage from "./TaskDetailsPage";

const App = () => {
  const authToken = localStorage.getItem("authToken");

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            authToken ? <Navigate to="/dashboard" /> : <Navigate to="/login" />
          }
        />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={authToken ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/task-details"
          element={authToken ? <TaskDetailsPage /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
};

export default App;
