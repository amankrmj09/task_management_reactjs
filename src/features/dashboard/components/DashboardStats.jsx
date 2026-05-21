import { useSelector } from "react-redux";

import StatusCard from "./StatusCard";

function DashboardStats() {
  const { stats, adminStats } = useSelector(
    (state) => state.dashboard
  );

  const { user } = useSelector(
    (state) => state.auth
  );

  const data =
    user?.role === "ADMIN"
      ? adminStats
      : stats;

  const cards = [
    {
      title: "Projects",
      value: data?.totalProjects || 0,
    },
    {
      title: "Tasks",
      value: data?.totalTasks || 0,
    },
    {
      title: "Completed",
      value: data?.completedTasks || 0,
    },
    {
      title: "Overdue",
      value: data?.overdueTasks || 0,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <StatusCard
          key={card.title}
          title={card.title}
          value={card.value}
        />
      ))}
    </div>
  );
}

export default DashboardStats;