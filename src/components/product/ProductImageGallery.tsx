
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
  
  // Load saved image from localStorage on component mount
  useEffect(() => {
    const updateActiveImage = () => {
      try {
        const savedImage = localStorage.getItem(`product-image-${productId}`);
        if (savedImage) {
          setActiveImage(savedImage);
          setImageError(false); // Reset error state if we have a valid image
          setImageUpdated(true);
        } else {
          setActiveImage(mainImage);
          setImageUpdated(false);
        }
      } catch (error) {
        console.error('Error accessing localStorage:', error);
      }
    };
    
    updateActiveImage();
    
    // Listen for storage events from other tabs
    window.addEventListener('storage', updateActiveImage);
    
    // Listen for custom events from same tab
    window.addEventListener('productImageUpdated', (e: any) => {
      if (e.detail && e.detail.productId === productId) {
        updateActiveImage();
      }
    });
    
    return () => {
      window.removeEventListener('storage', updateActiveImage);
      window.removeEventListener('productImageUpdated', updateActiveImage);
    };
  }, [productId, mainImage]);

  // Update active image if currentImage prop changes
  useEffect(() => {
    if (currentImage) {
      setActiveImage(currentImage);
    }
  }, [currentImage]);
  
  const handleImageError = () => {
    setImageError(true);
    console.error(`Failed to load image for ${productName}`);
  };

  const handleImageUploaded = (newImageUrl: string) => {
    if (newImageUrl) {
      try {
        // Save to localStorage for persistence across page reloads
        localStorage.setItem(`product-image-${productId}`, newImageUrl);
        setActiveImage(newImageUrl);
        setImageError(false);
        setImageUpdated(true);
        
        // Notify parent component about the image change
        if (onImageChange) {
          onImageChange(newImageUrl);
        }
        
        // Dispatch storage event to update other tabs
        window.dispatchEvent(new Event('storage'));
        
        // Dispatch custom event for same-tab components
        window.dispatchEvent(new CustomEvent('productImageUpdated', { 
          detail: { productId: productId }
        }));
        
        toast.success("Image updated successfully everywhere!");
      } catch (error) {
        console.error('Error saving to localStorage:', error);
        toast.error("Failed to save image. Try using a smaller image.");
      }
    }
    setIsEditDialogOpen(false);
  };
  
  const clearStorage = () => {
    try {
      localStorage.removeItem(`product-image-${productId}`);
      setActiveImage(mainImage);
      setImageUpdated(false);
      
      // Notify parent component about the image change
      if (onImageChange) {
        onImageChange(mainImage);
      }
      
      // Dispatch storage event for other tabs
      window.dispatchEvent(new Event('storage'));
      
      // Dispatch custom event for same-tab components
      window.dispatchEvent(new CustomEvent('productImageUpdated', { 
        detail: { productId: productId }
      }));
      
      toast.success("Original image restored!");
    } catch (error) {
      console.error('Error clearing localStorage:', error);
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
              // Use saved image if available, otherwise use original
              const savedImage = localStorage.getItem(`product-image-${productId}`);
              const imageToUse = savedImage || mainImage;
              setActiveImage(imageToUse);
              
              // Notify parent component about the image change
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
