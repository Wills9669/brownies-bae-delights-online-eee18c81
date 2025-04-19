import ProductCardImage from '@/components/product-card/ProductCardImage';
import ProductCardInfo from '@/components/product-card/ProductCardInfo';
import AddToCartButton from '@/components/product-card/AddToCartButton';

interface ProductCardProps {
  id: string;
  name: string;
  price: string;
  image: string;
  category: string;
  description?: string;
}

const ProductCard = ({
  id,
  name,
  price,
  image,
  category,
  description
}: ProductCardProps) => {
  const safeCategory = getCategoryForRouting(category);

  return (
    <div className="product-card bg-white rounded-lg overflow-hidden shadow hover:shadow-md transition-shadow duration-300">
      <ProductCardImage 
        id={id}
        image={image}
        name={name}
        category={safeCategory}
      />
      
      <ProductCardInfo 
        id={id}
        name={name}
        price={price}
        category={safeCategory}
        description={description}
      />
      
      <div className="px-4 pb-4">
        <AddToCartButton 
          id={id}
          name={name}
          price={price}
          image={image}
          category={safeCategory}
        />
      </div>
    </div>
  );
};

const getCategoryForRouting = (category: string) => {
  switch (category) {
    case 'brownies':
      return 'brownies';
    case 'cakes':
      return 'cakes';
    case 'cupcakes':
      return 'cupcakes';
    case 'cake-jars':
      return 'cake-jars';
    case 'cake-pops':
      return 'cake-pops';
    default:
      return 'other';
  }
};

export default ProductCard;
