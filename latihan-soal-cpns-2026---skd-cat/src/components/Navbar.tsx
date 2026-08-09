import React from 'react';
import { 
  BookOpen, 
  Clock, 
  Award, 
  Sparkles, 
  BarChart2, 
  Bookmark, 
  Home, 
  Layers 
} from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  bookmarkCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  bookmarkCount,
}) => {
  const navItems = [
    { id: 'dashboard', label: 'Beranda', icon: Home },
    { id: 'practice', label: 'Latihan Kategori', icon: BookOpen },
    { id: 'cat_sim', label: 'Simulasi CAT BKN', icon: Clock, badge: 'OFFICIAL' },
    { id: 'bank', label: 'Bank Soal SPMB', icon: Layers },
    { id: 'ai_tutor', label: 'AI Tutor & Generator', icon: Sparkles, highlight: true },
    { id: 'stats', label: 'Statistik & Riwayat', icon: BarChart2 },
    { id: 'bookmarks', label: 'Favorit', icon: Bookmark, count: bookmarkCount },
  ];

  return (
    <header className="sticky top-0 z-40 bg-slate-900 border-b border-slate-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div 
            className="flex items-center gap-3 cursor-pointer select-none"
            onClick={() => setActiveTab('dashboard')}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center shadow-md shadow-emerald-500/20">
              <Award className="w-6 h-6 text-slate-950 font-bold" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg tracking-tight text-white">
                  CPNS <span className="text-teal-400">Master</span>
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  SKD 2026
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                Simulasi CAT & Latihan Soal BKN
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-btn-${item.id}`}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold transition-all relative ${
                    isActive
                      ? 'bg-teal-600/20 text-teal-300 border border-teal-500/30 shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-teal-400' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                  
                  {item.badge && (
                    <span className="text-[9px] font-black px-1.5 py-0.5 rounded bg-red-500/20 text-red-400 border border-red-500/30 uppercase">
                      {item.badge}
                    </span>
                  )}

                  {item.highlight && (
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping absolute top-1 right-1" />
                  )}

                  {typeof item.count === 'number' && item.count > 0 && (
                    <span className="ml-1 px-1.5 py-0.2 bg-teal-500 text-slate-950 text-[10px] font-extrabold rounded-full">
                      {item.count}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Action Badge & Profile */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800/90 border border-slate-700/80 text-xs">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-amber-500 to-teal-400 text-slate-950 font-black flex items-center justify-center text-xs">
                AH
              </div>
              <div className="text-left leading-tight">
                <div className="font-bold text-white text-xs flex items-center gap-1">
                  Amru Husayni <span className="text-[10px] font-normal text-teal-300">(Usen)</span>
                </div>
                <div className="text-[10px] text-amber-300 font-medium">🔥 Calon NIP CPNS 2026</div>
              </div>
            </div>

            <button
              onClick={() => setActiveTab('cat_sim')}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-slate-950 text-xs font-bold shadow-md shadow-teal-500/20 transition-all transform active:scale-95"
            >
              <Clock className="w-3.5 h-3.5" />
              <span>Gas Tryout</span>
            </button>
          </div>
        </div>

        {/* Mobile Sub-Navigation Scrollable */}
        <div className="md:hidden flex items-center gap-2 py-2 overflow-x-auto no-scrollbar border-t border-slate-800/80">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-teal-600/30 text-teal-300 border border-teal-500/40'
                    : 'text-slate-300 bg-slate-800/50 hover:bg-slate-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
                {typeof item.count === 'number' && item.count > 0 && (
                  <span className="ml-0.5 px-1.5 py-0.2 bg-teal-500 text-slate-950 text-[9px] font-black rounded-full">
                    {item.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
