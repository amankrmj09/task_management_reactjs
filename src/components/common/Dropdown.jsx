import { useEffect, useRef, useState } from "react";

function Dropdown({
  label = "Options",
  items = [],
  onSelect,
  align = "left",
  className = "",
  fullWidth = false,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (item) => {
    if (item.disabled) return;

    item.onClick?.(item.value);
    onSelect?.(item.value);
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className={`relative ${fullWidth ? 'block w-full' : 'inline-block'} ${className}`}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={`rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50 flex items-center justify-between ${fullWidth ? 'w-full' : ''}`}
      >
        <span>{label}</span>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>

      {isOpen && (
        <div
          className={`absolute z-20 mt-2 min-w-[12rem] rounded-xl border border-gray-200 bg-white p-2 shadow-lg ${
            align === "right" ? "right-0" : "left-0"
          }`}
        >
          {items.length > 0 ? (
            items.map((item) => (
              <button
                key={item.value ?? item.label}
                type="button"
                onClick={() => handleSelect(item)}
                disabled={item.disabled}
                className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition ${
                  item.disabled
                    ? "cursor-not-allowed text-gray-400"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <span>{item.label}</span>
              </button>
            ))
          ) : (
            <p className="px-3 py-2 text-sm text-gray-500">No options</p>
          )}
        </div>
      )}
    </div>
  );
}

export default Dropdown;
