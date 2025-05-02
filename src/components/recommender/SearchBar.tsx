
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Search, Bot } from 'lucide-react';
import { toast } from 'sonner';

interface SearchBarProps {
  onSearch: (query: string) => void;
  loading: boolean;
}

const SearchBar = ({ onSearch, loading }: SearchBarProps) => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    if (!query.trim()) {
      toast.error("Please enter what you're looking for!");
      return;
    }
    onSearch(query);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
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
  );
};

export default SearchBar;
