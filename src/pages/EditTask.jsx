import { useNavigate, useParams } from "react-router-dom";
import { useTasks } from "../context/TaskContext";
import TaskForm from "../components/TaskForm";

const EditTask = () => {

  const { id } = useParams();

  const navigate = useNavigate();

  const {
    tasks,
    updateTask,
  } = useTasks();

  const task = tasks.find(
    (item) => item.id === Number(id)
  );

  if (!task) {
    return <h2>Task not found</h2>;
  }

  const handleSubmit = (updatedTask) => {

    updateTask(task.id, updatedTask);

    navigate(`/tasks/${task.id}`);
  };

  return (
    <>

      <div className="page-title">

        <span className="section-label">
          UPDATE
        </span>

        <h2>Edit Task</h2>

        <p>
          Update the task information below.
        </p>

      </div>

      <div className="form-container">

        <div className="form-header">

          <div className="form-icon">
            ✎
          </div>

          <div>
            <h3>Update Task Information</h3>
            <p>
              Make the necessary changes.
            </p>
          </div>

        </div>

        <TaskForm
          initialData={task}
          onSubmit={handleSubmit}
          buttonText="Save Changes"
        />

      </div>

    </>
  );
};

export default EditTask;