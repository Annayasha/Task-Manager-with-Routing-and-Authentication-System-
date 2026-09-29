import { Link, useNavigate, useParams } from "react-router-dom";
import { useTasks } from "../context/TaskContext";

const TaskDetails = () => {

  const { id } = useParams();

  const navigate = useNavigate();

  const {
    tasks,
    deleteTask,
    changeStatus,
  } = useTasks();

  const task = tasks.find(
    (item) => item.id === Number(id)
  );

  if (!task) {
    return (
      <div className="not-found">

        <div>🔎</div>

        <h2>Task Not Found</h2>

        <p>
          The task you're looking for doesn't exist.
        </p>

        <Link
          to="/tasks"
          className="primary-btn"
        >
          ← Back to Tasks
        </Link>

      </div>
    );
  }

  const handleDelete = () => {

    deleteTask(task.id);

    navigate("/tasks");
  };

  const handleComplete = () => {

    changeStatus(task.id, "Closed");
  };

  return (
    <>

      <Link
        to="/tasks"
        className="back-link"
      >
        ← Back to Tasks
      </Link>

      <div className="details-card">

        <div className="details-header">

          <div>

            <div className="details-badges">

              <span
                className={`priority ${task.priority.toLowerCase()}`}
              >
                {task.priority} Priority
              </span>

              <span
                className={`status ${task.status.toLowerCase()}`}
              >
                {task.status}
              </span>

            </div>

            <h2>{task.header}</h2>

            <p>
              {task.description}
            </p>

          </div>

        </div>

        <div className="details-info">

          <div>
            <span>Category</span>
            <strong>📚 {task.category}</strong>
          </div>

          <div>
            <span>Raised Date</span>
            <strong>
              📅{" "}
              {new Date(
                task.raisedDate
              ).toLocaleString()}
            </strong>
          </div>

          <div>
            <span>Due Date</span>
            <strong>
              ⏰ {task.dueDate}
            </strong>
          </div>

          <div>
            <span>Status</span>
            <strong>
              {task.status}
            </strong>
          </div>

        </div>

        <div className="details-actions">

          {task.status !== "Closed" && (
            <button
              className="complete-large"
              onClick={handleComplete}
            >
              ✓ Mark as Completed
            </button>
          )}

          <Link
            to={`/tasks/${task.id}/edit`}
            className="edit-btn"
          >
            ✎ Edit Task
          </Link>

          <button
            className="delete-large"
            onClick={handleDelete}
          >
            🗑 Delete Task
          </button>

        </div>

      </div>

    </>
  );
};

export default TaskDetails;