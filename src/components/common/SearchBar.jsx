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
      className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500"
    />
  );
}

export default SearchBar;