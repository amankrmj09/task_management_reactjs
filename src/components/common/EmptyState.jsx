function EmptyState({
  title,
  description,
}) {
  return (
    <div className="rounded-2xl glass-card p-10 text-center shadow-sm">
      <h2 className="text-2xl font-semibold text-[var(--text-main)]">
        {title}
      </h2>

      <p className="mt-3 text-[var(--text-muted)]">
        {description}
      </p>
    </div>
  );
}

export default EmptyState;