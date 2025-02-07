import React, { useState, useEffect } from "react";
import { Card, CardContent } from "./components/card";
import { Button } from "./components/button";
import { Select, SelectItem } from "./components/select";
import { useNavigate } from "react-router-dom";
import "./App.css";
import "./index.css";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("All");
  const navigate = useNavigate();

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    console.log("Loaded tasks from localStorage:", savedTasks);
    setTasks(savedTasks);
  }, [navigate]);

  // const handleTaskClick = (taskId) => {
  //   navigate(`/task-details/${taskId}`);
  // };

  const handleAddNewTask = () => {
    navigate("/task-details");
  };

  const handleComplete = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, status: "Completed" } : task
    );
  };

  // const handleAddTask = () => {
  //   const currentUser = localStorage.getItem("currentUser");
  //   if (!currentUser) return;

  //   const updatedTasks = [...tasks, { ...newTask, id: tasks.length + 1 }];
  //   setTasks(updatedTasks);
  //   localStorage.setItem("tasks_${currentUser}", JSON.stringify(updatedTasks));
  // };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("currentUser"); // Clear current user info
    navigate("/login");
  };

  // const handleLogout = () => {
  //   localStorage.removeItem("authToken"); // Remove token
  //   navigate("/login"); // Redirect to login page
  // };

  const filteredTasks =
    filter === "All" ? tasks : tasks.filter((task) => task.status === filter);
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="box">Dashboard</h1>
        <Button onClick={handleLogout} className="rounded">
          Logout
        </Button>
      </div>

      <div className="mb-4">
        <Select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <SelectItem value="All">All</SelectItem>
          <SelectItem value="To Do">To Do</SelectItem>
          <SelectItem value="In Progress">In Progress</SelectItem>
          <SelectItem value="Completed">Completed</SelectItem>
        </Select>
      </div>

      <Button onClick={handleAddNewTask} className="box">
        Add New Task
      </Button>

      <div className="bg-gray-200 p-4">
        {filteredTasks.map((task) => (
          <Card key={task.id} className="items-center">
            <CardContent className="w-full">
              <h2 className="box">{task.title}</h2>
              <p>{task.description}</p>
              <p className="text-sm">
                Priority: {task.priority} | Due: {task.dueDate}
              </p>
            </CardContent>
            <div className="flex gap-2">
              <Button
                className="rounded"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/task-details`);
                }}
              >
                Change Task
              </Button>

              {task.status !== "Completed" && (
                <Button
                  className="bg-green-500 text-white px-4 py-2"
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
