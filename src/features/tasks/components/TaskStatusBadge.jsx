function TaskStatusBadge({ status }) {
  const styles = {
    TODO: "bg-gray-100 text-gray-700",

    IN_PROGRESS:
      "bg-yellow-100 text-yellow-700",

    IN_REVIEW:
      "bg-blue-100 text-blue-700",

    DONE: "bg-green-100 text-green-700",
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ${
        styles[status]
      }`}
    >
      {status}
    </span>
  );
}

export default TaskStatusBadge;