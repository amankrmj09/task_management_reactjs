function Badge({ children, variant = "default", className = "" }) {
  const variants = {
    default: "bg-[var(--bg-panel-hover)] text-[var(--text-main)]",
    primary: "bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-400",
    success: "bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-400",
    warning: "bg-yellow-100 dark:bg-yellow-900/50 text-yellow-700 dark:text-yellow-400",
    danger: "bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-400",
    purple: "bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-400",
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ${
        variants[variant] || variants.default
      } ${className}`}
    >
      {children}
    </span>
  );
}

export default Badge;
