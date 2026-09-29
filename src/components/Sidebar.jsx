import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Sidebar = () => {

  const { user, logout } = useAuth();

  const navigate = useNavigate();


  const handleLogout = () => {

    logout();

    navigate("/login", {
      replace: true,
    });

  };


  return (
    <aside className="sidebar">

      <div className="sidebar-logo">

        <div className="logo-icon">
          ✓
        </div>

        <div>

          <h2>
            TaskFlow
          </h2>

          <span>
            Task Manager
          </span>

        </div>

      </div>


      <nav className="sidebar-nav">

        <NavLink
          to="/dashboard"
          className="nav-item"
        >
          <span>📊</span>
          Dashboard
        </NavLink>


        <NavLink
          to="/tasks"
          className="nav-item"
        >
          <span>📋</span>
          All Tasks
        </NavLink>


        <NavLink
          to="/add-task"
          className="nav-item"
        >
          <span>➕</span>
          Add Task
        </NavLink>


        <NavLink
          to="/completed"
          className="nav-item"
        >
          <span>✅</span>
          Completed
        </NavLink>

      </nav>


      <div className="sidebar-bottom">

        <div className="user-profile">

          <div className="user-avatar">
            {user?.username?.charAt(0).toUpperCase()}
          </div>

          <div className="user-info">

            <strong>
              {user?.username}
            </strong>

            <span>
              Logged in
            </span>

          </div>

        </div>


        <button
          className="logout-button"
          onClick={handleLogout}
        >
          🚪 Logout
        </button>

      </div>

    </aside>
  );
};

export default Sidebar;