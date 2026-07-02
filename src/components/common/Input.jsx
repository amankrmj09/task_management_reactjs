function Input({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  ...props
}) {
  return (
    <div className="space-y-2">
      {label && (
        <label className="text-sm font-medium text-[var(--text-main)]">
          {label}
        </label>
      )}

      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full rounded-xl border bg-[var(--bg-panel)] text-[var(--text-main)] px-4 py-3 outline-none transition focus:border-[var(--color-primary)] ${
          error
            ? "border-red-500"
            : "border-[var(--border-color)]"
        }`}
        {...props}
      />

      {error && (
        <p className="text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}

export default Input;