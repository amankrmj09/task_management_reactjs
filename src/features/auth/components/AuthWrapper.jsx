import { useTheme } from "../../../app/ThemeContext";
import { cn } from "../../../lib/utils";

function AuthWrapper({ title, subtitle, children, footer }) {
  const { glass } = useTheme();

  return (
    <div className="flex h-screen w-full items-center justify-center bg-transparent overflow-hidden px-4">
      <div className={cn(
        "w-full max-w-[440px] rounded-2xl p-6 sm:p-8 relative z-10 transition-all duration-300",
        glass 
          ? "glass-panel shadow-sm border border-[var(--border-color)]" 
          : "bg-[var(--bg-panel)] border border-[var(--border-color)] shadow-sm"
      )}>
        <div className="mb-4 text-center">
          {title && (
            <h1 className="text-xl font-bold text-[var(--text-main)] tracking-tight">
              {title}
            </h1>
          )}
          {subtitle && (
            <p className="mt-1 text-xs text-[var(--text-muted)] font-medium">{subtitle}</p>
          )}
        </div>

        {children}

        {footer && <div className="mt-4 pt-3 border-t border-[var(--border-color)]/50 text-center">{footer}</div>}
      </div>
    </div>
  );
}

export default AuthWrapper;
