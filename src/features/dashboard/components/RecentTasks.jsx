import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function RecentTasks() {
  const { stats, adminStats } = useSelector((state) => state.dashboard);

  const recentTasks = stats?.recentTasks || adminStats?.recentTasks || [];

  const getStatusColor = (status) => {
    switch (status) {
      case "TODO": return "bg-gray-100 text-gray-700";
      case "IN_PROGRESS": return "bg-blue-100 text-blue-700";
      case "IN_REVIEW": return "bg-purple-100 text-purple-700";
      case "DONE": return "bg-green-100 text-green-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "LOW": return "bg-gray-100 text-gray-700";
      case "MEDIUM": return "bg-yellow-100 text-yellow-700";
      case "HIGH": return "bg-orange-100 text-orange-700";
      case "URGENT": return "bg-red-100 text-red-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-xl font-semibold text-gray-800">Recent Tasks</h2>

      <div className="space-y-4">
        {recentTasks.length > 0 ? (
          recentTasks.slice(0, 2).map((task) => (
            <Link key={task.id} to={`/tasks/${task.id}`} className="group flex items-center justify-between rounded-xl border border-gray-100 bg-white p-4 shadow-sm transition hover:shadow-md hover:border-gray-200">
              <div>
                <h3 className="font-medium text-gray-800 transition-colors group-hover:text-blue-600">{task.title}</h3>
                <div className="mt-2 flex gap-2">
                  <span className={`inline-block rounded-full px-2.5 py-0.5 text-[10px] font-bold tracking-wide uppercase ${getStatusColor(task.status)}`}>
                    {task.status.replace("_", " ")}
                  </span>
                  {task.priority && (
                    <span className={`inline-block rounded-full px-2.5 py-0.5 text-[10px] font-bold tracking-wide uppercase ${getPriorityColor(task.priority)}`}>
                      {task.priority}
                    </span>
                  )}
                </div>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-500 opacity-0 transition group-hover:opacity-100" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </Link>
          ))
        ) : (
          <p className="text-gray-500">No recent tasks</p>
        )}
      </div>
    </div>
  );
}

export default RecentTasks;
