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
    bg: "bg-slate-50",
    header: "bg-slate-200",
    text: "text-slate-700",
    badge: "bg-slate-100 text-slate-600",
    accent: "border-l-slate-400",
  },
  IN_PROGRESS: {
    bg: "bg-blue-50",
    header: "bg-blue-200",
    text: "text-blue-700",
    badge: "bg-blue-100 text-blue-600",
    accent: "border-l-blue-500",
  },
  IN_REVIEW: {
    bg: "bg-amber-50",
    header: "bg-amber-200",
    text: "text-amber-700",
    badge: "bg-amber-100 text-amber-600",
    accent: "border-l-amber-500",
  },
  DONE: {
    bg: "bg-green-50",
    header: "bg-green-200",
    text: "text-green-700",
    badge: "bg-green-100 text-green-600",
    accent: "border-l-green-500",
  },
};

const PRIORITY_COLORS = {
  LOW: "bg-gray-100 text-gray-600",
  MEDIUM: "bg-blue-100 text-blue-700",
  HIGH: "bg-orange-100 text-orange-700",
  CRITICAL: "bg-red-100 text-red-700",
};

function KanbanCard({ task, statusColor }) {
  return (
    <Link
      to={`/tasks/${task.id}`}
      className={`block rounded-xl border-l-4 bg-white p-3 shadow-sm transition hover:shadow-md ${statusColor.accent}`}
    >
      <h3 className="text-sm font-semibold text-gray-800 line-clamp-2">
        {task.title}
      </h3>

      {task.description && (
        <p className="mt-1 text-xs text-gray-500 line-clamp-2">
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
          <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-medium text-gray-600">
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

        <span className="text-xs text-gray-500 truncate">
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
                  <div className="flex items-center justify-center rounded-xl border-2 border-dashed border-gray-200 py-8">
                    <p className="text-xs text-gray-400">No tasks</p>
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