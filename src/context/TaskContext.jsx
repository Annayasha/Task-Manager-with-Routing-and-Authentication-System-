import { createContext, useContext, useState } from "react";
import initialTasks from "../data/initialTasks";

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState(initialTasks);

  // Add Task
  const addTask = (task) => {
    const newTask = {
      ...task,
      id: Date.now(),
      raisedDate: new Date().toISOString(),
    };

    setTasks((prevTasks) => [newTask, ...prevTasks]);
  };

  // Delete Task
  const deleteTask = (id) => {
    setTasks((prevTasks) =>
      prevTasks.filter((task) => task.id !== Number(id))
    );
  };

  // Update Task
  const updateTask = (id, updatedTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === Number(id)
          ? { ...task, ...updatedTask }
          : task
      )
    );
  };

  // Change Status
  const changeStatus = (id, status) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === Number(id)
          ? { ...task, status }
          : task
      )
    );
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        deleteTask,
        updateTask,
        changeStatus,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => useContext(TaskContext);