function ProjectStats({
  taskCounts,
}) {
  return (
    <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
      <div className="rounded-2xl bg-white p-5 shadow-sm">
        <p className="text-sm text-gray-500">
          Total
        </p>

        <h2 className="mt-2 text-3xl font-bold text-gray-800">
          {taskCounts?.total || 0}
        </h2>
      </div>

      <div className="rounded-2xl bg-white p-5 shadow-sm">
        <p className="text-sm text-gray-500">
          Done
        </p>

        <h2 className="mt-2 text-3xl font-bold text-green-600">
          {taskCounts?.done || 0}
        </h2>
      </div>

      <div className="rounded-2xl bg-white p-5 shadow-sm">
        <p className="text-sm text-gray-500">
          In Progress
        </p>

        <h2 className="mt-2 text-3xl font-bold text-yellow-600">
          {taskCounts?.inProgress || 0}
        </h2>
      </div>

      <div className="rounded-2xl bg-white p-5 shadow-sm">
        <p className="text-sm text-gray-500">
          Overdue
        </p>

        <h2 className="mt-2 text-3xl font-bold text-red-600">
          {taskCounts?.overdue || 0}
        </h2>
      </div>
    </div>
  );
}

export default ProjectStats;