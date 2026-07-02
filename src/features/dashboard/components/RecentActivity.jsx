import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function RecentActivity() {
  const { stats, adminStats } = useSelector((state) => state.dashboard);

  const rawData =
    stats?.activity ||
    stats?.weeklyActivity ||
    stats?.activityChart ||
    adminStats?.activity ||
    adminStats?.weeklyActivity ||
    adminStats?.activityChart ||
    [];

  const activity = Array.isArray(rawData)
    ? rawData.map((item, index) => {
        if (typeof item === "number") {
          return {
            label: `Day ${index + 1}`,
            value: item,
            projectId: null
          };
        }

        return {
          label: item.label || item.day || item.name || `Item ${index + 1}`,
          value: item.value ?? item.count ?? item.total ?? 0,
          projectId: item.projectId || null
        };
      })
    : [];

  const maxValue = Math.max(...activity.map((item) => item.value), 1);

  return (
    <div className="rounded-2xl glass-card p-6 shadow-sm">
      <h2 className="mb-4 text-xl font-semibold text-[var(--text-main)]">Recent Activity</h2>

      {activity.length === 0 ? (
        <p className="text-[var(--text-muted)]">No pending join requests</p>
      ) : (
        <div className="space-y-4">
          {activity.map((item) => {
            const innerContent = (
              <>
                <div className="flex-1 min-w-0 pr-4">
                  <h3 className="text-base font-semibold text-[var(--text-main)] truncate transition-colors group-hover:text-blue-600 dark:group-hover:text-blue-400">{item.label}</h3>
                </div>
                <div className="mt-3 sm:mt-0 flex items-center shrink-0">
                  <div className="flex flex-col items-end">
                    <span className="text-lg font-bold text-blue-600 dark:text-blue-400 leading-none">{item.value}</span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] mt-1">Pending</span>
                  </div>
                </div>
              </>
            );

            return item.projectId ? (
              <Link key={item.label} to={`/projects/${item.projectId}`} className="group flex flex-col sm:flex-row sm:items-center justify-between rounded-xl border border-[var(--border-color)] bg-white/40 dark:bg-slate-800/40 backdrop-blur-sm shadow-sm hover:bg-white/60 dark:hover:bg-slate-800/60 p-4 transition duration-200 ease-in-out">
                {innerContent}
              </Link>
            ) : (
              <div key={item.label} className="group flex flex-col sm:flex-row sm:items-center justify-between rounded-xl border border-[var(--border-color)] bg-white/40 dark:bg-slate-800/40 backdrop-blur-sm shadow-sm hover:bg-white/60 dark:hover:bg-slate-800/60 p-4 transition duration-200 ease-in-out">
                {innerContent}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default RecentActivity;
