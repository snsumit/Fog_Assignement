import React, { useState } from 'react';
import { RiMenu3Line, RiCloseLine, RiUser3Line, RiSearchLine, RiHeartLine, RiShoppingCartLine } from 'react-icons/ri';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md">
      {/* Desktop Navbar */}
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Left - Logo and Brand */}
          <div className="flex items-center ">
            <img 
              src="./logo.png" 
              alt="Logo" 
              className="h-12 w-auto"
            />
            <span className="text-lg font-bold hidden -ml-2 sm:block">Furniro</span>
          </div>

          {/* Center - Navigation Links (Hidden on Mobile) */}
          <div className="hidden md:flex items-center gap-8">
            <a href="/" className="text-gray-700 hover:text-gray-900 transition-colors">
              Home
            </a>
            <a href="/shop" className="text-gray-700 hover:text-gray-900 transition-colors">
              Shop
            </a>
            <a href="/about" className="text-gray-700 hover:text-gray-900 transition-colors">
              About
            </a>
            <a href="/contact" className="text-gray-700 hover:text-gray-900 transition-colors">
              Contact
            </a>
          </div>

          {/* Right - Icons */}
          <div className="flex items-center gap-4">
            {/* Icons (Hidden on Mobile except Cart) */}
            <div className="hidden sm:flex items-center gap-4">
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <RiUser3Line className="text-xl" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <RiSearchLine className="text-xl" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <RiHeartLine className="text-xl" />
              </button>
            </div>
            
            {/* Cart Icon (Always Visible) */}
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <RiShoppingCartLine className="text-xl" />
            </button>

            {/* Mobile Menu Button */}
            <button 
              className="p-2 md:hidden hover:bg-gray-100 rounded-full transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <RiCloseLine className="text-2xl" />
              ) : (
                <RiMenu3Line className="text-2xl" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`
        md:hidden fixed inset-0 bg-white z-50 transition-transform duration-300 ease-in-out
        ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}
      `}>
        <div className="container mx-auto px-4 py-6">
          {/* Close Button */}
          <button 
            className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            <RiCloseLine className="text-2xl" />
          </button>

          {/* Mobile Navigation Links */}
          <div className="flex flex-col gap-6 mt-12">
            <a 
              href="/" 
              className="text-lg text-gray-700 hover:text-gray-900 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </a>
            <a 
              href="/shop" 
              className="text-lg text-gray-700 hover:text-gray-900 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Shop
            </a>
            <a 
              href="/about" 
              className="text-lg text-gray-700 hover:text-gray-900 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </a>
            <a 
              href="/contact" 
              className="text-lg text-gray-700 hover:text-gray-900 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </a>
          </div>

          {/* Mobile Icons */}
          <div className="flex justify-around mt-8">
            <button className="p-3 hover:bg-gray-100 rounded-full transition-colors">
              <RiUser3Line className="text-2xl" />
            </button>
            <button className="p-3 hover:bg-gray-100 rounded-full transition-colors">
              <RiSearchLine className="text-2xl" />
            </button>
            <button className="p-3 hover:bg-gray-100 rounded-full transition-colors">
              <RiHeartLine className="text-2xl" />
            </button>
            <button className="p-3 hover:bg-gray-100 rounded-full transition-colors">
              <RiShoppingCartLine className="text-2xl" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;