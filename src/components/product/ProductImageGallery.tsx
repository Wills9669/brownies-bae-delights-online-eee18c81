
import { useState } from 'react';

interface ProductImageGalleryProps {
  mainImage: string;
  productName: string;
}

const ProductImageGallery: React.FC<ProductImageGalleryProps> = ({ mainImage, productName }) => {
  const [activeImage, setActiveImage] = useState(mainImage);
  
  return (
    <div className="p-6">
      <div className="mb-4 h-80 rounded-lg overflow-hidden">
        <img 
          src={activeImage} 
          alt={productName} 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="grid grid-cols-4 gap-2">
        <button 
          onClick={() => setActiveImage(mainImage)}
          className={`h-20 rounded-md overflow-hidden ${activeImage === mainImage ? 'ring-2 ring-pink-dark' : 'opacity-70'}`}
        >
          <img 
            src={mainImage} 
            alt={productName} 
            className="w-full h-full object-cover"
          />
        </button>
        {/* Additional images would go here */}
      </div>
    </div>
  );
};

export default ProductImageGallery;
