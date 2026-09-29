import { useNavigate } from "react-router-dom";
import { useTasks } from "../context/TaskContext";
import TaskForm from "../components/TaskForm";

const AddTask = () => {

  const { addTask } = useTasks();
  const navigate = useNavigate();

  const handleSubmit = (task) => {

    addTask(task);

    navigate("/tasks");
  };

  return (
    <>

      <div className="page-title">

        <span className="section-label">
          CREATE
        </span>

        <h2>Add New Task</h2>

        <p>
          Create a new task and keep your work organized.
        </p>

      </div>

      <div className="form-container">

        <div className="form-header">
          <div className="form-icon">＋</div>

          <div>
            <h3>Task Information</h3>
            <p>
              Fill in the details below.
            </p>
          </div>
        </div>

        <TaskForm
          onSubmit={handleSubmit}
          buttonText="Create Task"
        />

      </div>

    </>
  );
};

export default AddTask;