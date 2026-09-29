import { useState } from "react";
import { useTasks } from "../context/TaskContext";
import TaskCard from "../components/TaskCard";

const Tasks = () => {

  const { tasks } = useTasks();

  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");

  const filteredTasks = tasks.filter((task) => {

    const statusMatch =
      statusFilter === "All" ||
      task.status === statusFilter;

    const priorityMatch =
      priorityFilter === "All" ||
      task.priority === priorityFilter;

    const categoryMatch =
      categoryFilter === "All" ||
      task.category === categoryFilter;

    return (
      statusMatch &&
      priorityMatch &&
      categoryMatch
    );
  });

  return (
    <>

      <div className="page-title">

        <div>
          <span className="section-label">
            WORKSPACE
          </span>

          <h2>All Tasks</h2>

          <p>
            Manage and organize all your tasks.
          </p>
        </div>

      </div>

      <div className="filters">

        <div>
          <label>Status</label>

          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value)
            }
          >
            <option>All</option>
            <option>Raised</option>
            <option>Pending</option>
            <option>Closed</option>
          </select>
        </div>

        <div>
          <label>Priority</label>

          <select
            value={priorityFilter}
            onChange={(e) =>
              setPriorityFilter(e.target.value)
            }
          >
            <option>All</option>
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>
        </div>

        <div>
          <label>Category</label>

          <select
            value={categoryFilter}
            onChange={(e) =>
              setCategoryFilter(e.target.value)
            }
          >
            <option>All</option>
            <option>Academic</option>
            <option>Personal</option>
          </select>
        </div>

      </div>

      <div className="results-count">
        Showing <strong>{filteredTasks.length}</strong> tasks
      </div>

      <div className="task-grid">

        {filteredTasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
          />
        ))}

      </div>

      {filteredTasks.length === 0 && (
        <div className="no-tasks">
          <div>🔍</div>
          <h3>No tasks found</h3>
          <p>Try changing your filters.</p>
        </div>
      )}

    </>
  );
};

export default Tasks;