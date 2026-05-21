function Modal({
  isOpen,
  onClose,
  title,
  children,
}) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Outer shell: clips scrollbar inside rounded corners */}
      <div
        className="w-full max-w-lg overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Inner scroll area */}
        <div className="max-h-[85vh] overflow-y-auto p-6">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-gray-800">
              {title}
            </h2>

            <button
              onClick={onClose}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xl text-gray-400 transition hover:bg-gray-100 hover:text-gray-600"
            >
              ×
            </button>
          </div>

          {children}
        </div>
      </div>
    </div>
  );
}

export default Modal;