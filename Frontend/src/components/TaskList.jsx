


import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import EditTask from "./EditTask";

const ITEMS_PER_PAGE = 5;

export default function TaskList({ reload }) {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  const [highPage, setHighPage] = useState(1);
  const [mediumPage, setMediumPage] = useState(1);
  const [lowPage, setLowPage] = useState(1);

  const navigate = useNavigate();

  const role = localStorage.getItem("role");
  const userName = localStorage.getItem("userName");

 
  const fetchTasks = async () => {
    const res = await API.get("/tasks");
    setTasks(res.data.tasks || res.data);

    
    setHighPage(1);
    setMediumPage(1);
    setLowPage(1);
  };

  useEffect(() => {
    fetchTasks();
  }, [reload]);

  
  const deleteTask = async (id) => {
    if (!window.confirm("Delete this task?")) return;
    await API.delete(`/tasks/${id}`);
    fetchTasks();
  };

  
  const highTasks = tasks.filter(t => t.priority === "high");
  const mediumTasks = tasks.filter(t => t.priority === "medium");
  const lowTasks = tasks.filter(t => t.priority === "low");

  const paginate = (list, page) => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    return list.slice(start, start + ITEMS_PER_PAGE);
  };

  
  const renderTasks = (list) =>
    list.map(task => {
      const isOwner =
        role === "admin" ||
        task.assignedTo?.name === userName;

      return (
        <div
          key={task._id}
          className={`task-card ${task.priority} ${
            task.status === "completed" ? "completed" : ""
          }`}
        >
          <b>{task.title}</b>
          <p>Due: {task.dueDate?.slice(0, 10)}</p>
          <p>Status: {task.status}</p>

          
          {role === "admin" && task.assignedTo && (
            <p>
              Assigned To: <b>{task.assignedTo.name}</b>
            </p>
          )}

          <button onClick={() => navigate(`/tasks/${task._id}`)}>
            View
          </button>

          {isOwner && (
            <>
              <button onClick={() => setEditingTask(task)}>
                Edit
              </button>

              <button onClick={() => deleteTask(task._id)}>
                Delete
              </button>
            </>
          )}

          <button
            onClick={async () => {
              await API.patch(`/tasks/${task._id}/status`, {
                status:
                  task.status === "pending"
                    ? "completed"
                    : "pending"
              });
              fetchTasks();
            }}
          >
            {task.status === "pending"
              ? "Mark Completed"
              : "Mark Pending"}
          </button>
        </div>
      );
    });

  return (
    <>
      <h2>My Tasks</h2>

    
      <section>
        <h3 style={{ color: "red" }}>High Priority</h3>
        {renderTasks(paginate(highTasks, highPage))}

        <button
          disabled={highPage === 1}
          onClick={() => setHighPage(highPage - 1)}
        >
          Prev
        </button>

        <button
          disabled={highPage * ITEMS_PER_PAGE >= highTasks.length}
          onClick={() => setHighPage(highPage + 1)}
        >
          Next
        </button>
      </section>

      
      <section>
        <h3 style={{ color: "#d4a100" }}>Medium Priority</h3>
        {renderTasks(paginate(mediumTasks, mediumPage))}

        <button
          disabled={mediumPage === 1}
          onClick={() => setMediumPage(mediumPage - 1)}
        >
          Prev
        </button>

        <button
          disabled={
            mediumPage * ITEMS_PER_PAGE >= mediumTasks.length
          }
          onClick={() => setMediumPage(mediumPage + 1)}
        >
          Next
        </button>
      </section>

     
      <section>
        <h3 style={{ color: "green" }}>Low Priority</h3>
        {renderTasks(paginate(lowTasks, lowPage))}

        <button
          disabled={lowPage === 1}
          onClick={() => setLowPage(lowPage - 1)}
        >
          Prev
        </button>

        <button
          disabled={lowPage * ITEMS_PER_PAGE >= lowTasks.length}
          onClick={() => setLowPage(lowPage + 1)}
        >
          Next
        </button>
      </section>

      
      {editingTask && (
        <EditTask
          task={editingTask}
          close={() => setEditingTask(null)}
          refresh={fetchTasks}
        />
      )}
    </>
  );
}
