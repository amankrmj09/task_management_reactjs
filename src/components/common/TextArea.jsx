function TextArea({
  label,
  value,
  onChange,
  placeholder,
  error,
  rows = 5,
  ...props
}) {
  return (
    <div className="space-y-2">
      {label && (
        <label className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      <textarea
        rows={rows}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full rounded-xl border px-4 py-3 outline-none transition focus:border-blue-500 ${
          error
            ? "border-red-500"
            : "border-gray-300"
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

export default TextArea;