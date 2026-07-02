function Button({
  children,
  type = "button",
  variant = "primary",
  size = "md",
  onClick,
  disabled = false,
  className = "",
}) {
  const variants = {
    primary:
      "bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)]",

    secondary:
      "bg-[var(--bg-panel-hover)] text-[var(--text-main)] hover:brightness-95",

    danger:
      "bg-[var(--color-danger)] text-white hover:brightness-90",

    success:
      "bg-green-600 text-white hover:bg-green-700",

    outline:
      "border border-[var(--border-color)] bg-transparent text-[var(--text-main)] hover:bg-[var(--bg-panel-hover)]",
  };

  const sizes = {
    md: "px-5 py-3 text-base",
    sm: "px-3 py-1.5 text-sm h-[32px] flex items-center justify-center",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`rounded-xl font-medium transition disabled:cursor-not-allowed disabled:opacity-50 ${
        variants[variant]
      } ${sizes[size]} ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;