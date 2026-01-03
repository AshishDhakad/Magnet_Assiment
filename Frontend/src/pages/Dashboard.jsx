


import { useState } from "react";
import Navbar from "../components/Navbar";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

export default function Dashboard() {
  const [reload, setReload] = useState(false);

  return (
    <>
      <Navbar />
      <TaskForm onTaskAdded={() => setReload(!reload)} />
      <TaskList reload={reload} />
    </>
  );
}

