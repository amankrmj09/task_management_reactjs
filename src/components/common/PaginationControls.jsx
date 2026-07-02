import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

function PaginationControls({
  pageNumber,
  totalPages,
  isLast,
  onPrevious,
  onNext,
}) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-[var(--text-muted)]">
        Page {pageNumber + 1} of {totalPages}
      </span>
      <div className="flex gap-1">
        <button
          onClick={onPrevious}
          disabled={pageNumber === 0}
          className="flex items-center justify-center w-8 h-8 rounded-lg border border-[var(--border-color)] bg-[var(--bg-panel)] text-[var(--text-main)] hover:bg-[var(--bg-panel-hover)] disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
        >
          <ChevronLeft size={16} />
        </button>
        <button
          onClick={onNext}
          disabled={isLast || pageNumber >= totalPages - 1}
          className="flex items-center justify-center w-8 h-8 rounded-lg border border-[var(--border-color)] bg-[var(--bg-panel)] text-[var(--text-main)] hover:bg-[var(--bg-panel-hover)] disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}

export default PaginationControls;
