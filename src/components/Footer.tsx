
import { Link } from 'react-router-dom';
import { Phone, Mail, Clock, Instagram, Facebook, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white pt-12 pb-6 border-t">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
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
              <li><Link to="/cupcakes" className="text-gray-600 hover:text-pink-dark transition-colors">Cupcakes</Link></li>
              <li><Link to="/cake-jars" className="text-gray-600 hover:text-pink-dark transition-colors">Cake Jars</Link></li>
              <li><Link to="/cake-pops" className="text-gray-600 hover:text-pink-dark transition-colors">Cake Pops</Link></li>
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
          
          <div>
            <h3 className="font-bold text-lg mb-4">Store Location</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <MapPin size={18} className="text-pink-dark mt-1" />
                <div className="text-gray-600">
                  <p>123 Dessert Lane, RS Puram</p>
                  <p>Coimbatore, Tamil Nadu 641002</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Clock size={18} className="text-pink-dark mt-1" />
                <div className="text-gray-600">
                  <p><strong>Store Hours:</strong></p>
                  <p>Mon-Sun: 10 AM - 8 PM</p>
                </div>
              </li>
            </ul>
            <div className="mt-4">
              <p className="text-gray-600 mb-1"><strong>Delivery Information:</strong></p>
              <p className="text-gray-600">Free delivery for orders above ₹500</p>
              <p className="text-gray-600">₹50 delivery fee for orders below ₹500</p>
            </div>
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
