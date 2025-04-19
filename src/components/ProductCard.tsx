
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { toast } from 'sonner';
import ProductImage from '@/components/product/ProductImage';
import { getStoredImage } from '@/utils/imageUtils';

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
  const { addToCart } = useCart();
  const [currentImage, setCurrentImage] = useState(image);
  
  // Sync image state with localStorage
  useEffect(() => {
    const updateImage = () => {
      const storedImage = getStoredImage(id, image);
      setCurrentImage(storedImage);
    };
    
    updateImage();
    
    const handleStorageEvent = () => updateImage();
    const handleCustomEvent = (e: any) => {
      if (e.detail?.productId === id) {
        updateImage();
      }
    };
    
    window.addEventListener('storage', handleStorageEvent);
    window.addEventListener('productImageUpdated', handleCustomEvent);
    
    return () => {
      window.removeEventListener('storage', handleStorageEvent);
      window.removeEventListener('productImageUpdated', handleCustomEvent);
    };
  }, [id, image]);
  
  // Get the proper category for routing
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
    try {
      // Use updated image state instead of directly accessing localStorage
      addToCart({
        id,
        name,
        price: parseFloat(price),
        quantity: 1,
        image: currentImage,
        category: safeCategory
      });
      
      toast.success(`${name} added to cart!`);
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error("Failed to add item to cart.");
    }
  };

  return (
    <div className="product-card bg-white rounded-lg overflow-hidden shadow hover:shadow-md transition-shadow duration-300">
      <ProductImage 
        id={id}
        image={image}
        name={name}
        category={safeCategory}
      />
      
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
    </div>
  );
};

export default ProductCard;
