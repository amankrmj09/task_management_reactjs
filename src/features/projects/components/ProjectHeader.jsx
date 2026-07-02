import { useTheme } from "../../../app/ThemeContext";
import ActionButton from "../../../components/shared/ActionButton";
import { cn } from "../../../lib/utils";
import { Folder, RefreshCw } from "lucide-react";
import { useScrollTop } from "../../../hooks/useScrollTop";

function ProjectHeader({ project, title, subtitle, status, actions }) {
  const { glass } = useTheme();
  const isScrolled = useScrollTop();
  
  const displayTitle = title || project?.name;
  const displaySubtitle = subtitle || project?.description;
  const displayStatus = status || project?.status;

  return (
    <div className={cn(
      "sticky top-0 z-30 flex justify-between items-stretch flex-wrap gap-4 transition-all duration-300",
      isScrolled 
        ? "bg-[var(--bg-panel)]/80 backdrop-blur-xl border border-[var(--border-color)] shadow-md rounded-2xl px-6 py-4 mt-2" 
        : "bg-transparent border-transparent py-2",
      isScrolled && !glass && "bg-[var(--bg-panel)] backdrop-blur-none"
    )}>
      <div>
        {displayTitle && (
          <h1 className="text-2xl font-bold text-[var(--text-main)] flex items-center gap-2 leading-none">
            <Folder className="text-[var(--color-primary)]" />
            {displayTitle}
          </h1>
        )}
        {displaySubtitle && (
          <p className="text-[var(--text-muted)] text-sm mt-1">{displaySubtitle}</p>
        )}
      </div>

      <div className="flex items-stretch gap-3">
        {displayStatus && (
          <span className="self-center rounded-full bg-[var(--color-primary)]/10 px-3 py-1 text-[10px] font-medium text-[var(--color-primary)] border border-[var(--color-primary)]/20">
            {displayStatus}
          </span>
        )}

        {actions}
        {!actions && (
          <div className="flex items-stretch gap-3">
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
          </div>
        )}
      </div>
    </div>
  );
}

export default ProjectHeader;
