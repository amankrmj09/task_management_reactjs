function TaskHeader({
  title = "Tasks",
  subtitle = "Manage project tasks",
  actions,
}) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">{title}</h1>
        {subtitle && <p className="mt-1 text-gray-500">{subtitle}</p>}
      </div>

      {actions && <div className="flex items-center gap-3">{actions}</div>}
    </div>
  );
}

export default TaskHeader;
