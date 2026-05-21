import TaskStatusBadge from "./TaskStatusBadge";
import TaskPriorityBadge from "./TaskPriorityBadge";

function TaskDetails({ task }) {
  if (!task) {
    return <p className="text-gray-500">Task not available</p>;
  }

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">{task.title}</h2>
          <p className="mt-2 text-gray-500">{task.description}</p>
        </div>

        <div className="flex items-center gap-2">
          <TaskStatusBadge status={task.status} />
          <TaskPriorityBadge priority={task.priority} />
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        <div>
          <p className="text-sm text-gray-500">Assignee</p>
          <p className="mt-1 font-semibold text-gray-800">
            {task.assignee?.name || "Unassigned"}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Due Date</p>
          <p className="mt-1 font-semibold text-gray-800">
            {task.dueDate || "Not set"}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Tags</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {task.tags?.length ? (
              task.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700"
                >
                  {tag}
                </span>
              ))
            ) : (
              <span className="text-sm text-gray-500">No tags</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskDetails;
