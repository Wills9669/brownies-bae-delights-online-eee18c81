
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ImageOff, Edit, CheckCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import ImageUploader from '@/components/ImageUploader';
import { toast } from 'sonner';
import { safelyStoreImage, getStoredImage, broadcastImageChange } from '@/utils/imageUtils';

interface ProductImageProps {
  id: string;
  image: string;
  name: string;
  category: string;
  onImageError?: () => void;
}

const ProductImage = ({ id, image, name, category, onImageError }: ProductImageProps) => {
  const [currentImage, setCurrentImage] = useState(image);
  const [imageError, setImageError] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [imageUpdated, setImageUpdated] = useState(false);

  useEffect(() => {
    const updateImageState = () => {
      try {
        const storedImage = getStoredImage(id, image);
        setCurrentImage(storedImage);
        setImageUpdated(storedImage !== image);
        setImageError(false);
      } catch (error) {
        console.error('Error accessing localStorage:', error);
        setCurrentImage(image);
      }
    };
    
    // Initial load
    updateImageState();
    
    // Set up event listeners for updates
    const handleStorageEvent = () => updateImageState();
    const handleCustomEvent = (e: CustomEvent) => {
      if ((e as any).detail?.productId === id) {
        updateImageState();
      }
    };
    
    // Listen for specific product event
    const specificEventName = `productImage-${id}-updated`;
    const handleSpecificProductEvent = () => updateImageState();
    
    window.addEventListener('storage', handleStorageEvent);
    window.addEventListener('productImageUpdated', handleCustomEvent as EventListener);
    window.addEventListener(specificEventName, handleSpecificProductEvent);
    
    // Clean up event listeners
    return () => {
      window.removeEventListener('storage', handleStorageEvent);
      window.removeEventListener('productImageUpdated', handleCustomEvent as EventListener);
      window.removeEventListener(specificEventName, handleSpecificProductEvent);
    };
  }, [id, image]);

  // Update currentImage if the image prop changes
  useEffect(() => {
    if (image !== currentImage && !imageUpdated) {
      setCurrentImage(image);
    }
  }, [image]);

  const handleImageError = () => {
    setImageError(true);
    console.error(`Failed to load image for product ${id}`);
    
    if (onImageError) {
      onImageError();
    }
  };

  const handleImageUploaded = (newImageUrl: string) => {
    if (newImageUrl) {
      try {
        const stored = safelyStoreImage(`product-image-${id}`, newImageUrl);
        
        if (stored) {
          setCurrentImage(newImageUrl);
          setImageError(false);
          setImageUpdated(true);
          
          broadcastImageChange(id);
          
          toast.success("Image updated everywhere!", {
            description: "Your image has been successfully updated across all views"
          });
        } else {
          toast.error("Failed to save image. Try using a smaller image.");
        }
      } catch (error) {
        console.error('Error saving image:', error);
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
      
      broadcastImageChange(id);
      
      toast.success("Original image restored!");
    } catch (error) {
      console.error('Error clearing localStorage:', error);
      toast.error("Failed to restore original image.");
    }
  };

  return (
    <div className="h-60 overflow-hidden bg-gray-50 relative group">
      {!imageError ? (
        <>
          <Link to={`/product/${category}/${id}`} className="block w-full h-full">
            <img
              src={currentImage}
              alt={name}
              className="w-full h-full transition-all duration-500 object-contain hover:scale-105"
              onError={handleImageError}
              loading="lazy"
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
              aria-label="Edit image"
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
            <button 
              onClick={clearStorage}
              className="w-full mt-2 p-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
            >
              Restore Original Image
            </button>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductImage;
