function Button({
  children,
  type = "button",
  variant = "primary",
  onClick,
  disabled = false,
  className = "",
}) {
  const variants = {
    primary:
      "bg-blue-600 text-white hover:bg-blue-700",

    secondary:
      "bg-gray-700 text-white hover:bg-gray-800",

    danger:
      "bg-red-600 text-white hover:bg-red-700",

    success:
      "bg-green-600 text-white hover:bg-green-700",

    outline:
      "border border-gray-300 bg-white text-gray-700 hover:bg-gray-100",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`rounded-xl px-5 py-3 font-medium transition disabled:cursor-not-allowed disabled:opacity-50 ${
        variants[variant]
      } ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;