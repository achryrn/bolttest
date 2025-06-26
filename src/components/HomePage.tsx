import React from 'react';
import { FolderOpen, Server, Film, TrendingUp, HardDrive, Activity, Eye } from 'lucide-react';

type TabType = 'home' | 'files' | 'servers' | 'movies';

interface HomePageProps {
  onTabChange: (tab: TabType) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onTabChange }) => {
  const stats = [
    { label: 'Total Files', value: '1,247', icon: HardDrive, color: 'from-blue-500 to-cyan-500' },
    { label: 'Active Servers', value: '8/12', icon: Activity, color: 'from-emerald-500 to-teal-500' },
    { label: 'Movie Collections', value: '342', icon: Film, color: 'from-purple-500 to-pink-500' },
    { label: 'Daily Views', value: '2,891', icon: Eye, color: 'from-amber-500 to-orange-500' },
  ];

  const quickActions = [
    {
      id: 'files' as TabType,
      title: 'File Manager',
      description: 'Browse, preview, and download files from your directories',
      icon: FolderOpen,
      color: 'from-blue-500 to-cyan-500',
      features: ['File Preview', 'Download Support', 'Directory Navigation']
    },
    {
      id: 'servers' as TabType,
      title: 'Server Status',
      description: 'Monitor and manage your server infrastructure',
      icon: Server,
      color: 'from-emerald-500 to-teal-500',
      features: ['Real-time Status', 'Health Monitoring', 'Quick Actions']
    },
    {
      id: 'movies' as TabType,
      title: 'Movie Portal',
      description: 'Access your movie collection and streaming services',
      icon: Film,
      color: 'from-purple-500 to-pink-500',
      features: ['Quick Access', 'Collection Browse', 'External Links']
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center lg:text-left">
        <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
          Welcome to <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Home Web</span>
        </h1>
        <p className="text-slate-300 text-lg max-w-2xl">
          Your personal dashboard for file management, server monitoring, and entertainment. 
          Everything you need in one beautiful interface.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 hover:border-slate-600 transition-all duration-300 hover:transform hover:scale-105"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg bg-gradient-to-r ${stat.color}`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <TrendingUp className="w-4 h-4 text-green-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">{stat.value}</h3>
              <p className="text-slate-400 text-sm">{stat.label}</p>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {quickActions.map((action) => {
          const Icon = action.icon;
          return (
            <div
              key={action.id}
              onClick={() => onTabChange(action.id)}
              className="group bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 hover:border-slate-600 transition-all duration-300 cursor-pointer hover:transform hover:scale-105"
            >
              <div className="flex items-center mb-4">
                <div className={`p-3 rounded-lg bg-gradient-to-r ${action.color} mr-4`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white group-hover:text-blue-400 transition-colors">
                    {action.title}
                  </h3>
                </div>
              </div>
              
              <p className="text-slate-300 mb-4 leading-relaxed">
                {action.description}
              </p>
              
              <div className="space-y-2">
                {action.features.map((feature, index) => (
                  <div key={index} className="flex items-center text-sm text-slate-400">
                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2"></div>
                    {feature}
                  </div>
                ))}
              </div>
              
              <div className="mt-4 pt-4 border-t border-slate-700/50">
                <span className="text-blue-400 text-sm font-medium group-hover:text-blue-300 transition-colors">
                  Open Section →
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* System Info */}
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
        <h3 className="text-xl font-semibold text-white mb-4">System Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-3">
              <Activity className="w-8 h-8 text-white" />
            </div>
            <p className="text-slate-300 font-medium">System Health</p>
            <p className="text-green-400 text-sm">Excellent</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-3">
              <HardDrive className="w-8 h-8 text-white" />
            </div>
            <p className="text-slate-300 font-medium">Storage Usage</p>
            <p className="text-blue-400 text-sm">64% of 2TB</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-3">
              <Server className="w-8 h-8 text-white" />
            </div>
            <p className="text-slate-300 font-medium">Uptime</p>
            <p className="text-purple-400 text-sm">99.98%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;