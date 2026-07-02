import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import ActionButton from "../../../components/shared/ActionButton";
import { Trash2 } from "lucide-react";

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

function TaskList({ tasks, onDeleteTask }) {
  const navigate = useNavigate();

  const handleDeleteClick = useCallback((e, taskId) => {
    e.stopPropagation();
    if (onDeleteTask) onDeleteTask(taskId);
  }, [onDeleteTask]);

  if (!tasks?.length) {
    return (
      <div className="rounded-2xl glass-card p-10 text-center shadow-sm">
        <h2 className="text-xl font-semibold text-[var(--text-main)]">
          No Tasks Found
        </h2>
        <p className="mt-2 text-[var(--text-muted)]">
          Create your first task
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl glass-card shadow-sm border border-[var(--border-color)]">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-[var(--text-main)]">
          <thead className="bg-[var(--bg-panel-hover)] text-xs uppercase text-[var(--text-muted)] border-b border-[var(--border-color)]">
            <tr>
              <th className="px-6 py-4 font-medium w-16">S.No.</th>
              <th className="px-6 py-4 font-medium">Title</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium">Priority</th>
              <th className="px-6 py-4 font-medium">Assignee</th>
              <th className="px-6 py-4 font-medium">Due Date</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border-color)]">
            {tasks.map((task, index) => (
              <tr 
                key={task.id} 
                className="transition-colors hover:bg-[var(--bg-panel-hover)]/50 cursor-pointer"
                onClick={() => navigate(`/tasks/${task.id}`)}
              >
                <td className="px-6 py-4 text-[var(--text-muted)]">{index + 1}</td>
                <td className="px-6 py-4 font-medium">
                  {task.title}
                  {task.description && (
                    <div className="text-xs text-[var(--text-muted)] truncate max-w-[200px] mt-1">{task.description}</div>
                  )}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium whitespace-nowrap ${
                      STATUS_COLORS[task.status] || STATUS_COLORS.TODO
                    }`}
                  >
                    {task.status?.replace("_", " ")}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                      PRIORITY_COLORS[task.priority] || PRIORITY_COLORS.MEDIUM
                    }`}
                  >
                    {task.priority}
                  </span>
                </td>
                <td className="px-6 py-4 text-[var(--text-muted)] truncate max-w-[120px]">
                  {task.assignee?.name || "Unassigned"}
                </td>
                <td className="px-6 py-4 text-[var(--text-muted)]">
                  {task.dueDate ? new Date(task.dueDate).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  }) : "-"}
                </td>
                <td className="px-6 py-4 text-right">
                    <ActionButton
                      text="Delete"
                      icon={Trash2}
                      bgClass="bg-[var(--color-danger)]"
                      hoverBgClass="hover:bg-red-600"
                      className="px-4 h-[36px] text-sm shadow-sm inline-flex w-max float-right"
                      onClick={(e) => handleDeleteClick(e, task.id)}
                    />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TaskList;