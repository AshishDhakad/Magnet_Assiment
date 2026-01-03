
import { Link } from "react-router-dom";

export default function Navbar() {
  const role = localStorage.getItem("role");
  const userName = localStorage.getItem("userName");

  return (
    <div
      style={{
        padding: "10px",
        borderBottom: "1px solid #ccc",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}
    >
      <div>
        <b>Task Manager</b>

        <span style={{ marginLeft: "15px" }}>
          👤 {userName} ({role})
        </span>

        {/* 👑 ADMIN ONLY LINK */}
        {role === "admin" && (
          <Link
            to="/admin/users"
            style={{ marginLeft: "20px" }}
          >
            Manage Users
          </Link>
        )}
      </div>

      <button
        onClick={() => {
          localStorage.clear();
          window.location.href = "/login";
        }}
      >
        Logout
      </button>
    </div>
  );
}
