import { useState, useEffect } from 'react';
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
  const [productImage, setProductImage] = useState<string>(
    localStorage.getItem(`product-image-${product.id}`) || product.image
  );
  const { addToCart } = useCart();
  
  useEffect(() => {
    const updateProductImage = () => {
      const savedImage = localStorage.getItem(`product-image-${product.id}`);
      if (savedImage) {
        setProductImage(savedImage);
      }
    };

    updateProductImage();
    
    window.addEventListener('storage', updateProductImage);
    
    return () => {
      window.removeEventListener('storage', updateProductImage);
    };
  }, [product.id]);
  
  const handleAddToCart = () => {
    const currentImage = localStorage.getItem(`product-image-${product.id}`) || productImage;
    
    addToCart({
      id: product.id,
      name: product.name,
      price: parseFloat(getPrice()),
      quantity: quantity,
      image: currentImage,
      category: category || 'other',
      size: getSizeLabel()
    });
    
    toast.success(`${product.name} added to cart!`);
  };
  
  const handleBuyNow = () => {
    setShowQrPayment(true);
  };

  const handlePaymentComplete = () => {
    setShowQrPayment(false);
    toast.success("Payment successful! Your order has been placed.");
  };
  
  const handleImageChange = (newImage: string) => {
    setProductImage(newImage);
    localStorage.setItem(`product-image-${product.id}`, newImage);
    window.dispatchEvent(new Event('storage'));
    
    toast.success("Product image updated everywhere!", {
      description: "The image will appear in all places across the website."
    });
  };
  
  if (showQrPayment) {
    return (
      <QrPayment 
        product={{...product, image: productImage}}
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
        <ProductImageGallery 
          mainImage={product.image} 
          productName={product.name}
          productId={product.id}
          onImageChange={handleImageChange}
          currentImage={productImage}
        />
        
        <div className="p-6 md:p-8">
          <ProductInfo 
            product={{...product, image: productImage}} 
            getPrice={getPrice} 
            getSizeLabel={getSizeLabel} 
          />
          
          <ProductSizeSelector 
            category={category}
            product={product}
            selectedSize={selectedSize}
            setSelectedSize={setSelectedSize}
          />
          
          <QuantitySelector 
            quantity={quantity}
            incrementQuantity={incrementQuantity}
            decrementQuantity={decrementQuantity}
          />
          
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
