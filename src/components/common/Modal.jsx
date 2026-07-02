import { useEffect } from "react";

function Modal({
  isOpen,
  onClose,
  title,
  children,
}) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="relative z-50">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-[var(--bg-panel-hover)]/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />

      {/* Full-screen scrollable container */}
      <div className="fixed inset-0 z-10 overflow-y-auto" onClick={onClose}>
        {/* Center the modal */}
        <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
          {/* Modal Panel */}
          <div
            className="relative transform overflow-hidden rounded-2xl border border-[var(--border-color)] bg-[var(--bg-panel)] glass-card shadow-2xl transition-all sm:my-8 w-full max-w-lg text-left"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="mb-5 flex items-center justify-between">
                <h2 className="text-2xl font-semibold text-[var(--text-main)]">
                  {title}
                </h2>
                <button
                  type="button"
                  onClick={onClose}
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xl text-[var(--text-muted)] transition hover:bg-[var(--bg-panel-hover)] hover:text-[var(--text-muted)]"
                >
                  ×
                </button>
              </div>

              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;