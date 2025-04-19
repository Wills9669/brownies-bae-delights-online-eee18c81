
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import { browniesList, cakesList, cupcakesList } from '@/data/index';

const FeaturedProducts = () => {
  const [featuredBrownies, setFeaturedBrownies] = useState<any[]>([]);
  const [featuredCakes, setFeaturedCakes] = useState<any[]>([]);
  const [featuredCupcakes, setFeaturedCupcakes] = useState<any[]>([]);

  useEffect(() => {
    const randomBrownies = [...browniesList].sort(() => 0.5 - Math.random()).slice(0, 4);
    const randomCakes = [...cakesList].sort(() => 0.5 - Math.random()).slice(0, 4);
    const randomCupcakes = [...cupcakesList].sort(() => 0.5 - Math.random()).slice(0, 4);
    setFeaturedBrownies(randomBrownies);
    setFeaturedCakes(randomCakes);
    setFeaturedCupcakes(randomCupcakes);
  }, []);

  return (
    <>
      <FeaturedSection
        title="Featured Brownies"
        products={featuredBrownies}
        category="brownies"
        link="/brownies"
        priceKey="perPiecePrice"
      />
      
      <FeaturedSection
        title="Special Divine Cakes"
        products={featuredCakes}
        category="cakes"
        link="/cakes"
        priceKey="halfKgPrice"
        className="bg-pink-light"
      />
      
      <FeaturedSection
        title="Delicious Cupcakes"
        products={featuredCupcakes}
        category="other"
        link="/cupcakes"
        priceKey="price"
      />
    </>
  );
};

interface FeaturedSectionProps {
  title: string;
  products: any[];
  category: string;
  link: string;
  priceKey: string;
  className?: string;
}

const FeaturedSection = ({ title, products, category, link, priceKey, className = 'bg-white' }: FeaturedSectionProps) => (
  <section className={`py-12 ${className}`}>
    <div className="container mx-auto px-4">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">{title}</h2>
        <Button asChild variant="ghost" className="text-pink-dark hover:text-pink-dark">
          <Link to={link} className="flex items-center gap-2">
            View All <ArrowRight size={18} />
          </Link>
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map(product => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            price={product[priceKey]}
            image={product.image}
            category={category}
            description={product.description}
          />
        ))}
      </div>
    </div>
  </section>
);

export default FeaturedProducts;
