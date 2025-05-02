
import { Sparkles } from 'lucide-react';
import { useProductRecommender } from '@/hooks/useProductRecommender';
import SearchBar from '@/components/recommender/SearchBar';
import SearchSuggestions from '@/components/recommender/SearchSuggestions';
import RecentSearches from '@/components/recommender/RecentSearches';
import RecommendationResults from '@/components/recommender/RecommendationResults';

const ProductRecommender = () => {
  const {
    query,
    recommendations,
    loading,
    showRecommendations,
    recentSearches,
    handleSearch
  } = useProductRecommender();

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
        
        <SearchBar onSearch={handleSearch} loading={loading} />

        {!loading && !showRecommendations && (
          <SearchSuggestions 
            suggestions={suggestionPhrases} 
            onSuggestionClick={handleSearch}
          />
        )}
      </div>
      
      <RecommendationResults 
        recommendations={recommendations}
        showRecommendations={showRecommendations}
      />

      {!loading && !showRecommendations && (
        <RecentSearches 
          searches={recentSearches} 
          onSearchClick={handleSearch} 
        />
      )}
    </div>
  );
};

export default ProductRecommender;
