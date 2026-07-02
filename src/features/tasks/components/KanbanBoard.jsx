import { Link } from "react-router-dom";

import { TASK_STATUS } from "../../../utils/constants";

const STATUS_LABELS = {
  TODO: "To Do",
  IN_PROGRESS: "In Progress",
  IN_REVIEW: "In Review",
  DONE: "Done",
};

const STATUS_COLORS = {
  TODO: {
    bg: "glass-panel bg-slate-50/50 dark:bg-slate-900/30",
    header: "border-b border-slate-200 dark:border-slate-800",
    text: "text-slate-700 dark:text-slate-300",
    badge: "bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300",
    accent: "border-l-slate-400 dark:border-l-slate-500",
  },
  IN_PROGRESS: {
    bg: "glass-panel bg-blue-50/50 dark:bg-blue-900/20",
    header: "border-b border-blue-200 dark:border-blue-900/50",
    text: "text-blue-700 dark:text-blue-400",
    badge: "bg-blue-200 dark:bg-blue-900/50 text-blue-700 dark:text-blue-400",
    accent: "border-l-blue-500",
  },
  IN_REVIEW: {
    bg: "glass-panel bg-amber-50/50 dark:bg-amber-900/20",
    header: "border-b border-amber-200 dark:border-amber-900/50",
    text: "text-amber-700 dark:text-amber-400",
    badge: "bg-amber-200 dark:bg-amber-900/50 text-amber-700 dark:text-amber-400",
    accent: "border-l-amber-500",
  },
  DONE: {
    bg: "glass-panel bg-green-50/50 dark:bg-green-900/20",
    header: "border-b border-green-200 dark:border-green-900/50",
    text: "text-green-700 dark:text-green-400",
    badge: "bg-green-200 dark:bg-green-900/50 text-green-700 dark:text-green-400",
    accent: "border-l-green-500",
  },
};

const PRIORITY_COLORS = {
  LOW: "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300",
  MEDIUM: "bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-400",
  HIGH: "bg-orange-100 dark:bg-orange-900/50 text-orange-700 dark:text-orange-400",
  CRITICAL: "bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-400",
};

function KanbanCard({ task, statusColor }) {
  return (
    <Link
      to={`/tasks/${task.id}`}
      className={`block rounded-xl border-l-4 glass-card p-3 shadow-sm transition hover:shadow-md ${statusColor.accent}`}
    >
      <h3 className="text-sm font-semibold text-[var(--text-main)] line-clamp-2">
        {task.title}
      </h3>

      {task.description && (
        <p className="mt-1 text-xs text-[var(--text-muted)] line-clamp-2">
          {task.description}
        </p>
      )}

      <div className="mt-2 flex flex-wrap items-center gap-1.5">
        <span
          className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
            PRIORITY_COLORS[task.priority] || PRIORITY_COLORS.MEDIUM
          }`}
        >
          {task.priority}
        </span>

        {task.dueDate && (
          <span className="rounded-full bg-[var(--bg-panel-hover)] px-2 py-0.5 text-[10px] font-medium text-[var(--text-muted)]">
            {new Date(task.dueDate).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            })}
          </span>
        )}
      </div>

      <div className="mt-2 flex items-center gap-1.5">
        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold text-white">
          {task.assignee?.name?.charAt(0)?.toUpperCase() || "?"}
        </div>

        <span className="text-xs text-[var(--text-muted)] truncate">
          {task.assignee?.name || "Unassigned"}
        </span>
      </div>
    </Link>
  );
}

function KanbanBoard({ tasks }) {
  const columns = {
    TODO: [],
    IN_PROGRESS: [],
    IN_REVIEW: [],
    DONE: [],
  };

  tasks.forEach((task) => {
    columns[task.status]?.push(task);
  });

  return (
    <div className="flex gap-4 overflow-x-auto pb-4">
      {Object.entries(columns).map(
        ([status, columnTasks]) => {
          const colors = STATUS_COLORS[status] || STATUS_COLORS.TODO;

          return (
            <div
              key={status}
              className={`flex w-72 min-w-[18rem] flex-shrink-0 flex-col rounded-2xl ${colors.bg}`}
            >
              <div
                className={`flex items-center justify-between rounded-t-2xl px-4 py-3 ${colors.header}`}
              >
                <h2
                  className={`text-sm font-bold ${colors.text}`}
                >
                  {STATUS_LABELS[status] || status}
                </h2>

                <span
                  className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${colors.badge}`}
                >
                  {columnTasks.length}
                </span>
              </div>

              <div className="flex flex-1 flex-col gap-3 p-3">
                {columnTasks.length === 0 ? (
                  <div className="flex items-center justify-center rounded-xl border-2 border-dashed border-[var(--border-color)] py-8">
                    <p className="text-xs text-[var(--text-muted)]">No tasks</p>
                  </div>
                ) : (
                  columnTasks.map((task) => (
                    <KanbanCard
                      key={task.id}
                      task={task}
                      statusColor={colors}
                    />
                  ))
                )}
              </div>
            </div>
          );
        }
      )}
    </div>
  );
}

export default KanbanBoard;