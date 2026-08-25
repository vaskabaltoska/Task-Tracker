import React, { useState, useEffect } from "react";
import { Card, CardContent } from "./components/card";
import { Button } from "./components/button";
import { Select, SelectItem } from "./components/select";
import { useNavigate } from "react-router-dom";
import "./App.css";
import "./index.css";
import "./dashboard.css";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("All");
  const navigate = useNavigate();

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    console.log("Loaded tasks from localStorage:", savedTasks);
    setTasks(savedTasks);
  }, [navigate]);

  const handleAddNewTask = () => {
    navigate("/task-details");
  };

  const handleComplete = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, status: "Completed" } : task,
    );

    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("currentUser"); // Clear current user info
    navigate("/login");
  };

  const filteredTasks =
    filter === "All" ? tasks : tasks.filter((task) => task.status === filter);
  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Dashboard</h1>

        <Button onClick={handleLogout} className="dashboard-btn logout-btn">
          Logout
        </Button>
      </div>

      <div className="dashboard-controls">
        <Select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="dashboard-filter"
        >
          <SelectItem value="All">All</SelectItem>
          <SelectItem value="To Do">To Do</SelectItem>
          <SelectItem value="In Progress">In Progress</SelectItem>
          <SelectItem value="Completed">Completed</SelectItem>
        </Select>

        <Button
          onClick={handleAddNewTask}
          className="dashboard-btn add-task-btn"
        >
          + Add New Task
        </Button>
      </div>

      <div className="tasks-container">
        {filteredTasks.map((task) => (
          <Card key={task.id} className="task-card">
            <CardContent className="task-info">
              <h2 className="task-title">{task.title}</h2>

              <p className="task-description">{task.description}</p>

              <p className="task-details">
                Priority: {task.priority} | Due: {task.dueDate}
              </p>
            </CardContent>
            <div className="task-actions">
              <Button
                className="dashboard-btn change-task-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/task-details?id=${task.id}`);
                }}
              >
                Change Task
              </Button>

              {task.status !== "Completed" && (
                <Button
                  className="dashboard-btn complete-task-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleComplete(task.id);
                  }}
                >
                  Mark as Completed
                </Button>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
