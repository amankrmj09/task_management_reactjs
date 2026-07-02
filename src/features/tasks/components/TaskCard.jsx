import { Link } from "react-router-dom";

const PRIORITY_COLORS = {
  LOW: "bg-[var(--bg-panel-hover)] text-[var(--text-muted)]",
  MEDIUM: "bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
  HIGH: "bg-orange-50 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400",
  CRITICAL: "bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-400",
};

const STATUS_COLORS = {
  TODO: "bg-slate-50 text-slate-600 dark:bg-slate-800 dark:text-slate-400",
  IN_PROGRESS: "bg-yellow-50 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400",
  IN_REVIEW: "bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400",
  DONE: "bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-400",
};

function TaskCard({ task }) {
  const assigneeName = task.assignee?.name || task.assigneeName;

  return (
    <Link
      to={`/tasks/${task.id}`}
      className="group flex flex-col sm:flex-row sm:items-center justify-between rounded-xl border border-[var(--border-color)] bg-white/40 dark:bg-slate-800/40 backdrop-blur-sm shadow-sm hover:bg-white/60 dark:hover:bg-slate-800/60 p-4 transition duration-200 ease-in-out"
    >
      <div className="flex-1 min-w-0 pr-4">
        <h2 className="text-base font-semibold text-[var(--text-main)] truncate transition-colors group-hover:text-blue-600 dark:group-hover:text-blue-400">
          {task.title}
        </h2>

        {task.description && (
          <p className="mt-1 text-sm text-[var(--text-muted)] truncate">
            {task.description}
          </p>
        )}

        <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-[var(--text-muted)]">
          {task.projectName && <span>{task.projectName}</span>}
          {task.projectName && (task.dueDate || assigneeName) && <span>•</span>}
          {task.dueDate && (
            <span>
              Due:{" "}
              {new Date(task.dueDate).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}
            </span>
          )}
          {task.dueDate && assigneeName && <span>•</span>}
          {assigneeName && <span>{assigneeName}</span>}
        </div>
      </div>

      <div className="mt-3 sm:mt-0 flex items-center gap-2 shrink-0">
        <span
          className={`rounded-md px-2 py-1 text-[10px] font-bold uppercase tracking-wider ${
            PRIORITY_COLORS[task.priority] || PRIORITY_COLORS.MEDIUM
          }`}
        >
          {task.priority}
        </span>
        <span
          className={`rounded-md px-2 py-1 text-[10px] font-bold uppercase tracking-wider ${
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