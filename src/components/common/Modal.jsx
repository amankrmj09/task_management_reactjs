import { X } from "lucide-react";
import DialogOverlay from "./DialogOverlay";

function Modal({
  isOpen,
  onClose,
  title,
  size,
  children,
}) {
  return (
    <DialogOverlay isOpen={isOpen} onClose={onClose} size={size}>
      {/* Pinned header */}
      <div className="flex shrink-0 items-center justify-between px-6 pt-6 pb-4">
        <h2 className="text-2xl font-semibold text-[var(--text-main)]">
          {title}
        </h2>
        <button
          type="button"
          onClick={onClose}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-[var(--text-muted)] transition hover:bg-[var(--bg-panel-hover)] hover:text-[var(--text-main)]"
        >
          <X size={18} />
        </button>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 min-h-0 overflow-y-auto px-6 pb-6">
        {children}
      </div>
    </DialogOverlay>
  );
}

export default Modal;