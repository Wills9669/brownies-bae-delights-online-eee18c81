
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, Phone } from 'lucide-react';
import Cart from './Cart';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { pathname } = useLocation();

  const isActive = (path: string) => {
    return pathname === path;
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <span className="logo-text-black text-xl">Brownies</span>
              <span className="logo-text-pink text-2xl ml-1">Bae</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`font-medium hover:text-pink-dark transition-colors ${
                isActive('/') ? 'text-pink-dark' : 'text-gray-800'
              }`}
            >
              Home
            </Link>
            <Link
              to="/brownies"
              className={`font-medium hover:text-pink-dark transition-colors ${
                isActive('/brownies') ? 'text-pink-dark' : 'text-gray-800'
              }`}
            >
              Brownies
            </Link>
            <Link
              to="/cakes"
              className={`font-medium hover:text-pink-dark transition-colors ${
                isActive('/cakes') ? 'text-pink-dark' : 'text-gray-800'
              }`}
            >
              Cakes
            </Link>
            <Link
              to="/about"
              className={`font-medium hover:text-pink-dark transition-colors ${
                isActive('/about') ? 'text-pink-dark' : 'text-gray-800'
              }`}
            >
              About
            </Link>
            <Link
              to="/contact"
              className={`font-medium hover:text-pink-dark transition-colors ${
                isActive('/contact') ? 'text-pink-dark' : 'text-gray-800'
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* Contact & Cart */}
          <div className="hidden md:flex items-center space-x-4">
            <a href="tel:9585329788" className="flex items-center text-gray-700 hover:text-pink-dark transition-colors">
              <Phone size={18} className="mr-2" />
              <span className="font-medium">9585329788</span>
            </a>
            <Cart />
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center space-x-3">
            <Cart />
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="container mx-auto px-4 py-3 space-y-1">
            <Link
              to="/"
              className={`block py-2 px-3 rounded-md ${
                isActive('/') ? 'bg-pink-light text-pink-dark' : 'text-gray-800 hover:bg-gray-100'
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/brownies"
              className={`block py-2 px-3 rounded-md ${
                isActive('/brownies') ? 'bg-pink-light text-pink-dark' : 'text-gray-800 hover:bg-gray-100'
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Brownies
            </Link>
            <Link
              to="/cakes"
              className={`block py-2 px-3 rounded-md ${
                isActive('/cakes') ? 'bg-pink-light text-pink-dark' : 'text-gray-800 hover:bg-gray-100'
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Cakes
            </Link>
            <Link
              to="/about"
              className={`block py-2 px-3 rounded-md ${
                isActive('/about') ? 'bg-pink-light text-pink-dark' : 'text-gray-800 hover:bg-gray-100'
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link
              to="/contact"
              className={`block py-2 px-3 rounded-md ${
                isActive('/contact') ? 'bg-pink-light text-pink-dark' : 'text-gray-800 hover:bg-gray-100'
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
            <div className="py-2 px-3">
              <a href="tel:9585329788" className="flex items-center text-gray-700 hover:text-pink-dark transition-colors">
                <Phone size={18} className="mr-2" />
                <span className="font-medium">9585329788</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
