





import { useEffect, useState } from "react";
import API from "../api/axios";
import Navbar from "../components/Navbar";

export default function AdminUsers() {
  const role = localStorage.getItem("role");
  if (role !== "admin") {
    return <h3 style={{ textAlign: "center" }}>Access Denied</h3>;
  }

  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const fetchUsers = async () => {
    const res = await API.get("/users");
    setUsers(res.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const createUser = async () => {
    await API.post("/users", form);
    setForm({ name: "", email: "", password: "" });
    fetchUsers();
  };

  const deleteUser = async (id) => {
    if (!window.confirm("Delete this user?")) return;
    await API.delete(`/users/${id}`);
    fetchUsers();
  };

  return (
    <>
      <Navbar />

      <div style={{ maxWidth: "600px", margin: "20px auto" }}>
        <h2>Admin – Manage Users</h2>

        <h4>Create User</h4>
        <input
          placeholder="Name"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
        />
        <input
          placeholder="Email"
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={e => setForm({ ...form, password: e.target.value })}
        />

        <button onClick={createUser}>Create User</button>

        <hr />

        <h4>Users List</h4>
        {users.map(user => (
          <div key={user._id} style={{ marginBottom: "8px" }}>
            {user.name} ({user.email})
            <button
              style={{ marginLeft: "10px" }}
              onClick={() => deleteUser(user._id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </>
  );
}
