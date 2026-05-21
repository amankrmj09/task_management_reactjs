import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function ActivityChart() {
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
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-xl font-semibold text-gray-800">Activity</h2>

      {activity.length === 0 ? (
        <p className="text-gray-500">No pending join requests</p>
      ) : (
        <div className="space-y-4">
          {activity.map((item) => {
            const innerContent = (
              <>
                <h3 className="font-medium text-gray-800 transition-colors group-hover:text-blue-600">{item.label}</h3>
                <div className="flex flex-col items-end">
                  <span className="text-lg font-bold text-blue-600">{item.value}</span>
                  <span className="text-xs text-gray-500">Pending</span>
                </div>
              </>
            );

            return item.projectId ? (
              <Link key={item.label} to={`/projects/${item.projectId}`} className="group flex items-center justify-between rounded-xl border border-gray-100 bg-white p-4 shadow-sm transition hover:shadow-md hover:border-gray-200">
                {innerContent}
              </Link>
            ) : (
              <div key={item.label} className="flex items-center justify-between rounded-xl border border-gray-100 bg-white p-4 shadow-sm transition hover:shadow-md hover:border-gray-200">
                {innerContent}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default ActivityChart;
