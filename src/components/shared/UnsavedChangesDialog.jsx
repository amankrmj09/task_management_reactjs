import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Save, Trash2, X } from 'lucide-react';

import { useTheme } from '../../app/ThemeContext';
import { cn } from '../../lib/utils';
import ActionButton from './ActionButton';

export const UnsavedChangesDialog = ({ blocker, onSave }) => {
  const { glass } = useTheme();

  if (blocker.state !== 'blocked') return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-transparent backdrop-blur-md"
          onClick={() => blocker.reset()}
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className={cn(
            "relative w-full max-w-md flex flex-col overflow-hidden rounded-3xl shadow-2xl",
            glass ? "glass-panel" : "bg-[var(--bg-panel)] border border-[var(--border-color)]"
          )}
        >
          {/* Top decorative gradient */}
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[var(--color-warning)] to-transparent opacity-50" />
          
          {/* Subtle background glow */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-[var(--color-warning)] rounded-full blur-[100px] opacity-10 pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-[var(--color-warning)] rounded-full blur-[100px] opacity-10 pointer-events-none" />

          <button 
            onClick={() => blocker.reset()}
            className="absolute top-5 right-5 p-2 rounded-full text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-panel-hover)] transition-all z-20"
          >
            <X size={20} />
          </button>

          <div className="p-8 sm:p-10 relative z-10 flex flex-col items-center text-center">
            {/* Animated Icon Container */}
            <div className="relative mb-6">
              <div className="absolute inset-0 rounded-full bg-[var(--color-warning)] opacity-20 animate-ping" style={{ animationDuration: '3s' }} />
              <div className="relative flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[var(--color-warning)]/10 to-[var(--color-warning)]/30 border border-[var(--color-warning)]/20 shadow-inner">
                <AlertTriangle size={32} className="text-[var(--color-warning)]" />
              </div>
            </div>
            
            <h3 className="text-2xl font-bold text-[var(--text-main)] mb-3 tracking-tight">
              Unsaved Changes
            </h3>
            
            <p className="text-[var(--text-muted)] text-[0.95rem] leading-relaxed">
              You have unsaved changes. What would you like to do?
            </p>
          </div>

          {/* Footer actions */}
          <div className="p-6 pt-0 flex flex-col gap-3 relative z-10 bg-[var(--bg-panel-hover)]/30">
            <ActionButton
              text="Save Changes & Continue"
              icon={Save}
              onClick={async () => {
                await onSave();
                blocker.proceed();
              }}
              className="w-full py-3 h-auto"
            />
            <ActionButton
              text="Discard Changes"
              icon={Trash2}
              onClick={() => blocker.proceed()}
              bgClass="bg-transparent"
              textClass="text-[var(--color-danger)]"
              borderClass="border border-[var(--color-danger)]"
              hoverBgClass="hover:bg-[var(--color-danger)]/10"
              iconColor="text-[var(--color-danger)]"
              className="w-full py-3 h-auto"
            />
            <ActionButton
              text="Cancel"
              icon={X}
              onClick={() => blocker.reset()}
              bgClass="bg-[var(--bg-panel)]"
              textClass="text-[var(--text-main)]"
              borderClass="border border-[var(--border-color)]"
              hoverBgClass="hover:bg-[var(--bg-panel-hover)]"
              iconColor="text-[var(--text-main)]"
              className="w-full py-3 h-auto"
            />
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default UnsavedChangesDialog;
