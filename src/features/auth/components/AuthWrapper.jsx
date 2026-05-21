function AuthWrapper({ title, subtitle, children, footer }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        {title && (
          <h1 className="mb-2 text-center text-3xl font-bold text-gray-800">
            {title}
          </h1>
        )}

        {subtitle && (
          <p className="mb-6 text-center text-gray-500">{subtitle}</p>
        )}

        {children}

        {footer && <div className="mt-6">{footer}</div>}
      </div>
    </div>
  );
}

export default AuthWrapper;
