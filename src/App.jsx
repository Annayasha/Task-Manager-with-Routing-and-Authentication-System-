import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks";
import AddTask from "./pages/AddTask";
import TaskDetails from "./pages/TaskDetails";
import EditTask from "./pages/EditTask";
import CompletedTasks from "./pages/CompletedTasks";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* Public Route */}
        <Route
          path="/login"
          element={<Login />}
        />


        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>

          <Route
            path="/"
            element={<Layout />}
          >

            <Route
              index
              element={
                <Navigate
                  to="/dashboard"
                  replace
                />
              }
            />

            <Route
              path="dashboard"
              element={<Dashboard />}
            />

            <Route
              path="tasks"
              element={<Tasks />}
            />

            <Route
              path="tasks/:id"
              element={<TaskDetails />}
            />

            <Route
              path="tasks/:id/edit"
              element={<EditTask />}
            />

            <Route
              path="add-task"
              element={<AddTask />}
            />

            <Route
              path="completed"
              element={<CompletedTasks />}
            />

          </Route>

        </Route>


        {/* Unknown URL */}
        <Route
          path="*"
          element={
            <Navigate
              to="/dashboard"
              replace
            />
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;