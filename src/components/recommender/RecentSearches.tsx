
import { useEffect, useState } from 'react';
import { Clock, X } from 'lucide-react';

interface RecentSearchesProps {
  searches: string[];
  onSearchClick: (search: string) => void;
}

const RecentSearches = ({ searches, onSearchClick }: RecentSearchesProps) => {
  const [localSearches, setLocalSearches] = useState<string[]>(searches);

  useEffect(() => {
    setLocalSearches(searches);
  }, [searches]);

  if (!localSearches.length) return null;
  
  const handleClearSearch = (e: React.MouseEvent, search: string) => {
    e.stopPropagation();
    // We're just removing from local state here
    // The parent component should handle actual removal if needed
    setLocalSearches(prevSearches => prevSearches.filter(s => s !== search));
  };

  return (
    <div className="mt-6 pt-6 border-t border-gray-100">
      <div className="flex items-center gap-2 mb-3">
        <Clock className="text-gray-400" size={16} />
        <p className="text-sm text-gray-600">Recent searches:</p>
      </div>
      <div className="flex flex-wrap gap-2 animate-in fade-in duration-300">
        {localSearches.map((search) => (
          <button
            key={search}
            onClick={() => onSearchClick(search)}
            className="group flex items-center gap-1 text-sm px-3 py-1.5 rounded-full bg-gray-100 text-gray-600 hover:bg-pink-light hover:text-pink-dark transition-all duration-300 hover:shadow-sm"
            title={`Search for "${search}"`}
          >
            <span>{search}</span>
            <span 
              onClick={(e) => handleClearSearch(e, search)}
              className="opacity-0 group-hover:opacity-100 ml-1 hover:bg-gray-200 rounded-full p-0.5 transition-opacity"
              title="Remove from history"
            >
              <X size={14} className="text-gray-500" />
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default RecentSearches;
