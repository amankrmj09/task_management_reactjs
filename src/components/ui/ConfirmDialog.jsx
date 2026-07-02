import React, { useEffect } from 'react';
import { AlertTriangle, X } from 'lucide-react';
import { useTheme } from '../../app/ThemeContext';
import { cn } from '../../lib/utils';
import ActionButton from '../shared/ActionButton';

export const ConfirmDialog = ({ isOpen, onClose, onConfirm, title, message }) => {
  const { glass } = useTheme();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-transparent backdrop-blur-md animate-in fade-in duration-300"
        onClick={onClose}
      />
      
      {/* Dialog */}
      <div className={cn(
        "relative w-full max-w-md overflow-hidden rounded-3xl shadow-2xl animate-in zoom-in-95 fade-in duration-300 flex flex-col",
        glass ? "glass-panel" : "bg-[var(--bg-panel)] border border-[var(--border-color)]"
      )}>
        
        {/* Top decorative gradient for a premium feel */}
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[var(--color-danger)] to-transparent opacity-50" />
        
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-panel-hover)] transition-all z-10"
        >
          <X size={18} />
        </button>

        <div className="p-8 pb-6 flex flex-col items-center text-center relative z-0">
          {/* Animated Icon Container */}
          <div className="relative mb-6">
            <div className="absolute inset-0 rounded-full bg-[var(--color-danger)] opacity-20 animate-ping" style={{ animationDuration: '3s' }} />
            <div className="relative flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[var(--color-danger)]/10 to-[var(--color-danger)]/30 border border-[var(--color-danger)]/20 shadow-inner">
              <AlertTriangle size={32} className="text-[var(--color-danger)]" />
            </div>
          </div>
          
          <h3 className="text-2xl font-bold text-[var(--text-main)] mb-3 tracking-tight">
            {title}
          </h3>
          
          <p className="text-[var(--text-muted)] text-[0.95rem] leading-relaxed">
            {message}
          </p>
        </div>
        
        {/* Actions Area */}
        <div className="p-6 pt-4 flex flex-col-reverse sm:flex-row gap-3 bg-[var(--bg-panel-hover)]/30 relative z-10">
          <ActionButton
            text="Cancel"
            onClick={onClose}
            bgClass="bg-transparent"
            borderClass="border border-[var(--border-color)]"
            textClass="text-[var(--text-main)]"
            hoverBgClass="hover:bg-[var(--bg-panel-hover)]"
            iconColor="text-[var(--text-main)]"
            className="flex-1 py-3 px-4 h-auto justify-center"
          />
          <ActionButton
            text="Yes, delete it"
            onClick={() => {
              onConfirm();
              onClose();
            }}
            bgClass="bg-[var(--color-danger)]"
            hoverBgClass="hover:bg-red-600"
            className="flex-1 py-3 px-4 h-auto justify-center"
          />
        </div>
      </div>
    </div>
  );
};
