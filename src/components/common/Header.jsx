import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-gray-900">MediHelp</h1>
          </div>
          <nav className="flex space-x-4">
            <NavLink to="/" className={({isActive}) => `text-gray-600 hover:text-gray-900 ${isActive ? 'font-semibold text-gray-900' : ''}`}>Home</NavLink>
            <NavLink to="/summarize" className={({isActive}) => `text-gray-600 hover:text-gray-900 ${isActive ? 'font-semibold text-gray-900' : ''}`}>Summarize</NavLink>
            <NavLink to="/upload" className={({isActive}) => `text-gray-600 hover:text-gray-900 ${isActive ? 'font-semibold text-gray-900' : ''}`}>Upload</NavLink>
            <NavLink to="/history" className={({isActive}) => `text-gray-600 hover:text-gray-900 ${isActive ? 'font-semibold text-gray-900' : ''}`}>History</NavLink>
            <NavLink to="/about" className={({isActive}) => `text-gray-600 hover:text-gray-900 ${isActive ? 'font-semibold text-gray-900' : ''}`}>About</NavLink>
            <NavLink to="/help" className={({isActive}) => `text-gray-600 hover:text-gray-900 ${isActive ? 'font-semibold text-gray-900' : ''}`}>Help</NavLink>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;