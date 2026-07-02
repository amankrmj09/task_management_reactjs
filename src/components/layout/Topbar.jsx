import React from 'react';
import { useTheme } from '../../app/ThemeContext';
import { Moon, Sun, Monitor, Menu, Droplets } from 'lucide-react';
import { cn } from '../../lib/utils';

export const Topbar = ({ onMenuClick }) => {
  const { theme, setTheme, glass, setGlass } = useTheme();

  return (
    <header className={cn(
      "sticky top-0 z-30 flex h-16 w-full items-center justify-between px-4 md:px-6 lg:px-8 transition-colors",
      glass ? "glass-panel rounded-b-2xl md:mx-4 mt-0 border-t-0" : "bg-[var(--bg-panel)] border-b border-[var(--border-color)]"
    )}>
      <div className="flex items-center gap-4">
        <button 
          onClick={onMenuClick}
          className="md:hidden p-2 -ml-2 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-panel-hover)] transition-colors"
        >
          <Menu size={24} />
        </button>
      </div>

      <div className="flex items-center gap-3">
        {/* Glass Toggle */}
        <button
          onClick={() => setGlass(!glass)}
          title="Toggle Glassmorphism"
          className={cn(
            "p-2 rounded-full transition-all duration-200 cursor-pointer",
            glass 
              ? "bg-[var(--color-primary-light)]/20 text-[var(--color-primary)] shadow-[0_0_15px_rgba(58,123,213,0.3)]" 
              : "text-[var(--text-muted)] hover:bg-[var(--bg-panel-hover)]"
          )}
        >
          <Droplets size={18} />
        </button>

        {/* Theme Selector */}
        <div className="flex items-center gap-2 bg-[var(--bg-base)] rounded-full p-1 border border-[var(--border-color)]/50">
          <select 
            value={theme} 
            onChange={(e) => setTheme(e.target.value)}
            className="bg-transparent border-none text-sm font-medium focus:ring-0 cursor-pointer pl-3 pr-6 outline-none appearance-none text-[var(--text-main)]"
            style={{ 
              backgroundImage: `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3E%3C/svg%3E")`,
              backgroundPosition: 'right 0.25rem center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: '1.25em 1.25em'
            }}
          >
            <option value="system">Auto</option>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
          <div className="p-1.5 rounded-full bg-[var(--bg-panel)] shadow-sm text-[var(--text-main)]">
            {theme === 'dark' ? <Moon size={14} /> : theme === 'light' ? <Sun size={14} /> : <Monitor size={14} />}
          </div>
        </div>
        
        {/* Profile Avatar */}
        <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[var(--color-primary-light)] to-[var(--color-primary-dark)] border-2 border-[var(--bg-panel)] shadow-sm ml-2 overflow-hidden flex items-center justify-center">
          <span className="text-white text-xs font-bold">AM</span>
        </div>
      </div>
    </header>
  );
};
