import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { cn } from '../../lib/utils';

export const CustomSelect = ({ 
  value, 
  onChange, 
  options = [], 
  placeholder = "Select...", 
  className = "" 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = options.find(opt => opt.value === value);

  return (
    <div className={cn("relative w-full", className)} ref={containerRef}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-full flex items-center justify-between text-left px-4 py-2.5 rounded-xl border bg-[var(--bg-panel)] text-[var(--text-main)] outline-none transition-all shadow-sm",
          isOpen ? "border-[var(--color-primary)] ring-2 ring-[var(--color-primary)]/20" : "border-[var(--border-color)] hover:border-[var(--color-primary)]/50",
          !selectedOption && "text-[var(--text-muted)]"
        )}
      >
        <span className="truncate">
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown 
          size={16} 
          className={cn("text-[var(--text-muted)] transition-transform duration-200", isOpen && "rotate-180")} 
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-[var(--bg-panel)] border border-[var(--border-color)] rounded-xl shadow-lg max-h-60 overflow-y-auto overflow-x-hidden animate-in fade-in zoom-in-95 duration-200 py-1">
          {options.length === 0 ? (
            <div className="px-4 py-3 text-sm text-[var(--text-muted)] text-center">
              No options available
            </div>
          ) : (
            options.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => {
                  onChange(opt.value);
                  setIsOpen(false);
                }}
                className={cn(
                  "w-full flex items-center justify-between px-4 py-2.5 text-sm text-left transition-colors hover:bg-[var(--color-primary)]/10 hover:text-[var(--color-primary)]",
                  value === opt.value ? "text-[var(--color-primary)] font-semibold bg-[var(--color-primary)]/5" : "text-[var(--text-main)]"
                )}
              >
                <span className="truncate">{opt.label}</span>
                {value === opt.value && <Check size={14} className="text-[var(--color-primary)] ml-2 shrink-0" />}
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
};
