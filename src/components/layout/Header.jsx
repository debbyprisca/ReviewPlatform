import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Shield, Menu, X, Search, LogIn, BarChart3 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import WalletButton from '../auth/WalletButton';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);
  
  const isActive = (path) => location.pathname === path;
  
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Shield className="w-8 h-8 text-primary-600" />
            <span className="text-xl font-bold text-gray-900">Trust Seal</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`text-sm font-medium transition-colors duration-200 ${
                isActive('/') ? 'text-primary-600' : 'text-gray-700 hover:text-primary-600'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/institutions" 
              className={`text-sm font-medium transition-colors duration-200 ${
                isActive('/institutions') ? 'text-primary-600' : 'text-gray-700 hover:text-primary-600'
              }`}
            >
              Institutions
            </Link>
            {isAuthenticated && (
              <Link 
                to="/analytics" 
                className={`text-sm font-medium transition-colors duration-200 ${
                  isActive('/analytics') ? 'text-primary-600' : 'text-gray-700 hover:text-primary-600'
                }`}
              >
                <div className="flex items-center">
                  <BarChart3 className="w-4 h-4 mr-1" />
                  Analytics
                </div>
              </Link>
            )}
            {/* <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search institutions..."
                className="pl-10 pr-4 py-1.5 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 w-48 focus:w-64"
              />
            </div> */}
          </nav>
          
          {/* Desktop Auth */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <Link
                to="/profile"
                className="flex items-center space-x-2 hover:opacity-90 transition-opacity"
              >
                <img
                  src={user?.avatarUrl}
                  alt="Profile"
                  className="w-8 h-8 rounded-full object-cover border-2 border-primary-100"
                />
                <span className="font-medium text-sm">{user?.username}</span>
              </Link>
            ) : (
              <WalletButton />
            )}
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden flex items-center"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-gray-700" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 animate-fade-in">
          <div className="container-custom py-4 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search institutions..."
                className="pl-10 pr-4 py-2 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent w-full"
              />
            </div>
            <nav className="flex flex-col space-y-3">
              <Link 
                to="/" 
                className={`text-sm font-medium py-2 transition-colors duration-200 ${
                  isActive('/') ? 'text-primary-600' : 'text-gray-700'
                }`}
                onClick={closeMenu}
              >
                Home
              </Link>
              <Link 
                to="/institutions" 
                className={`text-sm font-medium py-2 transition-colors duration-200 ${
                  isActive('/institutions') ? 'text-primary-600' : 'text-gray-700'
                }`}
                onClick={closeMenu}
              >
                Institutions
              </Link>
              {isAuthenticated && (
                <>
                  <Link 
                    to="/analytics" 
                    className={`text-sm font-medium py-2 transition-colors duration-200 ${
                      isActive('/analytics') ? 'text-primary-600' : 'text-gray-700'
                    }`}
                    onClick={closeMenu}
                  >
                    <div className="flex items-center">
                      <BarChart3 className="w-4 h-4 mr-1" />
                      Analytics
                    </div>
                  </Link>
                  <Link 
                    to="/profile" 
                    className={`text-sm font-medium py-2 transition-colors duration-200 ${
                      isActive('/profile') ? 'text-primary-600' : 'text-gray-700'
                    }`}
                    onClick={closeMenu}
                  >
                    My Profile
                  </Link>
                </>
              )}
              {!isAuthenticated && (
                <div className="pt-2">
                  <WalletButton fullWidth onClick={closeMenu} />
                </div>
              )}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;