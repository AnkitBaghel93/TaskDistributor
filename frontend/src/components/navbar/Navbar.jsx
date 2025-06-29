import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  const linkClass = 'relative px-2 py-1 hover:text-blue-600 transition duration-200';
  const activeClass = 'text-blue-600 font-semibold after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-blue-600 after:rounded';


  return (
    <nav className="bg-white shadow-lg z-50 relative">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <div className="text-2xl font-extrabold bg-gradient-to-r from-blue-700 via-purple-500 to-cyan-500 text-transparent bg-clip-text animate-gradient">
          CSTech InfoSolutions
          </div>

          {/* Hamburger */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-700 focus:outline-none"
              aria-label="Toggle Menu"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
                />
              </svg>
            </button>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-6 items-center text-gray-700 font-medium">
            {[
              { name: 'Home', path: '/' },
              { name: 'About Us', path: '/about-us' },
              { name: 'Signin', path: '/signin' },
              { name: 'Signup', path: '/signup' },
              { name: 'Add Agent', path: '/add-agent' },
              { name: 'Dashboard', path: '/dashboard' }
            ].map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `${linkClass} ${isActive ? activeClass : ''}`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>

        </div>
    </div>



          {/* Mobile Nav */}
          {isOpen && (
            <div className="md:hidden px-4 pb-4 flex flex-col items-center space-y-3 text-center">

              {[
                { name: 'Home', path: '/' },
                { name: 'About Us', path: '/about-us' },
                { name: 'Signin', path: '/signin' },
                { name: 'Signup', path: '/signup' },
                { name: 'Add Agent', path: '/add-agent' },
                { name: 'Dashboard', path: '/dashboard' }
              ].map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `block ${linkClass} ${isActive ? activeClass : ''}`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </div>
          )}


    </nav>
  );
};

export default Navbar;
