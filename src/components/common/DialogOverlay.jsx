import { useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../../app/ThemeContext";
import { cn } from "../../lib/utils";

const SIZE_MAP = {
  sm: "max-w-sm",       // 384px
  md: "max-w-lg",       // 512px
  lg: "max-w-2xl",      // 672px
  xl: "max-w-3xl",      // 768px
  full: "max-w-[calc(100vw-2rem)]",
};

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2, ease: "easeOut" } },
  exit: { opacity: 0, transition: { duration: 0.15, ease: "easeIn" } },
};

const panelVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 8 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] },
  },
  exit: {
    opacity: 0,
    scale: 0.97,
    y: 4,
    transition: { duration: 0.15, ease: "easeIn" },
  },
};

/**
 * DialogOverlay — a headless parent component for all dialog/modal overlays.
 *
 * Provides: portal rendering, animated backdrop + panel (Framer Motion),
 * Escape‑key close, body scroll lock, click‑outside close, and
 * glassmorphism support via ThemeContext.
 *
 * Does NOT render any header, title, or close button — consumers add those.
 *
 * @param {boolean}   isOpen     — controls visibility
 * @param {function}  onClose    — called on backdrop click or Escape key
 * @param {string}    [size]     — "sm" | "md" | "lg" | "xl" | "full" (default "md")
 * @param {string}    [className] — extra classes on the panel
 * @param {ReactNode} children   — dialog content
 */
function DialogOverlay({
  isOpen,
  onClose,
  size = "md",
  className = "",
  children,
}) {
  const { glass } = useTheme();

  // ── Escape key close ─────────────────────────────────────────
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (!isOpen) return;
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handleKeyDown]);

  // ── Body scroll lock ─────────────────────────────────────────
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // ── Portal rendering ─────────────────────────────────────────
  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100]">
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-[var(--bg-base)]/50 backdrop-blur-sm"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
          />

          {/* Centering wrapper — no scroll here, panel stays fixed in center */}
          <div
            className="fixed inset-0 z-10 flex items-center justify-center p-4 sm:p-6"
            onClick={onClose}
          >
            {/* Panel */}
            <motion.div
              className={cn(
                "relative w-full max-h-[calc(100vh-3rem)] flex flex-col rounded-2xl shadow-2xl overflow-hidden",
                SIZE_MAP[size] || SIZE_MAP.md,
                glass
                  ? "glass-panel"
                  : "bg-[var(--bg-panel)] border border-[var(--border-color)]",
                className
              )}
              variants={panelVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
            >
              {children}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}

export default DialogOverlay;
