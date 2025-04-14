
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { browniesList, cakesList } from '@/data/index';
import { toast } from 'sonner';
import { useCart } from '@/context/CartContext';
import ProductLoading from '@/components/product/ProductLoading';
import ProductNotFound from '@/components/product/ProductNotFound';
import ProductImageGallery from '@/components/product/ProductImageGallery';
import ProductInfo from '@/components/product/ProductInfo';
import ProductSizeSelector from '@/components/product/ProductSizeSelector';
import QuantitySelector from '@/components/product/QuantitySelector';
import ProductActions from '@/components/product/ProductActions';
import QrPayment from '@/components/product/QrPayment';
import RelatedProducts from '@/components/product/RelatedProducts';

const ProductDetailPage = () => {
  const { category, id } = useParams();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('per_piece'); // For brownies: per_piece, half_kg, one_kg
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
  const [showQrPayment, setShowQrPayment] = useState(false);
  
  const { addToCart } = useCart();
  
  useEffect(() => {
    setLoading(true);
    
    // Find product based on category and id
    let foundProduct = null;
    if (category === 'brownies') {
      foundProduct = browniesList.find(item => item.id === id);
      if (foundProduct) {
        // Set random related products (4 other brownies)
        const related = browniesList
          .filter(item => item.id !== id)
          .sort(() => 0.5 - Math.random())
          .slice(0, 4);
        setRelatedProducts(related);
      }
    } else if (category === 'cakes') {
      foundProduct = cakesList.find(item => item.id === id);
      if (foundProduct) {
        // Set random related products (4 other cakes)
        const related = cakesList
          .filter(item => item.id !== id)
          .sort(() => 0.5 - Math.random())
          .slice(0, 4);
        setRelatedProducts(related);
      }
    }
    
    if (foundProduct) {
      setProduct(foundProduct);
      
      // Set appropriate default size
      if (category === 'brownies') {
        setSelectedSize('per_piece');
      } else if (category === 'cakes') {
        setSelectedSize('half_kg');
      }
    }
    
    setLoading(false);
  }, [category, id]);
  
  if (loading) {
    return <ProductLoading />;
  }
  
  if (!product) {
    return <ProductNotFound category={category} />;
  }
  
  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };
  
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };
  
  const getPrice = () => {
    if (category === 'brownies') {
      switch (selectedSize) {
        case 'per_piece': return product.perPiecePrice;
        case 'half_kg': return product.halfKgPrice;
        case 'one_kg': return product.oneKgPrice;
        default: return product.perPiecePrice;
      }
    } else {
      // For cakes
      switch (selectedSize) {
        case 'half_kg': return product.halfKgPrice;
        case 'one_kg': return product.oneKgPrice;
        default: return product.halfKgPrice;
      }
    }
  };
  
  const getSizeLabel = () => {
    if (category === 'brownies') {
      switch (selectedSize) {
        case 'per_piece': return 'Per Piece';
        case 'half_kg': return 'Half Kg';
        case 'one_kg': return 'One Kg';
        default: return 'Per Piece';
      }
    } else {
      // For cakes
      switch (selectedSize) {
        case 'half_kg': return 'Half Kg';
        case 'one_kg': return 'One Kg';
        default: return 'Half Kg';
      }
    }
  };
  
  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: parseFloat(getPrice()),
      quantity: quantity,
      image: product.image,
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
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Product Detail Section */}
      <div className="flex-grow bg-pink-light py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <Link to={`/${category}`} className="inline-flex items-center text-gray-600 hover:text-pink-dark transition-colors">
              <ChevronLeft size={18} />
              <span>Back to {category === 'brownies' ? 'Brownies' : 'Cakes'}</span>
            </Link>
          </div>
          
          {showQrPayment ? (
            <QrPayment 
              product={product}
              quantity={quantity}
              getSizeLabel={getSizeLabel}
              getPrice={getPrice}
              handlePaymentComplete={handlePaymentComplete}
              setShowQrPayment={setShowQrPayment}
            />
          ) : (
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2">
                {/* Product Images */}
                <ProductImageGallery mainImage={product.image} productName={product.name} />
                
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
          )}
          
          {/* Related Products */}
          {!showQrPayment && (
            <RelatedProducts products={relatedProducts} category={category} />
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ProductDetailPage;
