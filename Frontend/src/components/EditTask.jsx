import { useState } from "react";
import API from "../api/axios";

export default function EditTask({ task, close, refresh }) {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [dueDate, setDueDate] = useState(task.dueDate?.slice(0, 10));
  const [priority, setPriority] = useState(task.priority);

  const updateTask = async () => {
    await API.put(`/tasks/${task._id}`, {
      title,
      description,
      dueDate,
      priority
    });

    refresh();
    close();
  };

  return (
    <>
      <div
        onClick={close}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          backgroundColor: "rgba(0,0,0,0.5)",
          zIndex: 1000
        }}
      />

      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          background: "#fff",
          padding: "20px",
          width: "400px",
          borderRadius: "8px",
          zIndex: 1001
        }}
      >
        <h3>Edit Task</h3>

        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Title"
        />

        <textarea
          value={description}
          onChange={e => setDescription(e.target.value)}
          placeholder="Description"
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

        <div style={{ marginTop: "10px" }}>
          <button onClick={updateTask}>Save</button>
          <button onClick={close} style={{ marginLeft: "10px" }}>
            Cancel
          </button>
        </div>
      </div>
    </>
  );
}
