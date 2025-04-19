
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { safelyStoreImage } from '@/utils/imageUtils';

export const useProductImage = (productId: string, mainImage: string, currentImage?: string) => {
  const [activeImage, setActiveImage] = useState(currentImage || mainImage);
  const [imageError, setImageError] = useState(false);
  const [imageUpdated, setImageUpdated] = useState(false);

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
    console.error(`Failed to load image`);
  };

  const clearImage = () => {
    try {
      localStorage.removeItem(`product-image-${productId}`);
      setActiveImage(mainImage);
      setImageUpdated(false);
      
      window.dispatchEvent(new Event('storage'));
      window.dispatchEvent(new CustomEvent('productImageUpdated', { 
        detail: { productId }
      }));
      
      toast.success("Original image restored!");
      return true;
    } catch (error) {
      console.error('Error clearing image:', error);
      toast.error("Failed to restore original image.");
      return false;
    }
  };

  return {
    activeImage,
    imageError,
    imageUpdated,
    setActiveImage,
    setImageError,
    setImageUpdated,
    handleImageError,
    clearImage
  };
};
