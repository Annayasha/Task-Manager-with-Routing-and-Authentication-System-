
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Sidebar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  const navigation = [
    { to: "/dashboard", icon: "▦", label: "Dashboard" },
    { to: "/tasks", icon: "☷", label: "All Tasks" },
    { to: "/add-task", icon: "＋", label: "Add Task" },
    { to: "/completed", icon: "✓", label: "Completed" },
  ];

  const username = user?.username || "User";

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="logo-icon">✓</div>

        <div>
          <h2>TaskFlow Pro</h2>
          <span>Personal workspace</span>
        </div>
      </div>

      <div
        style={{
          padding: "0 10px 10px",
          color: "#64718d",
          fontSize: 10,
          fontWeight: 800,
          letterSpacing: 1.5,
        }}
      >
        WORKSPACE
      </div>

      <nav className="sidebar-nav" aria-label="Main navigation">
        {navigation.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === "/dashboard"}
            className={({ isActive }) =>
              `nav-item${isActive ? " active" : ""}`
            }
          >
            <span aria-hidden="true">{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-bottom">
        <div className="user-profile">
          <div className="user-avatar">
            {username.charAt(0).toUpperCase()}
          </div>

          <div className="user-info">
            <strong>{username}</strong>
            <span>Signed in</span>
          </div>
        </div>

        <button
          type="button"
          className="logout-button"
          onClick={handleLogout}
        >
          ↪ &nbsp; Sign Out
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
