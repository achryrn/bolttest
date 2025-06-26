import React, { useState } from 'react';
import { Home, FolderOpen, Server, Film, Menu, X } from 'lucide-react';

type TabType = 'home' | 'files' | 'servers' | 'movies';

interface NavigationProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home' as TabType, label: 'Home', icon: Home },
    { id: 'files' as TabType, label: 'Files', icon: FolderOpen },
    { id: 'servers' as TabType, label: 'Servers', icon: Server },
    { id: 'movies' as TabType, label: 'Movies', icon: Film },
  ];

  const handleTabChange = (tab: TabType) => {
    onTabChange(tab);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-slate-800/80 backdrop-blur-sm text-white rounded-lg shadow-lg border border-slate-700"
      >
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay for mobile */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <nav className={`
        fixed left-0 top-0 h-full w-64 bg-slate-800/90 backdrop-blur-xl border-r border-slate-700 z-40 transform transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-6">
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Home className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Home Web</h1>
              <p className="text-slate-400 text-sm">Dashboard</p>
            </div>
          </div>

          <ul className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              
              return (
                <li key={item.id}>
                  <button
                    onClick={() => handleTabChange(item.id)}
                    className={`
                      w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200
                      ${isActive 
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25' 
                        : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
                      }
                    `}
                  >
                    <Icon size={20} />
                    <span className="font-medium">{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="absolute bottom-6 left-6 right-6">
          <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
            <p className="text-slate-300 text-sm font-medium mb-1">System Status</p>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-green-400 text-sm">Online</span>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navigation;