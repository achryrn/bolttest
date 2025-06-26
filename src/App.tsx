import React, { useState } from 'react';
import Navigation from './components/Navigation';
import HomePage from './components/HomePage';
import FilesTab from './components/FilesTab';
import ServerStatus from './components/ServerStatus';
import MoviesTab from './components/MoviesTab';

type TabType = 'home' | 'files' | 'servers' | 'movies';

function App() {
  const [activeTab, setActiveTab] = useState<TabType>('home');

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <HomePage onTabChange={setActiveTab} />;
      case 'files':
        return <FilesTab />;
      case 'servers':
        return <ServerStatus />;
      case 'movies':
        return <MoviesTab />;
      default:
        return <HomePage onTabChange={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="flex">
        <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
        <main className="flex-1 lg:ml-64">
          <div className="p-4 lg:p-8">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;