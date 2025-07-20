import React from 'react';
import { LogOut, User, Home, Info, Play } from 'lucide-react';

export default function Header({ user, onLogout, currentPage, onNavigate }) {
  return (
    <div className="bg-white shadow-sm border-b border-gray-200 mb-6">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">RS</span>
          </div>
          <button 
            onClick={() => onNavigate('demo')}
            className="font-semibold text-gray-800 hover:text-indigo-600 transition-colors"
          >
            ReturnShield AI
          </button>
        </div>
        
        {/* Navigation Menu */}
        <div className="flex items-center space-x-6">
          <button
            onClick={() => onNavigate('demo')}
            className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-all duration-200 ${
              currentPage === 'demo' 
                ? 'bg-indigo-100 text-indigo-600' 
                : 'text-gray-600 hover:text-indigo-600 hover:bg-indigo-50'
            }`}
          >
            <Home className="w-4 h-4" />
            <span className="text-sm font-medium">Home</span>
          </button>
          
          <button
            onClick={() => onNavigate('about')}
            className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-all duration-200 ${
              currentPage === 'about' 
                ? 'bg-indigo-100 text-indigo-600' 
                : 'text-gray-600 hover:text-indigo-600 hover:bg-indigo-50'
            }`}
          >
            <Info className="w-4 h-4" />
            <span className="text-sm font-medium">About</span>
          </button>
          
          <button
            onClick={() => onNavigate('live-demo')}
            className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-all duration-200 ${
              currentPage === 'live-demo' 
                ? 'bg-green-100 text-green-600' 
                : 'text-gray-600 hover:text-green-600 hover:bg-green-50'
            }`}
          >
            <Play className="w-4 h-4" />
            <span className="text-sm font-medium">Live Demo</span>
          </button>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-gray-600">
            <User className="w-4 h-4" />
            <span className="text-sm">Welcome, {user.name}</span>
          </div>
          
          <button
            onClick={onLogout}
            className="flex items-center space-x-1 px-3 py-2 text-sm text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
}