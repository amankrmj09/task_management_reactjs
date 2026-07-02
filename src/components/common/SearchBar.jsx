function SearchBar({
  value,
  onChange,
  placeholder = "Search...",
}) {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full rounded-xl border border-[var(--border-color)] px-4 py-3 outline-none transition focus:border-[var(--color-primary)]"
    />
  );
}

export default SearchBar;