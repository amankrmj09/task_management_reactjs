function Avatar({ src, name, size = "md", className = "" }) {
  const sizeClasses = {
    xs: "h-6 w-6 text-xs",
    sm: "h-8 w-8 text-sm",
    md: "h-10 w-10 text-sm",
    lg: "h-12 w-12 text-base",
    xl: "h-16 w-16 text-lg",
  };

  const initials = name
    ? name
        .trim()
        .split(/\s+/)
        .map((part) => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "U";

  if (src) {
    return (
      <img
        src={src}
        alt={name || "Avatar"}
        className={`rounded-full object-cover ${
          sizeClasses[size] || sizeClasses.md
        } ${className}`}
      />
    );
  }

  return (
    <div
      className={`flex items-center justify-center rounded-full bg-blue-600 font-semibold text-white ${
        sizeClasses[size] || sizeClasses.md
      } ${className}`}
    >
      {initials}
    </div>
  );
}

export default Avatar;
