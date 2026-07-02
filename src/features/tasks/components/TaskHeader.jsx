import { useTheme } from "../../../app/ThemeContext";
import ActionButton from "../../../components/shared/ActionButton";
import { cn } from "../../../lib/utils";
import { CheckSquare, RefreshCw } from "lucide-react";
import { useScrollTop } from "../../../hooks/useScrollTop";

function TaskHeader({
  title = "Tasks",
  subtitle = "Manage project tasks",
  actions,
}) {
  const { glass } = useTheme();
  const isScrolled = useScrollTop();

  return (
    <div className={cn(
      "sticky top-0 z-50 flex justify-between items-stretch flex-wrap gap-4 transition-all duration-300",
      isScrolled 
        ? "bg-[var(--bg-panel)]/80 backdrop-blur-xl border border-[var(--border-color)] shadow-md rounded-2xl px-6 py-4 mt-2" 
        : "bg-transparent border-transparent py-2",
      isScrolled && !glass && "bg-[var(--bg-panel)] backdrop-blur-none"
    )}>
      <div>
        <h1 className="text-2xl font-bold text-[var(--text-main)] flex items-center gap-2 leading-none">
          <CheckSquare className="text-[var(--color-primary)]" />
          {title}
        </h1>
        {subtitle && (
          <p className="text-[var(--text-muted)] text-sm mt-1">{subtitle}</p>
        )}
      </div>

      <div className="flex items-stretch gap-3">
        {actions}
        {!actions && (
          <ActionButton
            text="Refresh"
            icon={RefreshCw}
            bgClass="bg-[var(--bg-panel)]"
            textClass="text-[var(--text-main)]"
            borderClass="border border-[var(--border-color)]"
            hoverBgClass="hover:bg-[var(--bg-panel-hover)]"
            iconColor="text-[var(--text-main)]"
            onClick={() => window.location.reload()}
            roundedClass="rounded-xl"
            className="px-4 h-full shadow-md"
          />
        )}
      </div>
    </div>
  );
}

export default TaskHeader;
