
import { useEffect, useState } from 'react';
import ProductImage from '@/components/product/ProductImage';
import { getStoredImage } from '@/utils/imageUtils';

interface ProductCardImageProps {
  id: string;
  image: string;
  name: string;
  category: string;
}

const ProductCardImage = ({ id, image, name, category }: ProductCardImageProps) => {
  const [currentImage, setCurrentImage] = useState(image);
  
  useEffect(() => {
    const updateImage = () => {
      const storedImage = getStoredImage(id, image);
      setCurrentImage(storedImage);
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
  }, [id, image]);

  return (
    <ProductImage 
      id={id}
      image={currentImage}
      name={name}
      category={category}
    />
  );
};

export default ProductCardImage;
