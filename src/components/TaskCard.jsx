import { Link } from "react-router-dom";
import { useTasks } from "../context/TaskContext";

const TaskCard = ({ task }) => {
  const { deleteTask, changeStatus } = useTasks();

  return (
    <div className="task-card">

      <div className="task-card-top">

        <span className={`priority ${task.priority.toLowerCase()}`}>
          {task.priority}
        </span>

        <span className={`status ${task.status.toLowerCase()}`}>
          {task.status}
        </span>

      </div>

      <h3>{task.header}</h3>

      <p>{task.description}</p>

      <div className="task-meta">

        <span>
          📚 {task.category}
        </span>

        <span>
          📅 {task.dueDate}
        </span>

      </div>

      <div className="task-card-footer">

        <Link
          to={`/tasks/${task.id}`}
          className="view-btn"
        >
          View Details
        </Link>

        {task.status !== "Closed" && (
          <button
            className="complete-btn"
            onClick={() =>
              changeStatus(task.id, "Closed")
            }
          >
            ✓ Complete
          </button>
        )}

        <button
          className="delete-btn"
          onClick={() => deleteTask(task.id)}
        >
          🗑
        </button>

      </div>

    </div>
  );
};

export default TaskCard;