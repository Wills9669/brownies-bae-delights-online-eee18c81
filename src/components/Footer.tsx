
import { Link } from 'react-router-dom';
import { Phone, Mail, Clock, Instagram, Facebook } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white pt-12 pb-6 border-t">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="mb-4 text-3xl">
              <span className="logo-text-black">Brownies</span>
              <span className="logo-text-pink">Bae</span>
            </div>
            <p className="text-gray-600 mb-4">
              Indulge in heavenly brownies and delicious cakes made with love and the finest ingredients.
            </p>
            <div className="flex gap-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-pink-dark hover:text-pink transition-colors">
                <Instagram size={24} />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-pink-dark hover:text-pink transition-colors">
                <Facebook size={24} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-600 hover:text-pink-dark transition-colors">Home</Link></li>
              <li><Link to="/brownies" className="text-gray-600 hover:text-pink-dark transition-colors">Brownies</Link></li>
              <li><Link to="/cakes" className="text-gray-600 hover:text-pink-dark transition-colors">Cakes</Link></li>
              <li><Link to="/about" className="text-gray-600 hover:text-pink-dark transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-600 hover:text-pink-dark transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <Phone size={18} className="text-pink-dark" />
                <a href="tel:9585329788" className="text-gray-600 hover:text-pink-dark transition-colors">9585329788</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={18} className="text-pink-dark" />
                <a href="mailto:browniesbae6996@gmail.com" className="text-gray-600 hover:text-pink-dark transition-colors">browniesbae6996@gmail.com</a>
              </li>
              <li className="flex items-start gap-2">
                <Clock size={18} className="text-pink-dark mt-1" />
                <span className="text-gray-600">Open 24 hours for custom orders</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="text-center pt-6 border-t border-gray-200">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Brownies Bae. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
