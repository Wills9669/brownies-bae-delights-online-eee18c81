
import { useState, useEffect } from 'react';
import { ImageOff, Edit } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import ImageUploader from '@/components/ImageUploader';
import { toast } from 'sonner';

interface ProductImageGalleryProps {
  mainImage: string;
  productName: string;
  productId: string; // Added productId to uniquely identify the product
}

const ProductImageGallery: React.FC<ProductImageGalleryProps> = ({ mainImage, productName, productId }) => {
  const [activeImage, setActiveImage] = useState(mainImage);
  const [imageError, setImageError] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  
  // Load saved image from localStorage on component mount
  useEffect(() => {
    const savedImage = localStorage.getItem(`product-image-${productId}`);
    if (savedImage) {
      setActiveImage(savedImage);
    }
  }, [productId]);
  
  const handleImageError = () => {
    setImageError(true);
    console.error(`Failed to load image for ${productName}`);
  };

  const handleImageUploaded = (newImageUrl: string) => {
    if (newImageUrl) {
      // Save to localStorage for persistence across page reloads
      localStorage.setItem(`product-image-${productId}`, newImageUrl);
      setActiveImage(newImageUrl);
      setImageError(false);
      toast.success("Image updated successfully!");
    }
    setIsEditDialogOpen(false);
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
            // Use saved image if available, otherwise use original
            const savedImage = localStorage.getItem(`product-image-${productId}`);
            setActiveImage(savedImage || mainImage);
          }}
          className={`h-20 rounded-md overflow-hidden bg-gray-50 transition-all hover:opacity-100 ${
            activeImage === mainImage ? 'ring-2 ring-pink-dark' : 'opacity-70'
          }`}
        >
          <img 
            src={localStorage.getItem(`product-image-${productId}`) || mainImage} 
            alt={productName} 
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.src = '/placeholder.svg';
            }}
          />
        </button>
      </div>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogTitle>Edit Image for {productName}</DialogTitle>
          <ImageUploader 
            onImageUploaded={handleImageUploaded}
            currentImage={activeImage}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductImageGallery;
