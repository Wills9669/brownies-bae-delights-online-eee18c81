
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { browniesList, cakesList, cupcakesList, cakeJarsList, cakePopsList } from '@/data/index';

type Product = {
  id: string;
  name: string;
  description?: string;
  image: string;
  category: string;
};

export const useProductRecommender = () => {
  const [query, setQuery] = useState('');
  const [recommendations, setRecommendations] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  useEffect(() => {
    // Load recent searches from localStorage on component mount
    try {
      const savedSearches = localStorage.getItem('recentSearches');
      if (savedSearches) {
        setRecentSearches(JSON.parse(savedSearches));
      }
    } catch (error) {
      console.error('Error loading recent searches:', error);
    }
  }, []);

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

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
    setLoading(true);
    setShowRecommendations(false);
    saveRecentSearch(searchQuery);
    
    // Enhanced AI recommendation processing with more engaging loading
    setTimeout(() => {
      const allProducts = [
        ...browniesList.map(product => ({ ...product, category: 'brownies' })),
        ...cakesList.map(product => ({ ...product, category: 'cakes' })),
        ...cupcakesList.map(product => ({ ...product, category: 'other' })),
        ...cakeJarsList.map(product => ({ ...product, category: 'cake-jars' })),
        ...cakePopsList.map(product => ({ ...product, category: 'cake-pops' }))
      ];
      
      const keywords = searchQuery.toLowerCase().split(' ');
      
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
  
  const getRandomProducts = (products: Product[], count: number) => {
    const shuffled = [...products].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  return {
    query,
    recommendations,
    loading,
    showRecommendations,
    recentSearches,
    handleSearch
  };
};
