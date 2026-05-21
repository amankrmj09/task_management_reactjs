function Tooltip({ content, position = "top", children }) {
  if (!content) return children;

  const positionClasses = {
    top: "bottom-full mb-2",
    bottom: "top-full mt-2",
    left: "right-full mr-2",
    right: "left-full ml-2",
  };

  return (
    <span className="relative inline-flex items-center">
      <span className="group inline-flex items-center">
        {children}
        <span
          className={`pointer-events-none absolute z-20 whitespace-nowrap rounded-lg bg-gray-800 px-3 py-1 text-xs text-white opacity-0 transition group-hover:opacity-100 ${
            positionClasses[position] || positionClasses.top
          }`}
        >
          {content}
        </span>
      </span>
    </span>
  );
}

export default Tooltip;
