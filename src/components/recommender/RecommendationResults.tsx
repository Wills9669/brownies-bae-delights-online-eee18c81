
import { Link } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';
import { getStoredImage } from '@/utils/imageUtils';

type Product = {
  id: string;
  name: string;
  description?: string;
  image: string;
  category: string;
};

interface RecommendationResultsProps {
  recommendations: Product[];
  showRecommendations: boolean;
}

const RecommendationResults = ({ recommendations, showRecommendations }: RecommendationResultsProps) => {
  if (!showRecommendations) return null;
  
  const getProductUrl = (product: Product) => `/product/${product.category}/${product.id}`;

  if (recommendations.length === 0) {
    return (
      <div className="text-center p-6 border border-pink-light rounded-md animate-fade-in">
        <p className="text-gray-700 mb-2">No exact matches found for your query.</p>
        <p className="text-sm text-gray-600">Try using different keywords or check out our suggested searches above!</p>
      </div>
    );
  }

  return (
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
                src={getStoredImage(product.id, product.image)} 
                alt={product.name} 
                className="w-full h-full object-cover transition-transform hover:scale-110"
                onError={(e) => {
                  e.currentTarget.src = product.image;
                }}
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
  );
};

export default RecommendationResults;
