import TaskStatusBadge from "./TaskStatusBadge";
import TaskPriorityBadge from "./TaskPriorityBadge";

function TaskDetails({ task }) {
  if (!task) {
    return <p className="text-[var(--text-muted)]">Task not available</p>;
  }

  return (
    <div className="rounded-2xl glass-card p-6 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-[var(--text-main)]">{task.title}</h2>
          <p className="mt-2 text-[var(--text-muted)]">{task.description}</p>
        </div>

        <div className="flex items-center gap-2">
          <TaskStatusBadge status={task.status} />
          <TaskPriorityBadge priority={task.priority} />
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        <div>
          <p className="text-sm text-[var(--text-muted)]">Assignee</p>
          <p className="mt-1 font-semibold text-[var(--text-main)]">
            {task.assignee?.name || "Unassigned"}
          </p>
        </div>

        <div>
          <p className="text-sm text-[var(--text-muted)]">Due Date</p>
          <p className="mt-1 font-semibold text-[var(--text-main)]">
            {task.dueDate || "Not set"}
          </p>
        </div>

        <div>
          <p className="text-sm text-[var(--text-muted)]">Tags</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {task.tags?.length ? (
              task.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-[var(--bg-panel-hover)] px-3 py-1 text-xs font-medium text-[var(--text-main)]"
                >
                  {tag}
                </span>
              ))
            ) : (
              <span className="text-sm text-[var(--text-muted)]">No tags</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskDetails;
