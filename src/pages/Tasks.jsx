
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

import { useTasks } from "../context/TaskContext";
import TaskCard from "../components/TaskCard";

const Tasks = () => {
  const { tasks } = useTasks();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [sortBy, setSortBy] = useState("newest");

  const filteredTasks = useMemo(() => {
    const query = search.trim().toLowerCase();

    return tasks
      .filter((task) => {
        const matchesSearch =
          task.header.toLowerCase().includes(query) ||
          task.description.toLowerCase().includes(query);

        const matchesStatus =
          statusFilter === "All" ||
          task.status === statusFilter;

        const matchesPriority =
          priorityFilter === "All" ||
          task.priority === priorityFilter;

        const matchesCategory =
          categoryFilter === "All" ||
          task.category === categoryFilter;

        return (
          matchesSearch &&
          matchesStatus &&
          matchesPriority &&
          matchesCategory
        );
      })
      .sort((a, b) => {
        if (sortBy === "dueDate") {
          return (a.dueDate || "").localeCompare(
            b.dueDate || ""
          );
        }

        if (sortBy === "priority") {
          const priorityRank = {
            High: 3,
            Medium: 2,
            Low: 1,
          };

          return (
            priorityRank[b.priority] -
            priorityRank[a.priority]
          );
        }

        if (sortBy === "alphabetical") {
          return a.header.localeCompare(b.header);
        }

        return Number(b.id) - Number(a.id);
      });
  }, [
    tasks,
    search,
    statusFilter,
    priorityFilter,
    categoryFilter,
    sortBy,
  ]);

  const clearFilters = () => {
    setSearch("");
    setStatusFilter("All");
    setPriorityFilter("All");
    setCategoryFilter("All");
    setSortBy("newest");
  };

  const hasActiveFilters =
    search !== "" ||
    statusFilter !== "All" ||
    priorityFilter !== "All" ||
    categoryFilter !== "All";

  return (
    <>
      <div className="page-title">
        <div>
          <span className="section-label">
            WORKSPACE / TASKS
          </span>

          <h2>All Tasks</h2>

          <p>
            Search, organize, and track everything on your list.
          </p>
        </div>

        <Link to="/add-task" className="primary-btn">
          ＋ Create New Task
        </Link>
      </div>

      <div className="filters">
        <div>
          <label htmlFor="task-search">
            Search Tasks
          </label>

          <input
            id="task-search"
            type="search"
            placeholder="Search by title or description..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              minHeight: 44,
              padding: "10px 12px",
              border: "1px solid #303b53",
              borderRadius: 10,
              background: "#101729",
              color: "#e5e7eb",
            }}
          />
        </div>

        <div>
          <label htmlFor="task-status">
            Status
          </label>

          <select
            id="task-status"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All statuses</option>
            <option value="Raised">Raised</option>
            <option value="Pending">Pending</option>
            <option value="Closed">Completed</option>
          </select>
        </div>

        <div>
          <label htmlFor="task-priority">
            Priority
          </label>

          <select
            id="task-priority"
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
          >
            <option value="All">All priorities</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>

        <div>
          <label htmlFor="task-category">
            Category
          </label>

          <select
            id="task-category"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="All">All categories</option>
            <option value="Academic">Academic</option>
            <option value="Personal">Personal</option>
          </select>
        </div>

        <div>
          <label htmlFor="task-sort">
            Sort By
          </label>

          <select
            id="task-sort"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="newest">Newest first</option>
            <option value="dueDate">Earliest due date</option>
            <option value="priority">Highest priority</option>
            <option value="alphabetical">Title A–Z</option>
          </select>
        </div>

        <div style={{ justifyContent: "flex-end" }}>
          <label>&nbsp;</label>

          <button
            type="button"
            className="edit-btn"
            onClick={clearFilters}
            disabled={!hasActiveFilters && sortBy === "newest"}
            style={{ minHeight: 44 }}
          >
            ↻ Reset Filters
          </button>
        </div>
      </div>

      <div className="section-heading">
        <div>
          <h2>Your Task List</h2>

          <p>
            Showing {filteredTasks.length} of {tasks.length} tasks
          </p>
        </div>
      </div>

      {filteredTasks.length > 0 ? (
        <div className="task-grid">
          {filteredTasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      ) : (
        <div className="no-tasks">
          <div>⌕</div>

          <h3>
            {tasks.length === 0
              ? "Your workspace is ready"
              : "No matching tasks"}
          </h3>

          <p>
            {tasks.length === 0
              ? "Create your first task and start organizing your day."
              : "Try another search or adjust your filters."}
          </p>

          {tasks.length === 0 ? (
            <Link to="/add-task" className="primary-btn">
              ＋ Create Your First Task
            </Link>
          ) : (
            <button
              type="button"
              className="primary-btn"
              onClick={clearFilters}
            >
              Clear Search & Filters
            </button>
          )}
        </div>
      )}
    </>
  );
};

export default Tasks;
