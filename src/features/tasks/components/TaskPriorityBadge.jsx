function TaskPriorityBadge({
  priority,
}) {
  const styles = {
    LOW: "bg-[var(--bg-panel-hover)] text-[var(--text-main)]",
    MEDIUM: "bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-400",
    HIGH: "bg-orange-100 dark:bg-orange-900/50 text-orange-700 dark:text-orange-400",
    CRITICAL: "bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-400",
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ${
        styles[priority]
      }`}
    >
      {priority}
    </span>
  );
}

export default TaskPriorityBadge;