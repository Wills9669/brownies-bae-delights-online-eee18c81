
interface RecentSearchesProps {
  searches: string[];
  onSearchClick: (search: string) => void;
}

const RecentSearches = ({ searches, onSearchClick }: RecentSearchesProps) => {
  if (!searches.length) return null;
  
  return (
    <div className="mt-6 pt-6 border-t border-gray-100">
      <p className="text-sm text-gray-600 mb-2">Recent searches:</p>
      <div className="flex flex-wrap gap-2">
        {searches.map((search) => (
          <button
            key={search}
            onClick={() => onSearchClick(search)}
            className="text-sm px-3 py-1 rounded-full bg-gray-100 text-gray-600 hover:bg-pink-light hover:text-pink-dark transition-colors"
          >
            {search}
          </button>
        ))}
      </div>
    </div>
  );
};

export default RecentSearches;
