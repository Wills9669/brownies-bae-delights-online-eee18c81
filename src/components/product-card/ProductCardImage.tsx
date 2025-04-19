
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
    
    updateImage();
    
    const handleStorageEvent = () => updateImage();
    const handleCustomEvent = (e: any) => {
      if (e.detail?.productId === id) {
        updateImage();
      }
    };
    
    window.addEventListener('storage', handleStorageEvent);
    window.addEventListener('productImageUpdated', handleCustomEvent);
    
    return () => {
      window.removeEventListener('storage', handleStorageEvent);
      window.removeEventListener('productImageUpdated', handleCustomEvent);
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
