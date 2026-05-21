function Header({ title, subtitle, actions, children }) {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          {title && (
            <h1 className="text-3xl font-bold text-gray-800">{title}</h1>
          )}

          {subtitle && <p className="mt-1 text-gray-500">{subtitle}</p>}
        </div>

        {actions && <div className="flex items-center gap-3">{actions}</div>}
      </div>

      {children}
    </div>
  );
}

export default Header;
