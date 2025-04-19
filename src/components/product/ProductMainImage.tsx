import { ImageOff, Edit, CheckCircle } from 'lucide-react';

interface ProductMainImageProps {
  imageError: boolean;
  activeImage: string;
  productName: string;
  onEditClick: () => void;
  onImageError: () => void;
  imageUpdated: boolean;
}

const ProductMainImage = ({
  imageError,
  activeImage,
  productName,
  onEditClick,
  onImageError,
  imageUpdated
}: ProductMainImageProps) => {
  return (
    <div className="mb-4 h-80 rounded-lg overflow-hidden bg-gray-50 border border-gray-100 relative group">
      {!imageError ? (
        <>
          <img 
            src={activeImage} 
            alt={productName} 
            className="w-full h-full object-contain transition-all duration-300 group-hover:scale-105"
            onError={onImageError}
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all flex items-center justify-center">
            <button
              onClick={onEditClick}
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
            onClick={onEditClick}
            className="mt-4 px-4 py-2 bg-pink-dark text-white rounded-md hover:bg-pink-dark/90 transition-colors"
          >
            Upload New Image
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductMainImage;
