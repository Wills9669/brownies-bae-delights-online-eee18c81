
import { Star, Phone } from 'lucide-react';

interface ProductInfoProps {
  product: any;
  getPrice: () => string;
  getSizeLabel: () => string;
}

const ProductInfo: React.FC<ProductInfoProps> = ({ product, getPrice, getSizeLabel }) => {
  return (
    <>
      <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
      
      <div className="flex items-center mb-4">
        <div className="flex text-yellow-400 mr-2">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={18} fill="currentColor" />
          ))}
        </div>
        <span className="text-gray-600">(24 reviews)</span>
      </div>
      
      <p className="text-2xl font-bold text-pink-dark mb-4">
        ₹{getPrice()} <span className="text-gray-500 text-lg font-normal">/ {getSizeLabel()}</span>
      </p>
      
      <div className="mb-6">
        <h3 className="font-medium mb-2">Description</h3>
        <p className="text-gray-600">
          {product.description || `Indulge in our delicious ${product.name.toLowerCase()}. Made with premium ingredients and baked to perfection. Perfect for any occasion or just to treat yourself!`}
        </p>
      </div>
    </>
  );
};

export default ProductInfo;
