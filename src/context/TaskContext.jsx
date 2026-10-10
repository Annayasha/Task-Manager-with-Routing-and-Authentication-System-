
import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import initialTasks from "../data/initialTasks";

const TaskContext = createContext();

const STORAGE_KEY = "taskflow_tasks";

const loadTasks = () => {
  try {
    const savedTasks = localStorage.getItem(STORAGE_KEY);

    if (savedTasks !== null) {
      const parsedTasks = JSON.parse(savedTasks);

      if (Array.isArray(parsedTasks)) {
        return parsedTasks;
      }
    }
  } catch (error) {
    console.error("Could not load saved tasks:", error);
  }

  return initialTasks;
};

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState(loadTasks);

  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(tasks)
      );
    } catch (error) {
      console.error("Could not save tasks:", error);
    }
  }, [tasks]);

  const addTask = (task) => {
    const newTask = {
      ...task,
      id: Date.now(),
      raisedDate: new Date().toISOString(),
    };

    setTasks((previousTasks) => [
      newTask,
      ...previousTasks,
    ]);

    return newTask;
  };

  const deleteTask = (id) => {
    setTasks((previousTasks) =>
      previousTasks.filter(
        (task) => task.id !== Number(id)
      )
    );
  };

  const updateTask = (id, updatedTask) => {
    setTasks((previousTasks) =>
      previousTasks.map((task) =>
        task.id === Number(id)
          ? {
              ...task,
              ...updatedTask,
              id: task.id,
            }
          : task
      )
    );
  };

  const changeStatus = (id, status) => {
    setTasks((previousTasks) =>
      previousTasks.map((task) =>
        task.id === Number(id)
          ? { ...task, status }
          : task
      )
    );
  };

  const clearCompletedTasks = () => {
    setTasks((previousTasks) =>
      previousTasks.filter(
        (task) => task.status !== "Closed"
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
        clearCompletedTasks,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  return useContext(TaskContext);
};
