import { Link } from "react-router-dom";

const PRIORITY_COLORS = {
  LOW: "bg-gray-100 text-gray-600",
  MEDIUM: "bg-blue-100 text-blue-700",
  HIGH: "bg-orange-100 text-orange-700",
  CRITICAL: "bg-red-100 text-red-700",
};

const STATUS_COLORS = {
  TODO: "bg-slate-100 text-slate-700",
  IN_PROGRESS: "bg-yellow-100 text-yellow-700",
  IN_REVIEW: "bg-blue-100 text-blue-700",
  DONE: "bg-green-100 text-green-700",
};

function TaskCard({ task }) {
  return (
    <Link
      to={`/tasks/${task.id}`}
      className="block rounded-2xl bg-white p-6 shadow-sm transition hover:shadow-md"
    >
        <div className="flex items-start justify-between">
          <div className="min-w-0 flex-1">
            <h2 className="text-lg font-semibold text-gray-800">
              {task.title}
            </h2>

            {task.description && (
              <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                {task.description}
              </p>
            )}
          </div>

          <span
            className={`ml-3 shrink-0 rounded-full px-3 py-1 text-xs font-medium ${
              STATUS_COLORS[task.status] || STATUS_COLORS.TODO
            }`}
          >
            {task.status?.replace("_", " ")}
          </span>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-3">
          <span
            className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
              PRIORITY_COLORS[task.priority] || PRIORITY_COLORS.MEDIUM
            }`}
          >
            {task.priority}
          </span>

          {task.dueDate && (
            <span className="text-xs text-gray-500">
              Due:{" "}
              {new Date(task.dueDate).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          )}

          <span className="text-xs text-gray-500">
            {task.assignee?.name || "Unassigned"}
          </span>
        </div>
      </Link>
  );
}

export default TaskCard;