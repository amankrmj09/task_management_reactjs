import { Link } from "react-router-dom";

const PRIORITY_COLORS = {
  LOW: "bg-[var(--bg-panel-hover)] text-[var(--text-muted)]",
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
      className="flex flex-col sm:flex-row items-start sm:items-center justify-between rounded-xl glass-card p-4 sm:p-5 shadow-sm transition hover:shadow-md hover:border-blue-500/30 gap-4"
    >
      <div className="flex-1 min-w-0">
        <h2 className="text-lg font-semibold text-[var(--text-main)] truncate">
          {task.title}
        </h2>

        {task.description && (
          <p className="mt-1 text-sm text-[var(--text-muted)] truncate">
            {task.description}
          </p>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-3 shrink-0">
        <span
          className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
            PRIORITY_COLORS[task.priority] || PRIORITY_COLORS.MEDIUM
          }`}
        >
          {task.priority}
        </span>

        {task.dueDate && (
          <span className="text-xs text-[var(--text-muted)]">
            Due:{" "}
            {new Date(task.dueDate).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </span>
        )}

        <span className="text-xs text-[var(--text-muted)] w-24 truncate text-right">
          {task.assignee?.name || "Unassigned"}
        </span>

        <span
          className={`ml-2 shrink-0 rounded-full px-3 py-1 text-xs font-medium ${
            STATUS_COLORS[task.status] || STATUS_COLORS.TODO
          }`}
        >
          {task.status?.replace("_", " ")}
        </span>
      </div>
    </Link>
  );
}

export default TaskCard;