import TaskCard from "./TaskCard";

function TaskList({ tasks, onDeleteTask }) {
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
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onDelete={onDeleteTask}
        />
      ))}
    </div>
  );
}

export default TaskList;