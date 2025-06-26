import React, { useState } from 'react';
import { Film, ExternalLink, Plus, Trash2, Edit3, Star } from 'lucide-react';

interface MovieLink {
  id: string;
  name: string;
  url: string;
  description: string;
  category: string;
  rating?: number;
}

const MoviesTab: React.FC = () => {
  const [movieLinks, setMovieLinks] = useState<MovieLink[]>([
    {
      id: '1',
      name: 'Netflix',
      url: 'https://netflix.com',
      description: 'Stream your favorite movies and TV shows',
      category: 'Streaming Service',
      rating: 4.5
    },
    {
      id: '2',
      name: 'Plex Server',
      url: 'http://localhost:32400',
      description: 'Personal media server with local content',
      category: 'Local Server',
      rating: 4.8
    },
    {
      id: '3',
      name: 'YouTube Movies',
      url: 'https://youtube.com/movies',
      description: 'Rent or buy movies on YouTube',
      category: 'Digital Store',
      rating: 4.2
    },
    {
      id: '4',
      name: 'IMDb',
      url: 'https://imdb.com',
      description: 'Movie database and reviews',
      category: 'Information',
      rating: 4.7
    }
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [editingLink, setEditingLink] = useState<MovieLink | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    url: '',
    description: '',
    category: '',
    rating: 0
  });

  const categories = ['Streaming Service', 'Local Server', 'Digital Store', 'Information', 'Other'];

  const handleAddLink = () => {
    if (formData.name && formData.url) {
      const newLink: MovieLink = {
        id: Date.now().toString(),
        name: formData.name,
        url: formData.url,
        description: formData.description,
        category: formData.category || 'Other',
        rating: formData.rating
      };
      
      setMovieLinks([...movieLinks, newLink]);
      resetForm();
    }
  };

  const handleEditLink = () => {
    if (editingLink && formData.name && formData.url) {
      setMovieLinks(movieLinks.map(link => 
        link.id === editingLink.id 
          ? { ...editingLink, ...formData }
          : link
      ));
      resetForm();
    }
  };

  const handleDeleteLink = (id: string) => {
    setMovieLinks(movieLinks.filter(link => link.id !== id));
  };

  const startEdit = (link: MovieLink) => {
    setEditingLink(link);
    setFormData({
      name: link.name,
      url: link.url,
      description: link.description,
      category: link.category,
      rating: link.rating || 0
    });
    setShowAddModal(true);
  };

  const resetForm = () => {
    setFormData({ name: '', url: '', description: '', category: '', rating: 0 });
    setEditingLink(null);
    setShowAddModal(false);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Streaming Service':
        return 'from-red-500 to-pink-500';
      case 'Local Server':
        return 'from-blue-500 to-cyan-500';
      case 'Digital Store':
        return 'from-green-500 to-emerald-500';
      case 'Information':
        return 'from-yellow-500 to-orange-500';
      default:
        return 'from-purple-500 to-indigo-500';
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={16}
        className={`${
          i < Math.floor(rating) 
            ? 'text-yellow-400 fill-current' 
            : i < rating 
              ? 'text-yellow-400 fill-current opacity-50'
              : 'text-slate-400'
        }`}
      />
    ));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Movie Portal</h1>
          <p className="text-slate-400">Quick access to your movie collection and streaming services</p>
        </div>
        
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
        >
          <Plus size={16} />
          <span>Add Link</span>
        </button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.slice(0, 4).map((category) => {
          const count = movieLinks.filter(link => link.category === category).length;
          return (
            <div key={category} className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 bg-gradient-to-r ${getCategoryColor(category)} rounded-lg`}>
                  <Film className="w-6 h-6 text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">{count}</h3>
              <p className="text-slate-400 text-sm">{category}</p>
            </div>
          );
        })}
      </div>

      {/* Movie Links Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {movieLinks.map((link) => (
          <div
            key={link.id}
            className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 hover:border-slate-600 transition-all duration-300 hover:transform hover:scale-105 group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`p-3 bg-gradient-to-r ${getCategoryColor(link.category)} rounded-lg`}>
                <Film className="w-6 h-6 text-white" />
              </div>
              
              <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => startEdit(link)}
                  className="p-2 text-slate-400 hover:text-blue-400 transition-colors"
                >
                  <Edit3 size={16} />
                </button>
                <button
                  onClick={() => handleDeleteLink(link.id)}
                  className="p-2 text-slate-400 hover:text-red-400 transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
            
            <h3 className="text-xl font-semibold text-white mb-2">{link.name}</h3>
            <p className="text-slate-300 text-sm mb-3 leading-relaxed">{link.description}</p>
            
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs text-slate-400 bg-slate-700/50 px-2 py-1 rounded">
                {link.category}
              </span>
              {link.rating && link.rating > 0 && (
                <div className="flex items-center space-x-1">
                  {renderStars(link.rating)}
                </div>
              )}
            </div>
            
            <button
              onClick={() => window.open(link.url, '_blank')}
              className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              <ExternalLink size={16} />
              <span>Open Link</span>
            </button>
          </div>
        ))}
      </div>

      {/* Add/Edit Link Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 rounded-xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-white">
                {editingLink ? 'Edit Link' : 'Add New Link'}
              </h3>
              <button
                onClick={resetForm}
                className="text-slate-400 hover:text-white"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none"
                  placeholder="Netflix, Plex, etc."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  URL
                </label>
                <input
                  type="url"
                  value={formData.url}
                  onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none"
                  placeholder="https://example.com"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none"
                  placeholder="Brief description..."
                  rows={3}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                >
                  <option value="">Select category</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Rating (Optional)
                </label>
                <input
                  type="number"
                  min="0"
                  max="5"
                  step="0.1"
                  value={formData.rating}
                  onChange={(e) => setFormData({ ...formData, rating: parseFloat(e.target.value) || 0 })}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none"
                  placeholder="4.5"
                />
              </div>
            </div>
            
            <div className="flex space-x-3 mt-6">
              <button
                onClick={resetForm}
                className="flex-1 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={editingLink ? handleEditLink : handleAddLink}
                className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                {editingLink ? 'Update' : 'Add'} Link
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MoviesTab;