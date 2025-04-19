
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { toast } from 'sonner';

interface AddToCartButtonProps {
  id: string;
  name: string;
  price: string;
  image: string;
  category: string;
}

const AddToCartButton = ({ id, name, price, image, category }: AddToCartButtonProps) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    try {
      addToCart({
        id,
        name,
        price: parseFloat(price),
        quantity: 1,
        image,
        category
      });
      
      toast.success(`${name} added to cart!`);
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error("Failed to add item to cart.");
    }
  };

  return (
    <Button onClick={handleAddToCart} className="w-full flex items-center justify-center gap-2">
      <ShoppingCart size={18} />
      Add to Cart
    </Button>
  );
};

export default AddToCartButton;
