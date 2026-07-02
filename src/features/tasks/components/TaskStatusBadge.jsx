function TaskStatusBadge({ status }) {
  const styles = {
    TODO: "bg-[var(--bg-panel-hover)] text-[var(--text-main)]",
    IN_PROGRESS: "bg-yellow-100 dark:bg-yellow-900/50 text-yellow-700 dark:text-yellow-400",
    IN_REVIEW: "bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-400",
    DONE: "bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-400",
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