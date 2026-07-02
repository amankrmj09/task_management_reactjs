import { useCallback } from "react";
import ActionButton from "../../../components/shared/ActionButton";
import { useTheme } from "../../../app/ThemeContext";
import { cn } from "../../../lib/utils";
import { Users, RefreshCw, UserPlus } from "lucide-react";
import { useScrollTop } from "../../../hooks/useScrollTop";

function TeamHeader({
  title = "Team Members",
  subtitle = "Manage organization users",
  onInvite,
  actions,
}) {
  const { glass } = useTheme();
  const isScrolled = useScrollTop();

  const handleRefresh = useCallback(() => window.location.reload(), []);

  return (
    <div className={cn(
      "sticky top-0 z-30 flex justify-between items-stretch flex-wrap gap-4 transition-all duration-300",
      isScrolled 
        ? "bg-[var(--bg-panel)]/80 backdrop-blur-xl border border-[var(--border-color)] shadow-md rounded-2xl px-6 py-4 mt-2" 
        : "bg-transparent border-transparent py-2",
      isScrolled && !glass && "bg-[var(--bg-panel)] backdrop-blur-none"
    )}>
      <div>
        <h1 className="text-2xl font-bold text-[var(--text-main)] flex items-center gap-2 leading-none">
          <Users className="text-[var(--color-primary)]" />
          {title}
        </h1>
        {subtitle && (
          <p className="text-[var(--text-muted)] text-sm mt-1">{subtitle}</p>
        )}
      </div>

      <div className="flex items-stretch gap-3">
        {actions}
        {onInvite && (
          <ActionButton
            text="Invite Member"
            icon={UserPlus}
            onClick={onInvite}
            roundedClass="rounded-xl"
            className="px-4 h-full shadow-md"
          />
        )}
        {!actions && (
          <ActionButton
            text="Refresh"
            icon={RefreshCw}
            bgClass="bg-[var(--bg-panel)]"
            textClass="text-[var(--text-main)]"
            borderClass="border border-[var(--border-color)]"
            hoverBgClass="hover:bg-[var(--bg-panel-hover)]"
            iconColor="text-[var(--text-main)]"
            onClick={handleRefresh}
            roundedClass="rounded-xl"
            className="px-4 h-full shadow-md"
          />
        )}
      </div>
    </div>
  );
}

export default TeamHeader;
