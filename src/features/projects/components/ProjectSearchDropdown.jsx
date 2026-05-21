import { useState, useEffect, useRef } from "react";
import { searchProjectsApi } from "../api/projectApi";
import useDebounce from "../../../hooks/useDebounce";

function ProjectSearchDropdown({ value, onChange }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const debouncedQuery = useDebounce(query, 300);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const fetchResults = async () => {
      if (!debouncedQuery.trim()) {
        setResults([]);
        return;
      }

      setIsSearching(true);
      try {
        const data = await searchProjectsApi(debouncedQuery);
        const projectsList = Array.isArray(data) ? data : data?.content || [];
        setResults(projectsList);
        setIsOpen(true);
      } catch (error) {
        console.error("Failed to search projects", error);
      } finally {
        setIsSearching(false);
      }
    };

    fetchResults();
  }, [debouncedQuery]);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (project) => {
    onChange(project.id);
    setQuery(project.name);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <label className="mb-2 block text-sm font-medium text-gray-700">
        Search Project
      </label>
      <input
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          onChange(""); // Clear selection if typing again
          if (e.target.value.trim().length > 0) {
            setIsOpen(true);
          }
        }}
        onFocus={() => {
          if (results.length > 0) setIsOpen(true);
        }}
        placeholder="Type to search for projects..."
        className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
      />

      {isSearching && (
        <div className="absolute right-3 top-10 flex h-6 w-6 items-center justify-center">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-blue-500 border-t-transparent"></div>
        </div>
      )}

      {isOpen && query.trim() && !isSearching && (
        <div className="absolute z-10 mt-1 max-h-60 w-full overflow-y-auto rounded-xl border border-gray-200 bg-white py-1 shadow-lg">
          {results.length > 0 ? (
            results.map((project) => (
              <button
                key={project.id}
                type="button"
                onClick={() => handleSelect(project)}
                className={`w-full px-4 py-2 text-left hover:bg-gray-100 ${
                  value === project.id ? "bg-blue-50 font-medium text-blue-600" : "text-gray-700"
                }`}
              >
                {project.name}
              </button>
            ))
          ) : (
            <div className="px-4 py-3 text-sm text-gray-500">
              No projects found matching "{query}"
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ProjectSearchDropdown;
