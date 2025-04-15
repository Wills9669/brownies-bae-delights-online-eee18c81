
import { useState } from 'react';
import { ImageOff } from 'lucide-react';

interface ProductImageGalleryProps {
  mainImage: string;
  productName: string;
}

const ProductImageGallery: React.FC<ProductImageGalleryProps> = ({ mainImage, productName }) => {
  const [activeImage, setActiveImage] = useState(mainImage);
  const [imageError, setImageError] = useState(false);
  
  const handleImageError = () => {
    setImageError(true);
    console.error(`Failed to load image for ${productName}`);
  };
  
  return (
    <div className="p-6">
      <div className="mb-4 h-80 rounded-lg overflow-hidden bg-gray-50 border border-gray-100 relative group">
        {!imageError ? (
          <img 
            src={activeImage} 
            alt={productName} 
            className="w-full h-full object-contain transition-all duration-300 group-hover:scale-105"
            onError={handleImageError}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 bg-gray-50">
            <ImageOff size={48} />
            <p className="mt-3 text-gray-500">Image unavailable</p>
            <p className="text-sm text-gray-400">Please upload a new image</p>
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
    </div>
  );
};

export default ProductImageGallery;
