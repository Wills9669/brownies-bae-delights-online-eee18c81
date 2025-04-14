
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface ProductNotFoundProps {
  category?: string;
}

const ProductNotFound: React.FC<ProductNotFoundProps> = ({ category }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow flex items-center justify-center bg-pink-light">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
          <p className="mb-6">The product you're looking for does not exist.</p>
          <Button asChild>
            <Link to={`/${category || ''}`}>Back to {category}</Link>
          </Button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductNotFound;
