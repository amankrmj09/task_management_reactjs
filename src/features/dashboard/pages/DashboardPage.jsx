import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchAdminDashboard, fetchMyDashboard } from "../redux/dashboardThunk";

import DashboardStats from "../components/DashboardStats";
import TaskSummary from "../components/TaskSummary";
import RecentTasks from "../components/RecentTasks";
import OverdueTasks from "../components/OverdueTasks";
import ActivityChart from "../components/ActivityChart";
import RecentProjects from "../components/RecentProjects";

function DashboardPage() {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user?.role === "ADMIN") {
      dispatch(fetchAdminDashboard());
    } else {
      dispatch(fetchMyDashboard());
    }
  }, [dispatch, user]);

  return (
    <div className="space-y-6">
      <DashboardStats />

      <TaskSummary />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <RecentTasks />

        <OverdueTasks />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <ActivityChart />

        <RecentProjects />
      </div>
    </div>
  );
}

export default DashboardPage;
