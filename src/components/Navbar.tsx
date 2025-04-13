
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ShoppingCart, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md py-3 px-4 md:px-8">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <div className="text-2xl md:text-3xl">
            <span className="logo-text-black">Brownies</span>
            <span className="logo-text-pink">Bae</span>
          </div>
        </Link>
        
        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="font-medium hover:text-pink-dark transition-colors">Home</Link>
          <Link to="/brownies" className="font-medium hover:text-pink-dark transition-colors">Brownies</Link>
          <Link to="/cakes" className="font-medium hover:text-pink-dark transition-colors">Cakes</Link>
          <Link to="/about" className="font-medium hover:text-pink-dark transition-colors">About</Link>
          <Link to="/contact" className="font-medium hover:text-pink-dark transition-colors">Contact</Link>
        </div>

        <div className="flex items-center gap-4">
          <a href="tel:9585329788" className="hidden md:flex items-center gap-2 text-pink-dark">
            <Phone size={18} />
            <span className="font-medium">9585329788</span>
          </a>
          <Link to="/cart">
            <Button variant="outline" size="icon" className="rounded-full">
              <ShoppingCart className="h-5 w-5" />
            </Button>
          </Link>
          <button onClick={toggleMenu} className="md:hidden">
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg py-4 px-6">
          <div className="flex flex-col space-y-3">
            <Link to="/" className="font-medium py-2 hover:text-pink-dark" onClick={toggleMenu}>Home</Link>
            <Link to="/brownies" className="font-medium py-2 hover:text-pink-dark" onClick={toggleMenu}>Brownies</Link>
            <Link to="/cakes" className="font-medium py-2 hover:text-pink-dark" onClick={toggleMenu}>Cakes</Link>
            <Link to="/about" className="font-medium py-2 hover:text-pink-dark" onClick={toggleMenu}>About</Link>
            <Link to="/contact" className="font-medium py-2 hover:text-pink-dark" onClick={toggleMenu}>Contact</Link>
            <a href="tel:9585329788" className="flex items-center gap-2 py-2 text-pink-dark">
              <Phone size={18} />
              <span className="font-medium">9585329788</span>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
