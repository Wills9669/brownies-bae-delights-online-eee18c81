
import { useState, useEffect } from 'react';
import { ImageOff, Edit, CheckCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import ImageUploader from '@/components/ImageUploader';
import { toast } from 'sonner';

interface ProductImageGalleryProps {
  mainImage: string;
  productName: string;
  productId: string;
  onImageChange?: (newImage: string) => void;
  currentImage?: string;
}

const ProductImageGallery: React.FC<ProductImageGalleryProps> = ({ 
  mainImage, 
  productName, 
  productId,
  onImageChange,
  currentImage
}) => {
  const [activeImage, setActiveImage] = useState(currentImage || mainImage);
  const [imageError, setImageError] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [imageUpdated, setImageUpdated] = useState(false);
  
  // Load and sync image from localStorage or props
  useEffect(() => {
    const syncImage = () => {
      try {
        const savedImage = localStorage.getItem(`product-image-${productId}`);
        if (savedImage) {
          setActiveImage(savedImage);
          setImageError(false);
          setImageUpdated(true);
        } else if (currentImage) {
          setActiveImage(currentImage);
          setImageUpdated(false);
        } else {
          setActiveImage(mainImage);
          setImageUpdated(false);
        }
      } catch (error) {
        console.error('Error accessing localStorage:', error);
        setActiveImage(mainImage);
      }
    };
    
    syncImage();
    
    // Event listeners for image updates
    const handleStorageEvent = () => syncImage();
    const handleCustomEvent = (e: any) => {
      if (e.detail?.productId === productId) {
        syncImage();
      }
    };
    
    window.addEventListener('storage', handleStorageEvent);
    window.addEventListener('productImageUpdated', handleCustomEvent);
    
    return () => {
      window.removeEventListener('storage', handleStorageEvent);
      window.removeEventListener('productImageUpdated', handleCustomEvent);
    };
  }, [productId, mainImage, currentImage]);
  
  const handleImageError = () => {
    setImageError(true);
    console.error(`Failed to load image for ${productName}`);
  };

  const handleImageUploaded = (newImageUrl: string) => {
    if (newImageUrl) {
      try {
        // Save to localStorage
        localStorage.setItem(`product-image-${productId}`, newImageUrl);
        
        // Update local state
        setActiveImage(newImageUrl);
        setImageError(false);
        setImageUpdated(true);
        
        // Notify parent component
        if (onImageChange) {
          onImageChange(newImageUrl);
        }
        
        // Dispatch events for other components
        window.dispatchEvent(new Event('storage'));
        window.dispatchEvent(new CustomEvent('productImageUpdated', { 
          detail: { productId: productId }
        }));
        
        toast.success("Image updated successfully everywhere!");
      } catch (error) {
        console.error('Error saving image:', error);
        toast.error("Failed to save image. Please try using a smaller image.");
      }
    }
    setIsEditDialogOpen(false);
  };
  
  const clearStorage = () => {
    try {
      localStorage.removeItem(`product-image-${productId}`);
      setActiveImage(mainImage);
      setImageUpdated(false);
      
      // Notify parent
      if (onImageChange) {
        onImageChange(mainImage);
      }
      
      // Dispatch events
      window.dispatchEvent(new Event('storage'));
      window.dispatchEvent(new CustomEvent('productImageUpdated', { 
        detail: { productId: productId }
      }));
      
      toast.success("Original image restored!");
    } catch (error) {
      console.error('Error clearing image:', error);
      toast.error("Failed to restore original image.");
    }
  };
  
  return (
    <div className="p-6">
      <div className="mb-4 h-80 rounded-lg overflow-hidden bg-gray-50 border border-gray-100 relative group">
        {!imageError ? (
          <>
            <img 
              src={activeImage} 
              alt={productName} 
              className="w-full h-full object-contain transition-all duration-300 group-hover:scale-105"
              onError={handleImageError}
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all flex items-center justify-center">
              <button
                onClick={() => setIsEditDialogOpen(true)}
                className="p-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow hover:bg-gray-100"
                title="Edit image"
              >
                <Edit size={20} className="text-gray-800" />
              </button>
            </div>
            {imageUpdated && (
              <div className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md">
                <CheckCircle size={20} className="text-green-500" />
              </div>
            )}
          </>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 bg-gray-50">
            <ImageOff size={48} />
            <p className="mt-3 text-gray-500">Image unavailable</p>
            <button
              onClick={() => setIsEditDialogOpen(true)}
              className="mt-4 px-4 py-2 bg-pink-dark text-white rounded-md hover:bg-pink-dark/90 transition-colors"
            >
              Upload New Image
            </button>
          </div>
        )}
      </div>
      <div className="grid grid-cols-4 gap-2">
        <button 
          onClick={() => {
            try {
              const savedImage = localStorage.getItem(`product-image-${productId}`);
              const imageToUse = savedImage || mainImage;
              setActiveImage(imageToUse);
              
              if (onImageChange) {
                onImageChange(imageToUse);
              }
            } catch (error) {
              console.error('Error accessing localStorage:', error);
            }
          }}
          className={`h-20 rounded-md overflow-hidden bg-gray-50 transition-all hover:opacity-100 ${
            activeImage === mainImage ? 'ring-2 ring-pink-dark' : 'opacity-70'
          }`}
        >
          <img 
            src={(() => {
              try {
                return localStorage.getItem(`product-image-${productId}`) || mainImage;
              } catch (error) {
                console.error('Error accessing localStorage:', error);
                return mainImage;
              }
            })()}
            alt={productName} 
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.src = '/placeholder.svg';
            }}
          />
        </button>
        {imageUpdated && (
          <button 
            onClick={clearStorage}
            className="h-20 rounded-md overflow-hidden bg-gray-50 flex items-center justify-center border border-dashed border-gray-300 hover:border-red-500"
            title="Restore original image"
          >
            <div className="text-xs text-center p-2">Restore Original</div>
          </button>
        )}
      </div>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogTitle>Edit Image for {productName}</DialogTitle>
          <DialogDescription>
            Upload a new image for this product. The image will be optimized automatically.
          </DialogDescription>
          <ImageUploader 
            onImageUploaded={handleImageUploaded}
            currentImage={activeImage}
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

export default ProductImageGallery;
