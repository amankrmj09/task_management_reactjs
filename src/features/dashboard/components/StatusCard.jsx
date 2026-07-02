function StatusCard({ title, value }) {
  return (
    <div className="rounded-2xl glass-card p-6 shadow-sm">
      <p className="text-sm font-medium text-[var(--text-muted)]">
        {title}
      </p>

      <h2 className="mt-2 text-3xl font-bold text-[var(--text-main)]">
        {value}
      </h2>
    </div>
  );
}

export default StatusCard;