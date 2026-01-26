import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50 w-full">
      <div className="max-w-7xl mx-auto px-5 flex justify-between items-center h-[70px]">
        <Link to="/" className="text-2xl font-bold text-indigo-600 flex items-center transition-colors hover:text-indigo-700">
          🚀 Startup School
        </Link>

        <div className={`${isMenuOpen ? 'left-0' : '-left-full'} md:flex md:static md:flex-row md:gap-2.5 fixed left-[-100%] top-[70px] flex-col bg-white w-full text-center transition-all duration-300 shadow-lg md:shadow-none py-5 md:py-0 items-center`}>
          <Link 
            to="/" 
            className={`${isActive('/') ? 'text-indigo-600 bg-indigo-50' : 'text-gray-800'} no-underline px-5 py-2.5 rounded-md font-medium transition-all hover:text-indigo-600 hover:bg-gray-100 w-full md:w-auto md:py-2.5`}
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link 
            to="/about" 
            className={`${isActive('/about') ? 'text-indigo-600 bg-indigo-50' : 'text-gray-800'} no-underline px-5 py-2.5 rounded-md font-medium transition-all hover:text-indigo-600 hover:bg-gray-100 w-full md:w-auto md:py-2.5`}
            onClick={() => setIsMenuOpen(false)}
          >
            About
          </Link>
          <Link 
            to="/courses" 
            className={`${isActive('/courses') ? 'text-indigo-600 bg-indigo-50' : 'text-gray-800'} no-underline px-5 py-2.5 rounded-md font-medium transition-all hover:text-indigo-600 hover:bg-gray-100 w-full md:w-auto md:py-2.5`}
            onClick={() => setIsMenuOpen(false)}
          >
            Courses
          </Link>
          <Link 
            to="/blog" 
            className={`${isActive('/blog') ? 'text-indigo-600 bg-indigo-50' : 'text-gray-800'} no-underline px-5 py-2.5 rounded-md font-medium transition-all hover:text-indigo-600 hover:bg-gray-100 w-full md:w-auto md:py-2.5`}
            onClick={() => setIsMenuOpen(false)}
          >
            Blog
          </Link>
          <Link 
            to="/contact" 
            className={`${isActive('/contact') ? 'text-indigo-600 bg-indigo-50' : 'text-gray-800'} no-underline px-5 py-2.5 rounded-md font-medium transition-all hover:text-indigo-600 hover:bg-gray-100 w-full md:w-auto md:py-2.5`}
            onClick={() => setIsMenuOpen(false)}
          >
            Contact
          </Link>
        </div>

        <div className="md:hidden flex flex-col cursor-pointer gap-1.5" onClick={toggleMenu}>
          <span className="w-6 h-0.5 bg-gray-800 transition-all rounded"></span>
          <span className="w-6 h-0.5 bg-gray-800 transition-all rounded"></span>
          <span className="w-6 h-0.5 bg-gray-800 transition-all rounded"></span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
