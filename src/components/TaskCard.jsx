
import { Link } from "react-router-dom";
import { useTasks } from "../context/TaskContext";

const TaskCard = ({ task }) => {
  const { deleteTask, changeStatus } = useTasks();

  const isCompleted = task.status === "Closed";

  const isOverdue =
    !isCompleted &&
    task.dueDate &&
    new Date(`${task.dueDate}T23:59:59`) < new Date();

  const formatDate = (date) => {
    if (!date) return "No due date";

    const parsed = new Date(`${date}T00:00:00`);

    if (Number.isNaN(parsed.getTime())) {
      return date;
    }

    return parsed.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const handleDelete = () => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${task.header}"?`
    );

    if (confirmed) {
      deleteTask(task.id);
    }
  };

  const handleComplete = () => {
    changeStatus(
      task.id,
      isCompleted ? "Pending" : "Closed"
    );
  };

  return (
    <article className="task-card">
      <div className="task-card-top">
        <span className={`priority ${task.priority.toLowerCase()}`}>
          {task.priority === "High"
            ? "⚡"
            : task.priority === "Medium"
              ? "◈"
              : "○"}{" "}
          {task.priority} Priority
        </span>

        <span className={`status ${task.status.toLowerCase()}`}>
          {isCompleted ? "✓ Completed" : task.status}
        </span>
      </div>

      <h3>{task.header}</h3>

      <p>{task.description}</p>

      <div className="task-meta">
        <span>▦ {task.category}</span>

        <span>
          ◷ {formatDate(task.dueDate)}
        </span>
      </div>

      {isOverdue && (
        <div
          style={{
            marginBottom: 8,
            color: "#ff9aa9",
            fontSize: 11,
            fontWeight: 700,
          }}
        >
          ⚠ This task is overdue
        </div>
      )}

      <div className="task-card-footer">
        <Link
          to={`/tasks/${task.id}`}
          className="view-btn"
          aria-label={`View details for ${task.header}`}
        >
          View Details ↗
        </Link>

        <button
          type="button"
          className="complete-btn"
          onClick={handleComplete}
          aria-label={
            isCompleted
              ? `Reopen ${task.header}`
              : `Complete ${task.header}`
          }
        >
          {isCompleted ? "↺ Reopen" : "✓ Complete"}
        </button>

        <button
          type="button"
          className="delete-btn"
          onClick={handleDelete}
          aria-label={`Delete ${task.header}`}
          title="Delete task"
        >
          ✕
        </button>
      </div>
    </article>
  );
};

export default TaskCard;
