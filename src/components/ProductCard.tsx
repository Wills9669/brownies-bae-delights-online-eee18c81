import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/context/CartContext';
interface ProductCardProps {
  id: string;
  name: string;
  price: string;
  image: string;
  category: string;
  description?: string;
}
const ProductCard = ({
  id,
  name,
  price,
  image,
  category,
  description
}: ProductCardProps) => {
  const {
    addToCart
  } = useCart();

  // Ensure category is one of the valid values for routing purposes
  const getCategoryForRouting = (category: string) => {
    switch (category) {
      case 'brownies':
        return 'brownies';
      case 'cakes':
        return 'cakes';
      case 'cupcakes':
        return 'cupcakes';
      case 'cake-jars':
        return 'cake-jars';
      case 'cake-pops':
        return 'cake-pops';
      default:
        return 'other';
    }
  };
  const safeCategory = getCategoryForRouting(category);
  const handleAddToCart = () => {
    addToCart({
      id,
      name,
      price: parseFloat(price),
      quantity: 1,
      image,
      category: safeCategory
    });
  };
  return <div className="product-card bg-white rounded-lg overflow-hidden shadow">
      <Link to={`/product/${safeCategory}/${id}`}>
        <div className="h-60 overflow-hidden">
          <img src={image} alt={name} className="w-full h-full hover:scale-105 transition-transform duration-500 object-contain" />
        </div>
      </Link>
      <div className="p-4">
        <Link to={`/product/${safeCategory}/${id}`}>
          <h3 className="font-bold text-lg mb-1 hover:text-pink-dark transition-colors">{name}</h3>
        </Link>
        {description && <p className="text-gray-600 text-sm mb-2">{description}</p>}
        <p className="text-pink-dark font-medium mb-3">₹{price}</p>
        <Button onClick={handleAddToCart} className="w-full flex items-center justify-center gap-2">
          <ShoppingCart size={18} />
          Add to Cart
        </Button>
      </div>
    </div>;
};
export default ProductCard;