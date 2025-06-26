import React, { useState } from 'react';
import { FolderOpen, File, Download, Eye, Upload, Search, Grid, List, ArrowLeft, FileText, Image, Music, Video, Archive } from 'lucide-react';

interface FileItem {
  id: string;
  name: string;
  type: 'file' | 'folder';
  size?: string;
  modified: string;
  extension?: string;
}

const FilesTab: React.FC = () => {
  const [currentPath, setCurrentPath] = useState('/home');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFile, setSelectedFile] = useState<FileItem | null>(null);
  
  // Mock file data
  const [files] = useState<FileItem[]>([
    { id: '1', name: 'Documents', type: 'folder', modified: '2024-01-15' },
    { id: '2', name: 'Images', type: 'folder', modified: '2024-01-14' },
    { id: '3', name: 'Videos', type: 'folder', modified: '2024-01-13' },
    { id: '4', name: 'presentation.pdf', type: 'file', size: '2.4 MB', modified: '2024-01-12', extension: 'pdf' },
    { id: '5', name: 'report.docx', type: 'file', size: '1.8 MB', modified: '2024-01-11', extension: 'docx' },
    { id: '6', name: 'photo.jpg', type: 'file', size: '3.2 MB', modified: '2024-01-10', extension: 'jpg' },
    { id: '7', name: 'music.mp3', type: 'file', size: '4.1 MB', modified: '2024-01-09', extension: 'mp3' },
    { id: '8', name: 'video.mp4', type: 'file', size: '12.5 MB', modified: '2024-01-08', extension: 'mp4' }
  ]);

  const getFileIcon = (item: FileItem) => {
    if (item.type === 'folder') return FolderOpen;
    
    const ext = item.extension?.toLowerCase();
    switch (ext) {
      case 'pdf':
      case 'doc':
      case 'docx':
      case 'txt':
        return FileText;
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
      case 'svg':
        return Image;
      case 'mp3':
      case 'wav':
      case 'flac':
        return Music;
      case 'mp4':
      case 'avi':
      case 'mov':
        return Video;
      case 'zip':
      case 'rar':
      case '7z':
        return Archive;
      default:
        return File;
    }
  };

  const getFileColor = (item: FileItem) => {
    if (item.type === 'folder') return 'text-blue-400';
    
    const ext = item.extension?.toLowerCase();
    switch (ext) {
      case 'pdf':
      case 'doc':
      case 'docx':
      case 'txt':
        return 'text-red-400';
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
      case 'svg':
        return 'text-green-400';
      case 'mp3':
      case 'wav':
      case 'flac':
        return 'text-purple-400';
      case 'mp4':
      case 'avi':
      case 'mov':
        return 'text-pink-400';
      case 'zip':
      case 'rar':
      case '7z':
        return 'text-yellow-400';
      default:
        return 'text-slate-400';
    }
  };

  const filteredFiles = files.filter(file =>
    file.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDownload = (file: FileItem) => {
    // Mock download functionality
    console.log(`Downloading ${file.name}`);
    // In a real app, this would trigger an actual download
  };

  const handlePreview = (file: FileItem) => {
    setSelectedFile(file);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">File Manager</h1>
          <div className="flex items-center space-x-2 text-slate-400">
            <button
              onClick={() => setCurrentPath('/home')}
              className="hover:text-white transition-colors"
            >
              <ArrowLeft size={16} />
            </button>
            <span className="text-sm">{currentPath}</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search files..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none"
            />
          </div>
          
          <div className="flex items-center space-x-2 bg-slate-800/50 rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}
            >
              <Grid size={16} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}
            >
              <List size={16} />
            </button>
          </div>
          
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
            <Upload size={16} />
            <span>Upload</span>
          </button>
        </div>
      </div>

      {/* File Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {filteredFiles.map((file) => {
            const Icon = getFileIcon(file);
            const colorClass = getFileColor(file);
            
            return (
              <div
                key={file.id}
                className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-4 border border-slate-700/50 hover:border-slate-600 transition-all duration-300 hover:transform hover:scale-105 group"
              >
                <div className="flex flex-col items-center text-center">
                  <Icon className={`w-12 h-12 ${colorClass} mb-3`} />
                  <h3 className="text-white font-medium text-sm mb-1 truncate w-full">{file.name}</h3>
                  <p className="text-slate-400 text-xs mb-3">
                    {file.type === 'file' ? file.size : 'Folder'} • {file.modified}
                  </p>
                  
                  {file.type === 'file' && (
                    <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => handlePreview(file)}
                        className="p-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs"
                      >
                        <Eye size={12} />
                      </button>
                      <button
                        onClick={() => handleDownload(file)}
                        className="p-1.5 bg-green-600 hover:bg-green-700 text-white rounded text-xs"
                      >
                        <Download size={12} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg border border-slate-700/50 overflow-hidden">
          <div className="grid grid-cols-12 gap-4 p-4 border-b border-slate-700/50 text-slate-400 text-sm font-medium">
            <div className="col-span-6">Name</div>
            <div className="col-span-2">Size</div>
            <div className="col-span-2">Modified</div>
            <div className="col-span-2">Actions</div>
          </div>
          
          {filteredFiles.map((file) => {
            const Icon = getFileIcon(file);
            const colorClass = getFileColor(file);
            
            return (
              <div
                key={file.id}
                className="grid grid-cols-12 gap-4 p-4 border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors"
              >
                <div className="col-span-6 flex items-center space-x-3">
                  <Icon className={`w-5 h-5 ${colorClass}`} />
                  <span className="text-white font-medium truncate">{file.name}</span>
                </div>
                <div className="col-span-2 text-slate-400 text-sm flex items-center">
                  {file.type === 'file' ? file.size : 'Folder'}
                </div>
                <div className="col-span-2 text-slate-400 text-sm flex items-center">
                  {file.modified}
                </div>
                <div className="col-span-2 flex items-center space-x-2">
                  {file.type === 'file' && (
                    <>
                      <button
                        onClick={() => handlePreview(file)}
                        className="p-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs"
                      >
                        <Eye size={12} />
                      </button>
                      <button
                        onClick={() => handleDownload(file)}
                        className="p-1.5 bg-green-600 hover:bg-green-700 text-white rounded text-xs"
                      >
                        <Download size={12} />
                      </button>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* File Preview Modal */}
      {selectedFile && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 rounded-xl p-6 max-w-2xl w-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-white">{selectedFile.name}</h3>
              <button
                onClick={() => setSelectedFile(null)}
                className="text-slate-400 hover:text-white"
              >
                ×
              </button>
            </div>
            
            <div className="bg-slate-900 rounded-lg p-8 text-center">
              <div className={`w-16 h-16 ${getFileColor(selectedFile)} mx-auto mb-4`}>
                {React.createElement(getFileIcon(selectedFile), { size: 64 })}
              </div>
              <p className="text-slate-300 mb-4">Preview not available for this file type</p>
              <button
                onClick={() => handleDownload(selectedFile)}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg mx-auto"
              >
                <Download size={16} />
                <span>Download File</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilesTab;