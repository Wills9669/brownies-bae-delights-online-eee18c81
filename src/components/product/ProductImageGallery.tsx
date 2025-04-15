
import { useState } from 'react';
import { ImageOff, Edit } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import ImageUploader from '@/components/ImageUploader';
import { toast } from 'sonner';

interface ProductImageGalleryProps {
  mainImage: string;
  productName: string;
}

const ProductImageGallery: React.FC<ProductImageGalleryProps> = ({ mainImage, productName }) => {
  const [activeImage, setActiveImage] = useState(mainImage);
  const [imageError, setImageError] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  
  const handleImageError = () => {
    setImageError(true);
    console.error(`Failed to load image for ${productName}`);
  };

  const handleImageUploaded = (newImageUrl: string) => {
    if (newImageUrl) {
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
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => setIsEditDialogOpen(true)}
                className="p-2 bg-white rounded-full shadow hover:shadow-md"
                title="Edit image"
              >
                <Edit size={18} />
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
          onClick={() => setActiveImage(mainImage)}
          className={`h-20 rounded-md overflow-hidden bg-gray-50 transition-all hover:opacity-100 ${
            activeImage === mainImage ? 'ring-2 ring-pink-dark' : 'opacity-70'
          }`}
        >
          <img 
            src={mainImage} 
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
          <h2 className="text-xl font-bold mb-4">Edit Image for {productName}</h2>
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
