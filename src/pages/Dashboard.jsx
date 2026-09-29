import { Link } from "react-router-dom";
import { useTasks } from "../context/TaskContext";
import TaskCard from "../components/TaskCard";

const Dashboard = () => {

  const { tasks } = useTasks();

  const total = tasks.length;

  const pending = tasks.filter(
    (task) => task.status === "Pending"
  ).length;

  const raised = tasks.filter(
    (task) => task.status === "Raised"
  ).length;

  const completed = tasks.filter(
    (task) => task.status === "Closed"
  ).length;

  return (
    <>

      <div className="welcome-section">

        <div>
          <span className="section-label">
            OVERVIEW
          </span>

          <h2>Good morning 👋</h2>

          <p>
            Here's what's happening with your tasks today.
          </p>
        </div>

        <Link
          to="/add-task"
          className="primary-btn"
        >
          ＋ Add New Task
        </Link>

      </div>

      <div className="stats-grid">

        <div className="stat-card blue">
          <div className="stat-icon">☷</div>
          <span>Total Tasks</span>
          <strong>{total}</strong>
          <small>All your tasks</small>
        </div>

        <div className="stat-card orange">
          <div className="stat-icon">◷</div>
          <span>Pending</span>
          <strong>{pending}</strong>
          <small>Need attention</small>
        </div>

        <div className="stat-card purple">
          <div className="stat-icon">◉</div>
          <span>Raised</span>
          <strong>{raised}</strong>
          <small>New tasks</small>
        </div>

        <div className="stat-card green">
          <div className="stat-icon">✓</div>
          <span>Completed</span>
          <strong>{completed}</strong>
          <small>Great progress!</small>
        </div>

      </div>

      <div className="section-heading">

        <div>
          <h2>Recent Tasks</h2>
          <p>Your latest task activity</p>
        </div>

        <Link to="/tasks">
          View all →
        </Link>

      </div>

      <div className="task-grid">

        {tasks.slice(0, 3).map((task) => (
          <TaskCard
            key={task.id}
            task={task}
          />
        ))}

      </div>

    </>
  );
};

export default Dashboard;