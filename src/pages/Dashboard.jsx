
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTasks } from "../context/TaskContext";
import TaskCard from "../components/TaskCard";

const Dashboard = () => {
  const { user } = useAuth();
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

  const overdue = tasks.filter((task) => {
    return (
      task.status !== "Closed" &&
      task.dueDate &&
      new Date(`${task.dueDate}T23:59:59`) < new Date()
    );
  }).length;

  const completionRate =
    total === 0
      ? 0
      : Math.round((completed / total) * 100);

  const hour = new Date().getHours();

  const greeting =
    hour < 12
      ? "Good morning"
      : hour < 17
        ? "Good afternoon"
        : "Good evening";

  const recentTasks = [...tasks]
    .sort((a, b) => Number(b.id) - Number(a.id))
    .slice(0, 3);

  return (
    <>
      <section className="welcome-section">
        <div>
          <span className="section-label">
            WORKSPACE / OVERVIEW
          </span>

          <h2>
            {greeting}
            {user?.username
              ? `, ${user.username}`
              : ""} 👋
          </h2>

          <p>
            Here's your productivity overview. Let's make today count.
          </p>
        </div>

        <Link to="/add-task" className="primary-btn">
          ＋ Create New Task
        </Link>
      </section>

      <section className="stats-grid">
        <div className="stat-card blue">
          <div className="stat-icon">▤</div>
          <span>Total Tasks</span>
          <strong>{total}</strong>
          <small>All tasks in your workspace</small>
        </div>

        <div className="stat-card orange">
          <div className="stat-icon">◷</div>
          <span>Pending</span>
          <strong>{pending}</strong>
          <small>Tasks needing attention</small>
        </div>

        <div className="stat-card purple">
          <div className="stat-icon">◈</div>
          <span>New Tasks</span>
          <strong>{raised}</strong>
          <small>Recently raised tasks</small>
        </div>

        <div className="stat-card green">
          <div className="stat-icon">✓</div>
          <span>Completed</span>
          <strong>{completed}</strong>
          <small>Tasks successfully finished</small>
        </div>
      </section>

      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
          gap: 17,
          marginBottom: 35,
        }}
      >
        <div className="task-card">
          <div className="section-label">
            PRODUCTIVITY
          </div>

          <h3 style={{ fontSize: 17, marginBottom: 8 }}>
            Completion progress
          </h3>

          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: 8,
              margin: "12px 0",
            }}
          >
            <strong
              style={{
                color: "#c0b5ff",
                fontSize: 34,
                fontFamily: "Manrope, sans-serif",
              }}
            >
              {completionRate}%
            </strong>

            <span style={{ color: "#929db5", fontSize: 11 }}>
              of all tasks completed
            </span>
          </div>

          <div
            role="progressbar"
            aria-label="Task completion progress"
            aria-valuenow={completionRate}
            aria-valuemin={0}
            aria-valuemax={100}
            style={{
              height: 8,
              overflow: "hidden",
              borderRadius: 20,
              background: "#303950",
            }}
          >
            <div
              style={{
                width: `${completionRate}%`,
                height: "100%",
                borderRadius: 20,
                background: "linear-gradient(90deg, #7665ed, #b3a2ff)",
                transition: "width .3s",
              }}
            />
          </div>

          <p style={{ marginTop: 12, fontSize: 11 }}>
            {total === 0
              ? "Create your first task to begin tracking progress."
              : completed === total
                ? "Amazing! All your tasks are completed."
                : "Keep going. Every completed task counts."}
          </p>
        </div>

        <div className="task-card">
          <div className="section-label">
            ATTENTION
          </div>

          <h3 style={{ fontSize: 17, marginBottom: 10 }}>
            Your task health
          </h3>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "12px 0",
              borderBottom: "1px solid #29334a",
            }}
          >
            <span style={{ color: "#929db5" }}>
              Overdue tasks
            </span>

            <strong style={{ color: overdue ? "#ff9aa9" : "#63e6be" }}>
              {overdue}
            </strong>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "12px 0",
            }}
          >
            <span style={{ color: "#929db5" }}>
              Remaining tasks
            </span>

            <strong style={{ color: "#c0b5ff" }}>
              {total - completed}
            </strong>
          </div>

          <Link
            to="/tasks"
            style={{
              display: "inline-block",
              marginTop: 8,
              color: "#b6aaff",
              fontSize: 12,
              fontWeight: 700,
            }}
          >
            Review your tasks →
          </Link>
        </div>
      </section>

      <section>
        <div className="section-heading">
          <div>
            <h2>Recent Tasks</h2>
            <p>Your latest tasks and their current status</p>
          </div>

          <Link to="/tasks">
            View all tasks →
          </Link>
        </div>

        {recentTasks.length > 0 ? (
          <div className="task-grid">
            {recentTasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        ) : (
          <div className="no-tasks">
            <div>✦</div>

            <h3>Your workspace starts here</h3>

            <p>
              Add your first task to see your progress on this dashboard.
            </p>

            <Link to="/add-task" className="primary-btn">
              ＋ Add Your First Task
            </Link>
          </div>
        )}
      </section>
    </>
  );
};

export default Dashboard;
