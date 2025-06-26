import React, { useState } from 'react';
import { Server, Plus, Trash2, RefreshCw, AlertCircle, CheckCircle, Clock, Settings } from 'lucide-react';

interface ServerInfo {
  id: string;
  name: string;
  url: string;
  status: 'online' | 'offline' | 'checking';
  lastChecked: string;
  responseTime?: number;
  description?: string;
}

const ServerStatus: React.FC = () => {
  const [servers, setServers] = useState<ServerInfo[]>([
    {
      id: '1',
      name: 'Main Web Server',
      url: 'https://example.com',
      status: 'online',
      lastChecked: '2 minutes ago',
      responseTime: 145,
      description: 'Primary website server'
    },
    {
      id: '2',
      name: 'API Server',
      url: 'https://api.example.com',
      status: 'online',
      lastChecked: '1 minute ago',
      responseTime: 89,
      description: 'Backend API services'
    },
    {
      id: '3',
      name: 'Database Server',
      url: 'https://db.example.com',
      status: 'offline',
      lastChecked: '5 minutes ago',
      description: 'Main database instance'
    },
    {
      id: '4',
      name: 'CDN Server',
      url: 'https://cdn.example.com',
      status: 'checking',
      lastChecked: 'Checking...',
      description: 'Content delivery network'
    }
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [newServer, setNewServer] = useState({
    name: '',
    url: '',
    description: ''
  });

  const getStatusIcon = (status: ServerInfo['status']) => {
    switch (status) {
      case 'online':
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'offline':
        return <AlertCircle className="w-5 h-5 text-red-400" />;
      case 'checking':
        return <Clock className="w-5 h-5 text-yellow-400 animate-spin" />;
    }
  };

  const getStatusColor = (status: ServerInfo['status']) => {
    switch (status) {
      case 'online':
        return 'border-green-500/50 bg-green-500/10';
      case 'offline':
        return 'border-red-500/50 bg-red-500/10';
      case 'checking':
        return 'border-yellow-500/50 bg-yellow-500/10';
    }
  };

  const handleAddServer = () => {
    if (newServer.name && newServer.url) {
      const server: ServerInfo = {
        id: Date.now().toString(),
        name: newServer.name,
        url: newServer.url,
        description: newServer.description,
        status: 'checking',
        lastChecked: 'Just added'
      };
      
      setServers([...servers, server]);
      setNewServer({ name: '', url: '', description: '' });
      setShowAddModal(false);
      
      // Simulate status check
      setTimeout(() => {
        setServers(prev => prev.map(s => 
          s.id === server.id 
            ? { ...s, status: Math.random() > 0.3 ? 'online' : 'offline', responseTime: Math.floor(Math.random() * 300) + 50 }
            : s
        ));
      }, 2000);
    }
  };

  const handleDeleteServer = (id: string) => {
    setServers(servers.filter(s => s.id !== id));
  };

  const handleRefreshServer = (id: string) => {
    setServers(prev => prev.map(s => 
      s.id === id ? { ...s, status: 'checking', lastChecked: 'Checking...' } : s
    ));
    
    setTimeout(() => {
      setServers(prev => prev.map(s => 
        s.id === id 
          ? { 
              ...s, 
              status: Math.random() > 0.2 ? 'online' : 'offline',
              lastChecked: 'Just now',
              responseTime: Math.floor(Math.random() * 300) + 50
            }
          : s
      ));
    }, 1500);
  };

  const onlineServers = servers.filter(s => s.status === 'online').length;
  const offlineServers = servers.filter(s => s.status === 'offline').length;
  const checkingServers = servers.filter(s => s.status === 'checking').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Server Status</h1>
          <p className="text-slate-400">Monitor your server infrastructure in real-time</p>
        </div>
        
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
        >
          <Plus size={16} />
          <span>Add Server</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-white mb-1">{onlineServers}</h3>
          <p className="text-slate-400 text-sm">Online Servers</p>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-gradient-to-r from-red-500 to-pink-500 rounded-lg">
              <AlertCircle className="w-6 h-6 text-white" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-white mb-1">{offlineServers}</h3>
          <p className="text-slate-400 text-sm">Offline Servers</p>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg">
              <Clock className="w-6 h-6 text-white" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-white mb-1">{checkingServers}</h3>
          <p className="text-slate-400 text-sm">Checking Status</p>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg">
              <Server className="w-6 h-6 text-white" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-white mb-1">{servers.length}</h3>
          <p className="text-slate-400 text-sm">Total Servers</p>
        </div>
      </div>

      {/* Server List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {servers.map((server) => (
          <div
            key={server.id}
            className={`bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border transition-all duration-300 ${getStatusColor(server.status)}`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                {getStatusIcon(server.status)}
                <div>
                  <h3 className="text-xl font-semibold text-white">{server.name}</h3>
                  <p className="text-slate-400 text-sm">{server.url}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleRefreshServer(server.id)}
                  className="p-2 text-slate-400 hover:text-white transition-colors"
                  disabled={server.status === 'checking'}
                >
                  <RefreshCw size={16} className={server.status === 'checking' ? 'animate-spin' : ''} />
                </button>
                <button
                  onClick={() => handleDeleteServer(server.id)}
                  className="p-2 text-slate-400 hover:text-red-400 transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
            
            {server.description && (
              <p className="text-slate-300 text-sm mb-4">{server.description}</p>
            )}
            
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-400">Last checked: {server.lastChecked}</span>
              {server.responseTime && (
                <span className="text-slate-400">Response: {server.responseTime}ms</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Add Server Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 rounded-xl p-6 max-w-md w-full">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-white">Add New Server</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-white"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Server Name
                </label>
                <input
                  type="text"
                  value={newServer.name}
                  onChange={(e) => setNewServer({ ...newServer, name: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none"
                  placeholder="My Server"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Server URL
                </label>
                <input
                  type="url"
                  value={newServer.url}
                  onChange={(e) => setNewServer({ ...newServer, url: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none"
                  placeholder="https://example.com"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Description (Optional)
                </label>
                <textarea
                  value={newServer.description}
                  onChange={(e) => setNewServer({ ...newServer, description: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none"
                  placeholder="Server description..."
                  rows={3}
                />
              </div>
            </div>
            
            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddServer}
                className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                Add Server
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServerStatus;