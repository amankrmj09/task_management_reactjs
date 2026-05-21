import TaskCard from "./TaskCard";

function TaskList({ tasks, onDeleteTask }) {
  if (!tasks?.length) {
    return (
      <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
        <h2 className="text-xl font-semibold text-gray-700">
          No Tasks Found
        </h2>

        <p className="mt-2 text-gray-500">
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