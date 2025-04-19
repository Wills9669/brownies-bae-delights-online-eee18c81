
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Search, Bot, Sparkles, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { browniesList, cakesList, cupcakesList, cakeJarsList, cakePopsList } from '@/data/index';
import { toast } from 'sonner';

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
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  const saveRecentSearch = (search: string) => {
    setRecentSearches(prev => {
      const newSearches = [search, ...prev.filter(s => s !== search)].slice(0, 3);
      try {
        localStorage.setItem('recentSearches', JSON.stringify(newSearches));
      } catch (error) {
        console.error('Error saving recent searches:', error);
      }
      return newSearches;
    });
  };

  const handleSearch = () => {
    if (!query.trim()) {
      toast.error("Please enter what you're looking for!");
      return;
    }
    
    setLoading(true);
    setShowRecommendations(false);
    saveRecentSearch(query);
    
    // Enhanced AI recommendation processing with more engaging loading
    setTimeout(() => {
      const allProducts = [
        ...browniesList.map(product => ({ ...product, category: 'brownies' })),
        ...cakesList.map(product => ({ ...product, category: 'cakes' })),
        ...cupcakesList.map(product => ({ ...product, category: 'other' })),
        ...cakeJarsList.map(product => ({ ...product, category: 'cake-jars' })),
        ...cakePopsList.map(product => ({ ...product, category: 'cake-pops' }))
      ];
      
      const keywords = query.toLowerCase().split(' ');
      
      const matchedProducts = allProducts.filter(product => {
        const productName = product.name.toLowerCase();
        const productDescription = (product.description || '').toLowerCase();
        
        return keywords.some(keyword => 
          productName.includes(keyword) || 
          productDescription.includes(keyword)
        );
      });
      
      let results = matchedProducts.length > 0 
        ? matchedProducts 
        : getRandomProducts(allProducts, 3);
      
      results = results.slice(0, 3);
      
      setRecommendations(results);
      setLoading(false);
      setShowRecommendations(true);
      
      if (results.length > 0) {
        toast.success("Found some perfect treats for you! 🎉", {
          description: "Take a look at our recommendations below"
        });
      }
    }, 1500);
  };
  
  const getRandomProducts = (products: any[], count: number) => {
    const shuffled = [...products].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };
  
  const getProductUrl = (product: Product) => `/product/${product.category}/${product.id}`;
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const suggestionPhrases = [
    "birthday cake for my friend",
    "chocolate lover treats",
    "office party desserts",
    "kid's party sweets",
    "romantic date desserts"
  ];
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-3xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Sparkles className="text-pink-dark animate-pulse" size={24} />
          <h2 className="text-2xl font-semibold text-center">Dessert AI Assistant</h2>
        </div>
        
        <p className="text-center text-gray-700 mb-6">
          Tell me what you're looking for or what occasion you're celebrating, and I'll recommend the perfect treats for you!
        </p>
        
        <div className="flex gap-2">
          <div className="relative flex-grow">
            <input 
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="e.g., birthday cake, chocolate lover, office party..."
              className="w-full px-4 py-2 pr-10 border border-pink-dark rounded-md focus:outline-none focus:ring-2 focus:ring-pink-dark transition-all"
            />
            <Bot className={`absolute right-3 top-1/2 -translate-y-1/2 text-pink-dark/50 transition-all ${loading ? 'animate-bounce' : ''}`} size={18} />
          </div>
          <Button 
            onClick={handleSearch} 
            disabled={loading} 
            className="flex gap-2 items-center whitespace-nowrap"
          >
            {loading ? (
              <>
                <Bot className="animate-spin" size={18} />
                Thinking...
              </>
            ) : (
              <>
                <Search size={18} /> Find Treats
              </>
            )}
          </Button>
        </div>

        {!loading && !showRecommendations && (
          <div className="mt-4">
            <p className="text-sm text-gray-600 mb-2">Try searching for:</p>
            <div className="flex flex-wrap gap-2">
              {suggestionPhrases.map((phrase) => (
                <button
                  key={phrase}
                  onClick={() => {
                    setQuery(phrase);
                    handleSearch();
                  }}
                  className="text-sm px-3 py-1 rounded-full bg-pink-light text-pink-dark hover:bg-pink-dark hover:text-white transition-colors"
                >
                  {phrase}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {showRecommendations && recommendations.length > 0 && (
        <div className="space-y-6 animate-fade-in">
          <div className="flex items-center justify-center gap-2">
            <MessageCircle className="text-pink-dark" size={24} />
            <h3 className="text-xl font-bold text-center">Perfect Matches For You</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {recommendations.map((product, index) => (
              <Link 
                to={getProductUrl(product)} 
                key={product.id}
                className="block bg-pink-light rounded-lg overflow-hidden shadow-md transition-all hover:scale-105 hover:shadow-lg"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="h-40 overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover transition-transform hover:scale-110"
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
        <div className="text-center p-6 border border-pink-light rounded-md animate-fade-in">
          <p className="text-gray-700 mb-2">No exact matches found for your query.</p>
          <p className="text-sm text-gray-600">Try using different keywords or check out our suggested searches above!</p>
        </div>
      )}

      {recentSearches.length > 0 && !loading && !showRecommendations && (
        <div className="mt-6 pt-6 border-t border-gray-100">
          <p className="text-sm text-gray-600 mb-2">Recent searches:</p>
          <div className="flex flex-wrap gap-2">
            {recentSearches.map((search) => (
              <button
                key={search}
                onClick={() => {
                  setQuery(search);
                  handleSearch();
                }}
                className="text-sm px-3 py-1 rounded-full bg-gray-100 text-gray-600 hover:bg-pink-light hover:text-pink-dark transition-colors"
              >
                {search}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductRecommender;
