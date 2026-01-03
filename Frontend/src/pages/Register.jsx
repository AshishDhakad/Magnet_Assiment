

import { useState } from "react";
import API from "../api/axios";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({});
  const navigate = useNavigate();

//   const register = async () => {
//     await API.post("/auth/register", form);
//     navigate("/login");
//   };
const register = async () => {
  await API.post("/auth/register", {
    name,
    email,
    password
  });
  navigate("/login");
};


  return (
    <div style={{ maxWidth: "400px", margin: "100px auto" }}>
      <h2>Register</h2>

      <input placeholder="Name" onChange={e => setForm({...form, name:e.target.value})} />
      <br />
      <input placeholder="Email" onChange={e => setForm({...form, email:e.target.value})} />
      <br />
      <input type="password" placeholder="Password" onChange={e => setForm({...form, password:e.target.value})} />
      <br />

      <button onClick={register}>Register</button>

      <p style={{ marginTop: "10px" }}>
        Already have an account?{" "}
        <Link to="/login">Login</Link>
      </p>
    </div>
  );
}
