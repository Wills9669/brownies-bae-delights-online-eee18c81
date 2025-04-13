
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Minus, Plus, ChevronLeft, Star, Phone, QrCode } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { browniesList, cakesList } from '@/data/products';
import { toast } from 'sonner';
import ProductCard from '@/components/ProductCard';
import { useCart } from '@/context/CartContext';

const ProductDetailPage = () => {
  const { category, id } = useParams();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('per_piece'); // For brownies: per_piece, half_kg, one_kg
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
  const [activeImage, setActiveImage] = useState('');
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
      setActiveImage(foundProduct.image);
      
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
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center bg-pink-light">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-dark"></div>
        </div>
        <Footer />
      </div>
    );
  }
  
  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center bg-pink-light">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
            <p className="mb-6">The product you're looking for does not exist.</p>
            <Button asChild>
              <Link to={`/${category || ''}`}>Back to {category}</Link>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
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
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold mb-6 text-center">Complete Your Payment</h2>
              <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-1/2 flex flex-col items-center justify-center">
                  <div className="bg-white p-4 rounded-lg border shadow-sm mb-4 max-w-sm">
                    <img 
                      src="/lovable-uploads/6f4f7dfd-2459-44c6-8044-806be30dac1f.png" 
                      alt="Payment QR Code" 
                      className="w-full object-contain"
                    />
                  </div>
                  <p className="text-center text-gray-700 mb-2">
                    <span className="font-semibold">UPI ID:</span> abhimanyuswa6996@oksbi
                  </p>
                  <p className="text-center text-gray-700 mb-4">
                    Scan to pay with any UPI app
                  </p>
                </div>
                
                <div className="md:w-1/2">
                  <div className="bg-gray-50 p-6 rounded-lg mb-6">
                    <h3 className="font-bold text-lg mb-4">Order Summary</h3>
                    <div className="mb-4 pb-4 border-b">
                      <div className="flex justify-between mb-2">
                        <span>Product:</span>
                        <span className="font-medium">{product.name}</span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span>Size:</span>
                        <span>{getSizeLabel()}</span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span>Quantity:</span>
                        <span>{quantity}</span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span>Price:</span>
                        <span>₹{getPrice()} per {getSizeLabel()}</span>
                      </div>
                    </div>
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total:</span>
                      <span>₹{parseFloat(getPrice()) * quantity}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-4">
                    <Button onClick={handlePaymentComplete} className="py-6">
                      Confirm Payment
                    </Button>
                    <Button variant="outline" onClick={() => setShowQrPayment(false)}>
                      Cancel
                    </Button>
                    <div className="flex items-center justify-center mt-2 gap-2 text-gray-600">
                      <Phone size={18} />
                      <span>Need help? Call <a href="tel:9585329788" className="text-pink-dark font-semibold">9585329788</a></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2">
                {/* Product Images */}
                <div className="p-6">
                  <div className="mb-4 h-80 rounded-lg overflow-hidden">
                    <img 
                      src={activeImage} 
                      alt={product.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    <button 
                      onClick={() => setActiveImage(product.image)}
                      className={`h-20 rounded-md overflow-hidden ${activeImage === product.image ? 'ring-2 ring-pink-dark' : 'opacity-70'}`}
                    >
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-full object-cover"
                      />
                    </button>
                    {/* Additional images would go here */}
                  </div>
                </div>
                
                {/* Product Info */}
                <div className="p-6 md:p-8">
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
                  
                  {/* Size Selection */}
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
                  
                  {/* Quantity */}
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
                  
                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button 
                      onClick={handleAddToCart}
                      className="flex-1 flex items-center justify-center gap-2 py-6"
                    >
                      <ShoppingCart size={18} />
                      Add to Cart
                    </Button>
                    <Button 
                      onClick={handleBuyNow}
                      variant="secondary"
                      className="flex-1 flex items-center justify-center gap-2 py-6"
                    >
                      <QrCode size={18} />
                      Buy Now
                    </Button>
                  </div>

                  {/* Contact */}
                  <div className="mt-6 bg-gray-50 p-3 rounded-lg flex items-center justify-center gap-2">
                    <Phone size={18} className="text-pink-dark" />
                    <span>For custom orders, call <a href="tel:9585329788" className="text-pink-dark font-semibold">9585329788</a> (Open 24 hours)</span>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Related Products */}
          {!showQrPayment && relatedProducts.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {relatedProducts.map((item) => (
                  <ProductCard 
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    price={category === 'brownies' ? item.perPiecePrice : item.halfKgPrice}
                    image={item.image}
                    category={category || 'other'}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ProductDetailPage;
