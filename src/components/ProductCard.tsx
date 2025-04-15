
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ShoppingCart, ImageOff, Edit } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import ImageUploader from '@/components/ImageUploader';
import { toast } from 'sonner';

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
  const [imageError, setImageError] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(image);

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
  
  const handleImageError = () => {
    setImageError(true);
  };

  const handleImageUploaded = (newImageUrl: string) => {
    setCurrentImage(newImageUrl || image);
    if (newImageUrl) {
      toast.success("Image updated successfully!");
    }
    setIsEditDialogOpen(false);
  };

  return (
    <div className="product-card bg-white rounded-lg overflow-hidden shadow hover:shadow-md transition-shadow duration-300">
      <div className="h-60 overflow-hidden bg-gray-50 relative group">
        {!imageError ? (
          <>
            <Link to={`/product/${safeCategory}/${id}`} className="block w-full h-full">
              <img
                src={currentImage}
                alt={name}
                className="w-full h-full hover:scale-105 transition-transform duration-500 object-contain"
                onError={handleImageError}
              />
            </Link>
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all flex items-center justify-center">
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setIsEditDialogOpen(true);
                }} 
                className="p-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-100"
              >
                <Edit className="text-gray-800" size={20} />
              </button>
            </div>
          </>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
            <ImageOff size={32} />
            <p className="mt-2 text-sm">Image unavailable</p>
            <button
              onClick={() => setIsEditDialogOpen(true)}
              className="mt-3 px-3 py-1 bg-pink-dark text-white rounded-md text-sm hover:bg-pink-dark/90"
            >
              Upload Image
            </button>
          </div>
        )}
      </div>
      
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

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <h2 className="text-xl font-bold mb-4">Edit Image for {name}</h2>
          <ImageUploader 
            onImageUploaded={handleImageUploaded}
            currentImage={currentImage}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductCard;
