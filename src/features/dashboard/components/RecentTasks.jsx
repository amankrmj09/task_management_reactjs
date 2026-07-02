import { useSelector } from "react-redux";
import TaskCard from "../../tasks/components/TaskCard";

function RecentTasks() {
  const { stats, adminStats } = useSelector((state) => state.dashboard);

  const recentTasks = stats?.recentTasks || adminStats?.recentTasks || [];

  return (
    <div className="rounded-2xl glass-card p-6 shadow-sm">
      <h2 className="mb-4 text-xl font-semibold text-[var(--text-main)]">Recent Tasks</h2>

      <div className="space-y-4">
        {recentTasks.length > 0 ? (
          recentTasks.slice(0, 2).map((task) => (
            <TaskCard key={task.id} task={task} />
          ))
        ) : (
          <p className="text-[var(--text-muted)]">No recent tasks</p>
        )}
      </div>
    </div>
  );
}

export default RecentTasks;
