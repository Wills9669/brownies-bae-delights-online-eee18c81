
import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { toast } from 'sonner';
import ProductImageGallery from '@/components/product/ProductImageGallery';
import ProductInfo from '@/components/product/ProductInfo';
import ProductSizeSelector from '@/components/product/ProductSizeSelector';
import QuantitySelector from '@/components/product/QuantitySelector';
import ProductActions from '@/components/product/ProductActions';
import QrPayment from '@/components/product/QrPayment';

interface ProductDetailContentProps {
  product: any;
  category: string | undefined;
  quantity: number;
  selectedSize: string;
  setSelectedSize: (size: string) => void;
  incrementQuantity: () => void;
  decrementQuantity: () => void;
  getPrice: () => string;
  getSizeLabel: () => string;
}

const ProductDetailContent: React.FC<ProductDetailContentProps> = ({
  product,
  category,
  quantity,
  selectedSize,
  setSelectedSize,
  incrementQuantity,
  decrementQuantity,
  getPrice,
  getSizeLabel
}) => {
  const [showQrPayment, setShowQrPayment] = useState(false);
  const { addToCart } = useCart();
  
  const handleAddToCart = () => {
    // Get the updated image from localStorage if it exists
    const savedImage = localStorage.getItem(`product-image-${product.id}`);
    
    addToCart({
      id: product.id,
      name: product.name,
      price: parseFloat(getPrice()),
      quantity: quantity,
      image: savedImage || product.image,
      category: category || 'other',
      size: getSizeLabel()
    });
  };
  
  const handleBuyNow = () => {
    setShowQrPayment(true);
  };

  const handlePaymentComplete = () => {
    setShowQrPayment(false);
    toast.success("Payment successful! Your order has been placed.");
  };
  
  if (showQrPayment) {
    return (
      <QrPayment 
        product={product}
        quantity={quantity}
        getSizeLabel={getSizeLabel}
        getPrice={getPrice}
        handlePaymentComplete={handlePaymentComplete}
        setShowQrPayment={setShowQrPayment}
      />
    );
  }
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Product Images - Pass the product ID for localStorage persistence */}
        <ProductImageGallery 
          mainImage={product.image} 
          productName={product.name}
          productId={product.id}
        />
        
        {/* Product Info */}
        <div className="p-6 md:p-8">
          <ProductInfo 
            product={product} 
            getPrice={getPrice} 
            getSizeLabel={getSizeLabel} 
          />
          
          {/* Size Selection */}
          <ProductSizeSelector 
            category={category}
            product={product}
            selectedSize={selectedSize}
            setSelectedSize={setSelectedSize}
          />
          
          {/* Quantity */}
          <QuantitySelector 
            quantity={quantity}
            incrementQuantity={incrementQuantity}
            decrementQuantity={decrementQuantity}
          />
          
          {/* Actions */}
          <ProductActions 
            handleAddToCart={handleAddToCart}
            handleBuyNow={handleBuyNow}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductDetailContent;
