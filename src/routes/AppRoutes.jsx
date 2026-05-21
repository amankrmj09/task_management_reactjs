import { Routes, Route, Navigate } from "react-router-dom";

import ProtectedRoute from "../components/layout/ProtectedRoute";
import DashboardLayout from "../components/layout/DashboardLayout";

import LoginPage from "../features/auth/pages/LoginPage";
import SignupPage from "../features/auth/pages/SignupPage";
import ForgotPasswordPage from "../features/auth/pages/ForgotPasswordPage";

import DashboardPage from "../features/dashboard/pages/DashboardPage";

import ProjectsPage from "../features/projects/pages/ProjectsPage";
import ProjectDetailsPage from "../features/projects/pages/ProjectDetailsPage";

import TasksPage from "../features/tasks/pages/TasksPage";
import TaskDetailsPage from "../features/tasks/pages/TaskDetailsPage";

import TeamPage from "../features/team/pages/TeamPage";

import SettingsPage from "../features/settings/pages/SettingsPage";

import { ROUTES } from "./routeConstants";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={ROUTES.DASHBOARD} />} />

      <Route path={ROUTES.LOGIN} element={<LoginPage />} />

      <Route path={ROUTES.SIGNUP} element={<SignupPage />} />

      <Route path={ROUTES.FORGOT_PASSWORD} element={<ForgotPasswordPage />} />

      <Route
        path={ROUTES.DASHBOARD}
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <DashboardPage />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path={ROUTES.PROJECTS}
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <ProjectsPage />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path={ROUTES.PROJECT_DETAILS}
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <ProjectDetailsPage />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path={ROUTES.TASKS}
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <TasksPage />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path={ROUTES.TASK_DETAILS}
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <TaskDetailsPage />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path={ROUTES.TEAM}
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <TeamPage />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path={ROUTES.SETTINGS}
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <SettingsPage />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default AppRoutes;
