
import { Button } from '@/components/ui/button';
import { ShoppingCart, QrCode, Phone } from 'lucide-react';

interface ProductActionsProps {
  handleAddToCart: () => void;
  handleBuyNow: () => void;
}

const ProductActions: React.FC<ProductActionsProps> = ({ 
  handleAddToCart, 
  handleBuyNow 
}) => {
  return (
    <>
      <div className="flex flex-col sm:flex-row gap-3">
        <Button 
          onClick={handleAddToCart}
          className="flex-1 flex items-center justify-center gap-2 py-6"
        >
          <ShoppingCart size={18} />
          Add to Cart
        </Button>
        <Button 
          onClick={handleBuyNow}
          variant="secondary"
          className="flex-1 flex items-center justify-center gap-2 py-6"
        >
          <QrCode size={18} />
          Buy Now
        </Button>
      </div>

      <div className="mt-6 bg-gray-50 p-3 rounded-lg flex items-center justify-center gap-2">
        <Phone size={18} className="text-pink-dark" />
        <span>For custom orders, call <a href="tel:9585329788" className="text-pink-dark font-semibold">9585329788</a> (Open 24 hours)</span>
      </div>
    </>
  );
};

export default ProductActions;
