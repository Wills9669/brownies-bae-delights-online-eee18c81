
import { useParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductLoading from '@/components/product/ProductLoading';
import ProductNotFound from '@/components/product/ProductNotFound';
import ProductDetailHeader from '@/components/product/ProductDetailHeader';
import ProductDetailContent from '@/components/product/ProductDetailContent';
import RelatedProducts from '@/components/product/RelatedProducts';
import { useProductDetail } from '@/hooks/useProductDetail';

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
            product={product}
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
