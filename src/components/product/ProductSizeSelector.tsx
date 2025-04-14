
interface ProductSizeSelectorProps {
  category?: string;
  product: any;
  selectedSize: string;
  setSelectedSize: (size: string) => void;
}

const ProductSizeSelector: React.FC<ProductSizeSelectorProps> = ({ 
  category, 
  product, 
  selectedSize, 
  setSelectedSize 
}) => {
  return (
    <div className="mb-6">
      <h3 className="font-medium mb-2">Size</h3>
      <div className="flex flex-wrap gap-2">
        {category === 'brownies' ? (
          <>
            <button 
              onClick={() => setSelectedSize('per_piece')}
              className={`px-4 py-2 rounded-md border ${selectedSize === 'per_piece' ? 'bg-pink-dark text-white border-pink-dark' : 'bg-white text-gray-700 border-gray-300'}`}
            >
              Per Piece - ₹{product.perPiecePrice}
            </button>
            <button 
              onClick={() => setSelectedSize('half_kg')}
              className={`px-4 py-2 rounded-md border ${selectedSize === 'half_kg' ? 'bg-pink-dark text-white border-pink-dark' : 'bg-white text-gray-700 border-gray-300'}`}
            >
              Half Kg - ₹{product.halfKgPrice}
            </button>
            <button 
              onClick={() => setSelectedSize('one_kg')}
              className={`px-4 py-2 rounded-md border ${selectedSize === 'one_kg' ? 'bg-pink-dark text-white border-pink-dark' : 'bg-white text-gray-700 border-gray-300'}`}
            >
              One Kg - ₹{product.oneKgPrice}
            </button>
          </>
        ) : (
          <>
            <button 
              onClick={() => setSelectedSize('half_kg')}
              className={`px-4 py-2 rounded-md border ${selectedSize === 'half_kg' ? 'bg-pink-dark text-white border-pink-dark' : 'bg-white text-gray-700 border-gray-300'}`}
            >
              Half Kg - ₹{product.halfKgPrice}
            </button>
            <button 
              onClick={() => setSelectedSize('one_kg')}
              className={`px-4 py-2 rounded-md border ${selectedSize === 'one_kg' ? 'bg-pink-dark text-white border-pink-dark' : 'bg-white text-gray-700 border-gray-300'}`}
            >
              One Kg - ₹{product.oneKgPrice}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductSizeSelector;
