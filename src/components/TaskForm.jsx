
import { useState } from "react";

const getDefaultForm = () => ({
  header: "",
  description: "",
  priority: "Medium",
  category: "Academic",
  dueDate: new Date().toLocaleDateString("en-CA"),
  status: "Raised",
});

const TaskForm = ({
  initialData,
  onSubmit,
  buttonText = "Create Task",
}) => {
  const [formData, setFormData] = useState(() => ({
    ...getDefaultForm(),
    ...initialData,
  }));

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    if (error) {
      setError("");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    const header = formData.header.trim();
    const description = formData.description.trim();

    if (!header) {
      setError("Please enter a task title.");
      return;
    }

    if (header.length < 3) {
      setError("The task title must contain at least 3 characters.");
      return;
    }

    if (header.length > 100) {
      setError("The task title cannot exceed 100 characters.");
      return;
    }

    if (!description) {
      setError("Please enter a task description.");
      return;
    }

    if (description.length > 1000) {
      setError("The description cannot exceed 1000 characters.");
      return;
    }

    if (!formData.dueDate) {
      setError("Please select a due date.");
      return;
    }

    setIsSubmitting(true);

    try {
      await onSubmit({
        ...formData,
        header,
        description,
      });
    } catch (submitError) {
      setError("Something went wrong. Please try again.");
      console.error(submitError);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      {error && (
        <div className="login-error" role="alert">
          ⚠ {error}
        </div>
      )}

      <div className="form-group">
        <label htmlFor="task-header">
          Task Title *
        </label>

        <input
          id="task-header"
          type="text"
          name="header"
          placeholder="e.g. Complete React assignment"
          value={formData.header}
          onChange={handleChange}
          maxLength={100}
          required
        />

        <small style={{ color: "#8994ad" }}>
          {formData.header.length}/100 characters
        </small>
      </div>

      <div className="form-group">
        <label htmlFor="task-description">
          Task Description *
        </label>

        <textarea
          id="task-description"
          name="description"
          rows={5}
          placeholder="Describe what needs to be done..."
          value={formData.description}
          onChange={handleChange}
          maxLength={1000}
          required
        />

        <small style={{ color: "#8994ad" }}>
          {formData.description.length}/1000 characters
        </small>
      </div>

      <div className="form-grid">
        <div className="form-group">
          <label htmlFor="task-priority-form">
            Priority
          </label>

          <select
            id="task-priority-form"
            name="priority"
            value={formData.priority}
            onChange={handleChange}
          >
            <option value="High">High Priority</option>
            <option value="Medium">Medium Priority</option>
            <option value="Low">Low Priority</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="task-category-form">
            Category
          </label>

          <select
            id="task-category-form"
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="Academic">Academic</option>
            <option value="Personal">Personal</option>
          </select>
        </div>
      </div>

      <div className="form-grid">
        <div className="form-group">
          <label htmlFor="task-due-date">
            Due Date *
          </label>

          <input
            id="task-due-date"
            type="date"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="task-status-form">
            Task Status
          </label>

          <select
            id="task-status-form"
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="Raised">Raised</option>
            <option value="Pending">Pending</option>
            <option value="Closed">Completed</option>
          </select>
        </div>
      </div>

      <button
        type="submit"
        className="primary-btn"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Saving..." : `${buttonText} →`}
      </button>
    </form>
  );
};

export default TaskForm;
