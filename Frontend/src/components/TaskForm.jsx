





import { useEffect, useState } from "react";
import API from "../api/axios";

export default function TaskForm({ onTaskAdded }) {
  const role = localStorage.getItem("role");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("medium");
  const [users, setUsers] = useState([]);
  const [assignedTo, setAssignedTo] = useState("");

 
  useEffect(() => {
    if (role === "admin") {
      API.get("/users").then(res => setUsers(res.data));
    }
  }, [role]);

  const createTask = async () => {
    const payload = {
      title,
      description,
      dueDate,
      priority
    };

    
    if (role === "admin") {
      if (!assignedTo) {
        alert("Please assign a user");
        return;
      }
      payload.assignedTo = assignedTo;
    }

    await API.post("/tasks", payload);

    setTitle("");
    setDescription("");
    setDueDate("");
    setPriority("medium");
    setAssignedTo("");

    onTaskAdded();
  };

  return (
    <div>
      <h3>{role === "admin" ? "Add Task (Admin)" : "Add My Task"}</h3>

      <input
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />

      <textarea
        placeholder="Description"
        value={description}
        onChange={e => setDescription(e.target.value)}
      />

      <input
        type="date"
        value={dueDate}
        onChange={e => setDueDate(e.target.value)}
      />

      <select
        value={priority}
        onChange={e => setPriority(e.target.value)}
      >
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </select>

      
      {role === "admin" && (
        <select
          value={assignedTo}
          onChange={e => setAssignedTo(e.target.value)}
        >
          <option value="">Assign User</option>
          {users.map(user => (
            <option key={user._id} value={user._id}>
              {user.name} {user.role === "admin" ? "(Admin)" : ""}
            </option>
          ))}
        </select>
      )}

      <button onClick={createTask}>Add Task</button>
    </div>
  );
}
