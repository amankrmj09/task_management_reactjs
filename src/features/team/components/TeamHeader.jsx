import Button from "../../../components/common/Button";
import { useTheme } from "../../../app/ThemeContext";
import { cn } from "../../../lib/utils";
import { Users, RefreshCw } from "lucide-react";
import { useScrollTop } from "../../../hooks/useScrollTop";

function TeamHeader({
  title = "Team Members",
  subtitle = "Manage organization users",
  onInvite,
  actions,
}) {
  const { glass } = useTheme();
  const isScrolled = useScrollTop();

  return (
    <div className={cn(
      "sticky top-0 z-30 flex justify-between items-center flex-wrap gap-4 transition-all duration-300",
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

      <div className="flex gap-3">
        {actions}
        {onInvite && <Button onClick={onInvite} className="!px-4 !py-2 h-[42px]">Invite Member</Button>}
        {!actions && (
          <button 
            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-[var(--border-color)] bg-[var(--bg-panel)] text-[var(--text-main)] hover:bg-[var(--bg-panel-hover)] transition-all shadow-sm" 
            onClick={() => window.location.reload()}
          >
            <RefreshCw size={16} /> 
            <span className="hidden sm:inline">Refresh</span>
          </button>
        )}
      </div>
    </div>
  );
}

export default TeamHeader;
