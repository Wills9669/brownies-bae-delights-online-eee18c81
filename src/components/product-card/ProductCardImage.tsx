
import { useEffect, useState } from 'react';
import ProductImage from '@/components/product/ProductImage';
import { getStoredImage } from '@/utils/imageUtils';
import { toast } from 'sonner';

interface ProductCardImageProps {
  id: string;
  image: string;
  name: string;
  category: string;
}

const ProductCardImage = ({ id, image, name, category }: ProductCardImageProps) => {
  const [currentImage, setCurrentImage] = useState(image);
  const [hasAttemptedFallback, setHasAttemptedFallback] = useState(false);
  
  useEffect(() => {
    const updateImage = () => {
      try {
        const storedImage = getStoredImage(id, image);
        setCurrentImage(storedImage);
        setHasAttemptedFallback(false); // Reset fallback state when updating image
      } catch (error) {
        console.error('Error updating image:', error);
        if (!hasAttemptedFallback) {
          // If this is our first error, try to use the original image as fallback
          setCurrentImage(image);
          setHasAttemptedFallback(true);
        } else {
          // If we've already tried the fallback, use a placeholder
          setCurrentImage('/placeholder.svg');
        }
      }
    };
    
    // Initial image load
    updateImage();
    
    // Set up event listeners for image changes
    const handleStorageEvent = () => updateImage();
    const handleCustomEvent = (e: any) => {
      if (e.detail?.productId === id) {
        updateImage();
      }
    };
    
    // Listen for specific product event
    const handleSpecificProductEvent = () => updateImage();
    const specificEventName = `productImage-${id}-updated`;
    
    window.addEventListener('storage', handleStorageEvent);
    window.addEventListener('productImageUpdated', handleCustomEvent);
    window.addEventListener(specificEventName, handleSpecificProductEvent);
    
    // Clean up event listeners
    return () => {
      window.removeEventListener('storage', handleStorageEvent);
      window.removeEventListener('productImageUpdated', handleCustomEvent);
      window.removeEventListener(specificEventName, handleSpecificProductEvent);
    };
  }, [id, image, hasAttemptedFallback]);

  const handleImageFailure = () => {
    if (!hasAttemptedFallback) {
      // If the customized image fails, try falling back to the original
      console.log(`Custom image failed for ${id}, trying original`);
      setCurrentImage(image);
      setHasAttemptedFallback(true);
    } else {
      // If even the original fails, use placeholder
      console.log(`Original image also failed for ${id}, using placeholder`);
      setCurrentImage('/placeholder.svg');
      toast.error(`Failed to load image for ${name}`, {
        duration: 3000,
        id: `image-error-${id}`, // Prevent duplicate toasts
      });
    }
  };

  return (
    <ProductImage 
      id={id}
      image={currentImage}
      name={name}
      category={category}
      onImageError={handleImageFailure}
    />
  );
};

export default ProductCardImage;
