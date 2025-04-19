
import { useState } from 'react';
import { useProductImage } from '@/hooks/useProductImage';
import ProductImageEditor from './ProductImageEditor';
import ProductMainImage from './ProductMainImage';
import ProductThumbnailGallery from './ProductThumbnailGallery';
import { toast } from 'sonner';
import { safelyStoreImage } from '@/utils/imageUtils';

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
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  
  const {
    activeImage,
    imageError,
    imageUpdated,
    setActiveImage,
    handleImageError,
    clearImage
  } = useProductImage(productId, mainImage, currentImage);

  const handleImageUpdate = (newImageUrl: string) => {
    try {
      const stored = safelyStoreImage(`product-image-${productId}`, newImageUrl);
      if (stored) {
        setActiveImage(newImageUrl);
        
        if (onImageChange) {
          onImageChange(newImageUrl);
        }
        
        window.dispatchEvent(new Event('storage'));
        window.dispatchEvent(new CustomEvent('productImageUpdated', { 
          detail: { productId: productId }
        }));
      } else {
        toast.error("Failed to save image. Please try using a smaller image.");
      }
    } catch (error) {
      console.error('Error saving image:', error);
      toast.error("Failed to save image. Please try using a smaller image.");
    }
  };

  return (
    <div className="p-6">
      <ProductMainImage
        imageError={imageError}
        activeImage={activeImage}
        productName={productName}
        onEditClick={() => setIsEditDialogOpen(true)}
        onImageError={handleImageError}
        imageUpdated={imageUpdated}
      />

      <ProductThumbnailGallery
        productId={productId}
        mainImage={mainImage}
        onImageSelect={(image) => {
          setActiveImage(image);
          if (onImageChange) {
            onImageChange(image);
          }
        }}
        imageUpdated={imageUpdated}
        onClearImage={() => {
          const cleared = clearImage();
          if (cleared && onImageChange) {
            onImageChange(mainImage);
          }
        }}
      />

      <ProductImageEditor
        isOpen={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        onImageUpdate={handleImageUpdate}
        productName={productName}
        productId={productId}
        currentImage={activeImage}
      />
    </div>
  );
};

export default ProductImageGallery;
