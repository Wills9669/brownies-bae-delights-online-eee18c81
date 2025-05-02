
import React from 'react';

interface SearchSuggestionsProps {
  suggestions: string[];
  onSuggestionClick: (suggestion: string) => void;
}

const SearchSuggestions = ({ suggestions, onSuggestionClick }: SearchSuggestionsProps) => {
  if (!suggestions.length) return null;

  return (
    <div className="mt-4">
      <p className="text-sm text-gray-600 mb-2">Try searching for:</p>
      <div className="flex flex-wrap gap-2">
        {suggestions.map((phrase) => (
          <button
            key={phrase}
            onClick={() => onSuggestionClick(phrase)}
            className="text-sm px-3 py-1 rounded-full bg-pink-light text-pink-dark hover:bg-pink-dark hover:text-white transition-colors"
          >
            {phrase}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchSuggestions;
