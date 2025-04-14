
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Search, Bot } from 'lucide-react';
import { Link } from 'react-router-dom';
import { browniesList, cakesList, cupcakesList, cakeJarsList, cakePopsList } from '@/data/index';

type Product = {
  id: string;
  name: string;
  description?: string;
  image: string;
  category: string;
};

const ProductRecommender = () => {
  const [query, setQuery] = useState('');
  const [recommendations, setRecommendations] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [showRecommendations, setShowRecommendations] = useState(false);

  const handleSearch = () => {
    if (!query.trim()) return;
    
    setLoading(true);
    setShowRecommendations(false);
    
    // Simulate AI recommendation processing
    setTimeout(() => {
      // Convert all product data to a common format for searching
      const allProducts = [
        ...browniesList.map(product => ({ ...product, category: 'brownies' })),
        ...cakesList.map(product => ({ ...product, category: 'cakes' })),
        ...cupcakesList.map(product => ({ ...product, category: 'other' })),
        ...cakeJarsList.map(product => ({ ...product, category: 'cake-jars' })),
        ...cakePopsList.map(product => ({ ...product, category: 'cake-pops' }))
      ];
      
      // Simple algorithm to find matching products based on keywords
      const keywords = query.toLowerCase().split(' ');
      
      const matchedProducts = allProducts.filter(product => {
        const productName = product.name.toLowerCase();
        const productDescription = (product.description || '').toLowerCase();
        
        return keywords.some(keyword => 
          productName.includes(keyword) || 
          productDescription.includes(keyword)
        );
      });
      
      // If no exact matches, provide some "recommended" products
      let results = matchedProducts.length > 0 
        ? matchedProducts 
        : getRandomProducts(allProducts, 3);
      
      // Limit to 3 recommendations
      results = results.slice(0, 3);
      
      setRecommendations(results);
      setLoading(false);
      setShowRecommendations(true);
    }, 1500);
  };
  
  const getRandomProducts = (products: any[], count: number) => {
    const shuffled = [...products].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };
  
  const getProductUrl = (product: Product) => {
    return `/product/${product.category}/${product.id}`;
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-3xl mx-auto">
      <div className="mb-8">
        <p className="text-center text-gray-700 mb-4">
          Tell us what you're looking for or what occasion you're celebrating, and our AI will recommend the perfect treats for you!
        </p>
        
        <div className="flex gap-2">
          <div className="relative flex-grow">
            <input 
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="e.g., birthday cake, chocolate lover, office party..."
              className="w-full px-4 py-2 pr-10 border border-pink-dark rounded-md focus:outline-none focus:ring-2 focus:ring-pink-dark"
            />
            <Bot className="absolute right-3 top-1/2 -translate-y-1/2 text-pink-dark/50" size={18} />
          </div>
          <Button onClick={handleSearch} disabled={loading} className="flex gap-2 items-center whitespace-nowrap">
            {loading ? 'Thinking...' : (
              <>
                <Search size={18} /> Find Treats
              </>
            )}
          </Button>
        </div>
      </div>
      
      {showRecommendations && recommendations.length > 0 && (
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-center">Our Recommendations For You</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {recommendations.map((product) => (
              <Link 
                to={getProductUrl(product)} 
                key={product.id}
                className="block bg-pink-light rounded-lg overflow-hidden shadow-md transition-transform hover:scale-105"
              >
                <div className="h-40 overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h4 className="font-bold text-lg mb-1 line-clamp-1">{product.name}</h4>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {product.description || `Perfect ${product.category.replace('-', ' ')} for any occasion`}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
      
      {showRecommendations && recommendations.length === 0 && (
        <div className="text-center p-4 border border-pink-light rounded-md">
          <p className="text-gray-700">No recommendations found for your query. Try using different keywords!</p>
        </div>
      )}
    </div>
  );
};

export default ProductRecommender;
