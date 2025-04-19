
import { getStoredImage } from '@/utils/imageUtils';

interface ProductThumbnailGalleryProps {
  productId: string;
  mainImage: string;
  onImageSelect: (image: string) => void;
  imageUpdated: boolean;
  onClearImage: () => void;
}

const ProductThumbnailGallery = ({
  productId,
  mainImage,
  onImageSelect,
  imageUpdated,
  onClearImage
}: ProductThumbnailGalleryProps) => {
  return (
    <div className="grid grid-cols-4 gap-2">
      <button 
        onClick={() => {
          try {
            const savedImage = getStoredImage(productId, mainImage);
            onImageSelect(savedImage);
          } catch (error) {
            console.error('Error accessing localStorage:', error);
          }
        }}
        className={`h-20 rounded-md overflow-hidden bg-gray-50 transition-all hover:opacity-100 ${
          !imageUpdated ? 'ring-2 ring-pink-dark' : 'opacity-70'
        }`}
      >
        <img 
          src={(() => {
            try {
              return getStoredImage(productId, mainImage);
            } catch (error) {
              console.error('Error accessing localStorage:', error);
              return mainImage;
            }
          })()}
          alt="Product thumbnail"
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.src = '/placeholder.svg';
          }}
        />
      </button>
      {imageUpdated && (
        <button 
          onClick={onClearImage}
          className="h-20 rounded-md overflow-hidden bg-gray-50 flex items-center justify-center border border-dashed border-gray-300 hover:border-red-500"
          title="Restore original image"
        >
          <div className="text-xs text-center p-2">Restore Original</div>
        </button>
      )}
    </div>
  );
};

export default ProductThumbnailGallery;
