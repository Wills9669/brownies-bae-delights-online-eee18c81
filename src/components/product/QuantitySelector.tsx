
import { Minus, Plus } from 'lucide-react';

interface QuantitySelectorProps {
  quantity: number;
  incrementQuantity: () => void;
  decrementQuantity: () => void;
}

const QuantitySelector: React.FC<QuantitySelectorProps> = ({ 
  quantity, 
  incrementQuantity, 
  decrementQuantity 
}) => {
  return (
    <div className="mb-8">
      <h3 className="font-medium mb-2">Quantity</h3>
      <div className="flex items-center border border-gray-300 rounded-md w-fit">
        <button 
          onClick={decrementQuantity}
          className="px-3 py-2 text-gray-600 hover:text-pink-dark"
          disabled={quantity <= 1}
        >
          <Minus size={18} />
        </button>
        <span className="px-4 py-2 border-x border-gray-300 min-w-[3rem] text-center">{quantity}</span>
        <button 
          onClick={incrementQuantity}
          className="px-3 py-2 text-gray-600 hover:text-pink-dark"
        >
          <Plus size={18} />
        </button>
      </div>
    </div>
  );
};

export default QuantitySelector;
