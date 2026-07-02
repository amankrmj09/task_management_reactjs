import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../../app/ThemeContext';
import { Settings, Moon, Sun, Monitor, Type, Laptop, User, LogOut, RefreshCw } from 'lucide-react';
import { cn } from '../../../lib/utils';
import { useScrollTop } from '../../../hooks/useScrollTop';

import Button from '../../../components/common/Button';
import SettingsTabs from '../components/SettingsTabs';
import { logoutUser } from '../../auth/redux/authThunk';
import { ROUTES } from '../../../routes/routeConstants';

export default function SettingsPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { theme, setTheme, glass, setGlass } = useTheme();
  const isScrolled = useScrollTop(); 

  const toggleGlass = () => setGlass(!glass);

  const handleSignout = async () => {
    await dispatch(logoutUser());
    navigate(ROUTES.LOGIN);
  };

  return (
    <div className="flex flex-col min-h-full gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className={cn(
        "sticky top-0 z-30 flex justify-between items-center flex-wrap gap-4 transition-all duration-300",
        isScrolled 
          ? "bg-[var(--bg-panel)]/80 backdrop-blur-xl border border-[var(--border-color)] shadow-md rounded-2xl px-6 py-4 mt-2" 
          : "bg-transparent border-transparent py-2",
        isScrolled && !glass && "bg-[var(--bg-panel)] backdrop-blur-none"
      )}>
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-main)] flex items-center gap-2 leading-none">
            <Settings className="text-[var(--color-primary)]" />
            Settings
          </h1>
          <p className="text-[var(--text-muted)] text-sm mt-1">Manage your account settings and appearance.</p>
        </div>

        <div className="flex gap-3">
          <button 
            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-[var(--border-color)] bg-[var(--bg-panel)] text-[var(--text-main)] hover:bg-[var(--bg-panel-hover)] transition-all shadow-sm" 
            onClick={() => window.location.reload()}
          >
            <RefreshCw size={16} /> 
            <span className="hidden sm:inline">Refresh</span>
          </button>
        </div>
      </div>

      <div className={cn(
        "flex flex-col gap-6 p-6 sm:p-8 rounded-3xl",
        glass ? "glass-panel" : "bg-[var(--bg-panel)] border border-[var(--border-color)] shadow-sm"
      )}>
        <h3 className="font-bold text-sm uppercase tracking-wider text-[var(--text-main)] border-b border-[var(--border-color)]/50 pb-3 mb-2 flex items-center gap-2">
          <Monitor size={16} /> Appearance
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Theme Toggle */}
          <div className="flex flex-col xl:flex-row xl:items-center justify-between p-4 bg-[var(--bg-base)] rounded-2xl border border-[var(--border-color)] hover:border-[var(--color-primary)]/50 transition-colors shadow-sm gap-4">
            <div className="flex flex-col">
              <span className="font-semibold text-[var(--text-main)] flex items-center gap-2">
                {theme === 'dark' ? <Moon size={16} className="text-indigo-400" /> : theme === 'light' ? <Sun size={16} className="text-amber-500" /> : <Laptop size={16} className="text-slate-400" />}
                Theme Mode
              </span>
              <span className="text-xs text-[var(--text-muted)] mt-1">Select your preferred color scheme</span>
            </div>
            
            <div className="flex bg-[var(--bg-panel)] p-1 rounded-xl border border-[var(--border-color)]">
              <button 
                onClick={() => setTheme('light')}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all",
                  theme === 'light' ? "glass-card text-black shadow-sm" : "text-[var(--text-muted)] hover:text-[var(--text-main)]"
                )}
              >
                <Sun size={14} /> Light
              </button>
              <button 
                onClick={() => setTheme('dark')}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all",
                  theme === 'dark' ? "bg-slate-800 text-white shadow-sm" : "text-[var(--text-muted)] hover:text-[var(--text-main)]"
                )}
              >
                <Moon size={14} /> Dark
              </button>
              <button 
                onClick={() => setTheme('system')}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all",
                  theme === 'system' ? "bg-[var(--color-primary)] text-white shadow-sm" : "text-[var(--text-muted)] hover:text-[var(--text-main)]"
                )}
              >
                <Laptop size={14} /> System
              </button>
            </div>
          </div>

          {/* Glassmorphism Toggle */}
          <div className="flex items-center justify-between p-4 bg-[var(--bg-base)] rounded-2xl border border-[var(--border-color)] hover:border-[var(--color-primary)]/50 transition-colors shadow-sm relative overflow-hidden">
            {glass && <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />}
            <div className="flex flex-col relative z-10">
              <span className="font-semibold text-[var(--text-main)] flex items-center gap-2">
                <Type size={16} className="text-pink-500" />
                Glassmorphism
              </span>
              <span className="text-xs text-[var(--text-muted)] mt-1">Enable transparent blurred panels</span>
            </div>
            <button 
              onClick={toggleGlass}
              className={cn(
                "relative z-10 px-4 py-2 rounded-xl border font-medium transition-all shadow-sm flex items-center gap-2",
                glass 
                  ? "bg-[var(--color-primary)]/10 border-[var(--color-primary)]/50 text-[var(--color-primary)] hover:bg-[var(--color-primary)]/20" 
                  : "bg-[var(--bg-panel)] border-[var(--border-color)] text-[var(--text-main)] hover:bg-[var(--bg-panel-hover)]"
              )}
            >
              {glass ? 'Enabled' : 'Disabled'}
            </button>
          </div>
        </div>
      </div>
      
      {/* Account Settings Section */}
      <div className={cn(
        "flex flex-col gap-6 p-6 sm:p-8 rounded-3xl",
        glass ? "glass-panel" : "bg-[var(--bg-panel)] border border-[var(--border-color)] shadow-sm"
      )}>
        <h3 className="font-bold text-sm uppercase tracking-wider text-[var(--text-main)] border-b border-[var(--border-color)]/50 pb-3 mb-2 flex items-center gap-2">
          <User size={16} /> Account
        </h3>
        
        <SettingsTabs />
      </div>

      {/* Danger Zone Section */}
      <div className={cn(
        "flex flex-col gap-6 p-6 sm:p-8 rounded-3xl border border-red-500/20 bg-red-500/5",
        glass ? "backdrop-blur-xl" : ""
      )}>
        <h3 className="font-bold text-sm uppercase tracking-wider text-red-500 border-b border-red-500/20 pb-3 mb-2 flex items-center gap-2">
          <LogOut size={16} /> Danger Zone
        </h3>
        
        <div>
          <h4 className="text-lg font-semibold text-red-500">Sign Out</h4>
          <p className="mt-1 text-sm text-[var(--text-muted)]">
            Sign out of your account on this device. You will need to log in again to access your data.
          </p>
          <Button
            variant="danger"
            onClick={handleSignout}
            className="mt-4 bg-red-500 hover:bg-red-600 text-white border-none"
          >
            Sign Out
          </Button>
        </div>
      </div>

    </div>
  );
}
