import { useTasks } from "../context/TaskContext";
import TaskCard from "../components/TaskCard";

const CompletedTasks = () => {

  const { tasks } = useTasks();

  const completedTasks = tasks.filter(
    (task) => task.status === "Closed"
  );

  return (
    <>

      <div className="page-title">

        <span className="section-label">
          ARCHIVE
        </span>

        <h2>Completed Tasks</h2>

        <p>
          Here's everything you've successfully completed.
        </p>

      </div>

      {completedTasks.length > 0 ? (

        <div className="task-grid">

          {completedTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
            />
          ))}

        </div>

      ) : (

        <div className="no-tasks">

          <div>✓</div>

          <h3>No completed tasks yet</h3>

          <p>
            Complete a task and it will appear here.
          </p>

        </div>

      )}

    </>
  );
};

export default CompletedTasks;