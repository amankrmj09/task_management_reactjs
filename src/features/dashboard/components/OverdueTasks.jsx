import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function OverdueTasks() {
  const { stats, adminStats } = useSelector((state) => state.dashboard);

  const overdueTasks =
    stats?.overdueTaskList ||
    adminStats?.overdueTaskList ||
    stats?.overdueTasksList ||
    adminStats?.overdueTasksList ||
    [];

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-xl font-semibold text-gray-800">
        Overdue Tasks
      </h2>

      <div className="space-y-4">
        {overdueTasks.length > 0 ? (
          overdueTasks.slice(0, 2).map((task) => (
            <Link key={task.id} to={`/tasks/${task.id}`} className="group flex items-center justify-between rounded-xl border border-red-100 bg-white p-4 shadow-sm transition hover:shadow-md hover:border-red-200">
              <div>
                <h3 className="font-medium text-gray-800 transition-colors group-hover:text-red-600">{task.title}</h3>
                <p className="mt-0.5 text-xs text-red-500">Due: {task.dueDate}</p>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-500 opacity-0 transition group-hover:opacity-100" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </Link>
          ))
        ) : (
          <p className="text-gray-500">No overdue tasks</p>
        )}
      </div>
    </div>
  );
}

export default OverdueTasks;
