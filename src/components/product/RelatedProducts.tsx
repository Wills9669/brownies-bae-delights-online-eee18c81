
import ProductCard from '@/components/ProductCard';

interface RelatedProductsProps {
  products: any[];
  category?: string;
}

const RelatedProducts: React.FC<RelatedProductsProps> = ({ products, category }) => {
  if (products.length === 0) return null;
  
  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((item) => (
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
  );
};

export default RelatedProducts;
