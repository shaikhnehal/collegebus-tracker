import React from 'react';
import { FaBus, FaBars } from 'react-icons/fa';

const Header = ({ isMobile, setSidebarOpen }) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gray-900 bg-opacity-80 backdrop-blur-sm px-4 py-3 flex items-center justify-between shadow-lg">
      <div className="flex items-center gap-3">
        {isMobile && (
          <button onClick={() => setSidebarOpen(true)} className="md:hidden focus:outline-none">
            <FaBars className="text-2xl" />
          </button>
        )}
        <h1 className="text-xl font-bold flex items-center gap-2">
          <FaBus className="text-yellow-400" /> Admin Dashboard
        </h1>
      </div>
      <div className="hidden md:block">
        <button className="hover:text-yellow-400 transition">Profile</button>
      </div>
    </header>
  );
};

export default Header;
