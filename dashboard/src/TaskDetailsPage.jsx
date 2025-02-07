import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const TaskDetailsPage = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [filterDate, setFilterDate] = useState("");
  const [sortStatus, setSortStatus] = useState("All");
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    priority: "Medium",
    dueDate: "",
    status: "To Do",
    notes: "",
  });

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(storedTasks);
  }, []);

  const handleSaveTask = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task } : task
    );
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    console.log("Tasks updated in localStorage:", updatedTasks);
  };

  const handleAddTask = () => {
    if (!newTask.title.trim()) return;
    const newTaskData = {
      id: Date.now(),
      ...newTask,
    };
    const updatedTasks = [...tasks, newTaskData];
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    console.log("New task added:", newTaskData);

    setNewTask({
      title: "",
      description: "",
      priority: "Medium",
      dueDate: "",
      status: "To Do",
      notes: "",
    });
  };

  const handleDelete = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const filteredTasks = tasks.filter((task) =>
    filterDate ? task.dueDate === filterDate : true
  );
  const sortedTasks =
    sortStatus === "All"
      ? filteredTasks
      : filteredTasks.filter((task) => task.status === sortStatus);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Task Details</h1>
      <div>
        <label>Filter by Date:</label>
        <input
          type="date"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
        />
        <label>Sort by Status:</label>
        <select
          value={sortStatus}
          onChange={(e) => setSortStatus(e.target.value)}
        >
          <option value="All">All</option>
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>
      <div>
        <h2>Add New Task</h2>
        <input
          type="text"
          placeholder="Title"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
        />
        <textarea
          placeholder="Description"
          value={newTask.description}
          onChange={(e) =>
            setNewTask({ ...newTask, description: e.target.value })
          }
        ></textarea>
        <input
          type="date"
          value={newTask.dueDate}
          onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
        />
        <select
          value={newTask.status}
          onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
        >
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
        <button onClick={handleAddTask}>Add Task</button>
      </div>
      <div>
        <h2>All Tasks</h2>
        {sortedTasks.map((task) => (
          <div key={task.id}>
            <input
              type="text"
              value={task.title}
              onChange={(e) =>
                setTasks(
                  tasks.map((t) =>
                    t.id === task.id ? { ...t, title: e.target.value } : t
                  )
                )
              }
            />
            <textarea
              value={task.description}
              onChange={(e) =>
                setTasks(
                  tasks.map((t) =>
                    t.id === task.id ? { ...t, description: e.target.value } : t
                  )
                )
              }
            ></textarea>
            <input
              type="date"
              value={task.dueDate}
              onChange={(e) =>
                setTasks(
                  tasks.map((t) =>
                    t.id === task.id ? { ...t, dueDate: e.target.value } : t
                  )
                )
              }
            />
            <select
              value={task.status}
              onChange={(e) =>
                setTasks(
                  tasks.map((t) =>
                    t.id === task.id ? { ...t, status: e.target.value } : t
                  )
                )
              }
            >
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
            <button onClick={() => handleSaveTask(task.id)}>Save</button>
            <button onClick={() => handleDelete(task.id)}>Delete</button>
          </div>
        ))}
      </div>
      <button onClick={() => navigate("/dashboard")}>Back to Dashboard</button>
    </div>
  );
};

export default TaskDetailsPage;
