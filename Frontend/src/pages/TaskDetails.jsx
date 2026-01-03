import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/axios";
import Navbar from "../components/Navbar";

export default function TaskDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);

  useEffect(() => {
    API.get(`/tasks/${id}`)
      .then(res => setTask(res.data))
      .catch(() => alert("Failed to load task"));
  }, [id]);

  if (!task) return <p>Loading...</p>;

  return (
    <>
      <Navbar />

      <div style={{ maxWidth: "600px", margin: "20px auto" }}>
        <h2>{task.title}</h2>

        <p><b>Description:</b> {task.description}</p>
        <p><b>Due Date:</b> {task.dueDate?.slice(0, 10)}</p>
        <p><b>Status:</b> {task.status}</p>
        <p><b>Priority:</b> {task.priority}</p>

        {task.assignedTo && (
          <p>
            <b>Assigned To:</b> {task.assignedTo.name}
          </p>
        )}

        <button onClick={() => navigate(-1)}>Back</button>
      </div>
    </>
  );
}
