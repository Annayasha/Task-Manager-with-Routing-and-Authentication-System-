import { useState } from "react";

const TaskForm = ({
  initialData,
  onSubmit,
  buttonText = "Create Task",
}) => {

  const [formData, setFormData] = useState(
    initialData || {
      header: "",
      description: "",
      priority: "Medium",
      category: "Academic",
      dueDate: "2026-08-28",
      status: "Raised",
    }
  );

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit(formData);
  };

  return (
    <form
      className="task-form"
      onSubmit={handleSubmit}
    >

      <div className="form-group">

        <label>Task Header</label>

        <input
          type="text"
          name="header"
          placeholder="Enter task title"
          value={formData.header}
          onChange={handleChange}
          required
        />

      </div>

      <div className="form-group">

        <label>Task Description</label>

        <textarea
          name="description"
          rows="5"
          placeholder="Describe your task..."
          value={formData.description}
          onChange={handleChange}
          required
        />

      </div>

      <div className="form-grid">

        <div className="form-group">

          <label>Priority</label>

          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
          >
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>

        </div>

        <div className="form-group">

          <label>Category</label>

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option>Academic</option>
            <option>Personal</option>
          </select>

        </div>

      </div>

      <div className="form-grid">

        <div className="form-group">

          <label>Due Date</label>

          <input
            type="date"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
          />

        </div>

        <div className="form-group">

          <label>Status</label>

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option>Raised</option>
            <option>Pending</option>
            <option>Closed</option>
          </select>

        </div>

      </div>

      <button
        type="submit"
        className="primary-btn"
      >
        {buttonText} →
      </button>

    </form>
  );
};

export default TaskForm;