function PageContainer({
  title,
  subtitle,
  children,
  action,
}) {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[var(--text-main)]">
            {title}
          </h1>

          {subtitle && (
            <p className="mt-1 text-[var(--text-muted)]">
              {subtitle}
            </p>
          )}
        </div>

        {action}
      </div>

      {children}
    </div>
  );
}

export default PageContainer;