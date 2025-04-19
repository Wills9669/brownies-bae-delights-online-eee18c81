
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductLoading from '@/components/product/ProductLoading';
import ProductNotFound from '@/components/product/ProductNotFound';
import ProductDetailHeader from '@/components/product/ProductDetailHeader';
import ProductDetailContent from '@/components/product/ProductDetailContent';
import RelatedProducts from '@/components/product/RelatedProducts';
import { useProductDetail } from '@/hooks/useProductDetail';
import { getStoredImage } from '@/utils/imageUtils';

const ProductDetailPage = () => {
  const { category, id } = useParams();
  const {
    product,
    loading,
    relatedProducts,
    quantity,
    selectedSize,
    setSelectedSize,
    incrementQuantity,
    decrementQuantity,
    getPrice,
    getSizeLabel
  } = useProductDetail(category, id);
  
  // Add state for current product image
  const [currentImage, setCurrentImage] = useState<string | undefined>(undefined);
  
  // Sync image from localStorage on mount and when product changes
  useEffect(() => {
    if (product?.image && id) {
      const storedImage = getStoredImage(id, product.image);
      setCurrentImage(storedImage);
    }
  }, [product, id]);
  
  // Listen for image updates
  useEffect(() => {
    if (!id) return;
    
    const handleImageUpdate = () => {
      if (product?.image) {
        const storedImage = getStoredImage(id, product.image);
        setCurrentImage(storedImage);
      }
    };
    
    const handleCustomEvent = (e: any) => {
      if (e.detail?.productId === id) {
        handleImageUpdate();
      }
    };
    
    window.addEventListener('storage', handleImageUpdate);
    window.addEventListener('productImageUpdated', handleCustomEvent);
    
    return () => {
      window.removeEventListener('storage', handleImageUpdate);
      window.removeEventListener('productImageUpdated', handleCustomEvent);
    };
  }, [id, product]);
  
  if (loading) {
    return <ProductLoading />;
  }
  
  if (!product) {
    return <ProductNotFound category={category} />;
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Product Detail Section */}
      <div className="flex-grow bg-pink-light py-8 md:py-12">
        <div className="container mx-auto px-4">
          <ProductDetailHeader category={category} />
          
          <ProductDetailContent 
            product={{...product, image: currentImage || product.image}}
            category={category}
            quantity={quantity}
            selectedSize={selectedSize}
            setSelectedSize={setSelectedSize}
            incrementQuantity={incrementQuantity}
            decrementQuantity={decrementQuantity}
            getPrice={getPrice}
            getSizeLabel={getSizeLabel}
          />
          
          {/* Related Products */}
          <RelatedProducts products={relatedProducts} category={category} />
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ProductDetailPage;
