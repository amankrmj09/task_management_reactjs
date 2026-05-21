function Select({
  label,
  value,
  onChange,
  options = [],
  placeholder,
  error,
  className = "",
  children,
  ...props
}) {
  return (
    <div className="space-y-2">
      {label && (
        <label className="text-sm font-medium text-gray-700">{label}</label>
      )}

      <select
        value={value}
        onChange={onChange}
        className={`w-full rounded-xl border px-4 py-3 outline-none transition focus:border-blue-500 ${
          error ? "border-red-500" : "border-gray-300"
        } ${className}`}
        {...props}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {children ||
          options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
      </select>

      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}

export default Select;
