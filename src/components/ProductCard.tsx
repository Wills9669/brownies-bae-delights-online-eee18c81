
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ShoppingCart, ImageOff, Edit, CheckCircle } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
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
  const [imageUpdated, setImageUpdated] = useState(false);

  // Load saved image from localStorage on component mount
  useEffect(() => {
    const updateCurrentImage = () => {
      try {
        const savedImage = localStorage.getItem(`product-image-${id}`);
        if (savedImage) {
          setCurrentImage(savedImage);
          setImageUpdated(true);
          setImageError(false); // Reset error state if we have a valid image
        } else {
          setCurrentImage(image);
          setImageUpdated(false);
        }
      } catch (error) {
        console.error('Error accessing localStorage:', error);
      }
    };
    
    updateCurrentImage();
    
    // Listen for storage events (from other tabs)
    window.addEventListener('storage', updateCurrentImage);
    
    // Listen for custom events (from same tab)
    window.addEventListener('productImageUpdated', (e: any) => {
      if (e.detail && e.detail.productId === id) {
        updateCurrentImage();
      }
    });
    
    return () => {
      window.removeEventListener('storage', updateCurrentImage);
      window.removeEventListener('productImageUpdated', updateCurrentImage);
    };
  }, [id, image]);
  
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
    // Always use the latest image from localStorage
    let latestImage;
    try {
      latestImage = localStorage.getItem(`product-image-${id}`) || currentImage;
    } catch (error) {
      console.error('Error accessing localStorage:', error);
      latestImage = currentImage;
    }
    
    addToCart({
      id,
      name,
      price: parseFloat(price),
      quantity: 1,
      image: latestImage,
      category: safeCategory
    });
    
    toast.success(`${name} added to cart!`);
  };
  
  const handleImageError = () => {
    setImageError(true);
  };

  const handleImageUploaded = (newImageUrl: string) => {
    if (newImageUrl) {
      try {
        // Save to localStorage for persistence across page reloads and sharing with other components
        localStorage.setItem(`product-image-${id}`, newImageUrl);
        setCurrentImage(newImageUrl);
        setImageError(false);
        setImageUpdated(true);
        
        // Dispatch storage event to update other open tabs/windows
        window.dispatchEvent(new Event('storage'));
        
        // Dispatch custom event for components in the same tab
        window.dispatchEvent(new CustomEvent('productImageUpdated', { 
          detail: { productId: id }
        }));
        
        toast.success("Image updated everywhere!", {
          description: "The image will appear in all places across the website."
        });
      } catch (error) {
        console.error('Error saving to localStorage:', error);
        toast.error("Failed to save image. Try using a smaller image.");
      }
    }
    setIsEditDialogOpen(false);
  };

  const clearStorage = () => {
    try {
      localStorage.removeItem(`product-image-${id}`);
      setCurrentImage(image);
      setImageUpdated(false);
      
      // Dispatch storage event to update other components
      window.dispatchEvent(new Event('storage'));
      
      // Dispatch custom event for same tab components
      window.dispatchEvent(new CustomEvent('productImageUpdated', { 
        detail: { productId: id }
      }));
      
      toast.success("Original image restored!");
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
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
            {imageUpdated && (
              <div className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md">
                <CheckCircle size={16} className="text-green-500" />
              </div>
            )}
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
          <DialogTitle>Edit Image for {name}</DialogTitle>
          <DialogDescription>
            Upload a new image for this product. The image will be optimized automatically.
          </DialogDescription>
          <ImageUploader 
            onImageUploaded={handleImageUploaded}
            currentImage={currentImage}
          />
          {imageUpdated && (
            <Button 
              variant="outline" 
              className="mt-2" 
              onClick={clearStorage}
            >
              Restore Original Image
            </Button>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductCard;
