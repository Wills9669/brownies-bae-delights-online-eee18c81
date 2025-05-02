
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { safelyStoreImage, broadcastImageChange } from '@/utils/imageUtils';

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
        } else if (currentImage && currentImage !== mainImage) {
          setActiveImage(currentImage);
          setImageUpdated(currentImage !== mainImage);
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
    const handleCustomEvent = (e: CustomEvent) => {
      if ((e as any).detail?.productId === productId) {
        syncImage();
      }
    };
    
    // Listen for specific product event
    const specificEventName = `productImage-${productId}-updated`;
    const handleSpecificProductEvent = () => syncImage();
    
    window.addEventListener('storage', handleStorageEvent);
    window.addEventListener('productImageUpdated', handleCustomEvent as EventListener);
    window.addEventListener(specificEventName, handleSpecificProductEvent);
    
    return () => {
      window.removeEventListener('storage', handleStorageEvent);
      window.removeEventListener('productImageUpdated', handleCustomEvent as EventListener);
      window.removeEventListener(specificEventName, handleSpecificProductEvent);
    };
  }, [productId, mainImage, currentImage]);

  // Update if props change
  useEffect(() => {
    if (currentImage && currentImage !== activeImage && !imageUpdated) {
      setActiveImage(currentImage);
    }
  }, [currentImage]);

  const handleImageError = () => {
    setImageError(true);
    console.error(`Failed to load image`);
  };

  const clearImage = () => {
    try {
      localStorage.removeItem(`product-image-${productId}`);
      setActiveImage(mainImage);
      setImageUpdated(false);
      
      broadcastImageChange(productId);
      
      toast.success("Original image restored!");
      return true;
    } catch (error) {
      console.error('Error clearing image:', error);
      toast.error("Failed to restore original image.");
      return false;
    }
  };

  const updateImage = (newImage: string) => {
    try {
      const stored = safelyStoreImage(`product-image-${productId}`, newImage);
      if (stored) {
        setActiveImage(newImage);
        setImageError(false);
        setImageUpdated(true);
        broadcastImageChange(productId);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error updating image:', error);
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
    clearImage,
    updateImage
  };
};
