
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { cupcakesList } from '@/data/index';
import { Button } from '@/components/ui/button';
import { Search, SlidersHorizontal, X } from 'lucide-react';

const CupcakesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100]);
  
  // Filter cupcakes based on search term and price range
  const filteredCupcakes = cupcakesList.filter((cupcake) => {
    const matchesSearch = cupcake.name.toLowerCase().includes(searchTerm.toLowerCase());
    const price = parseInt(cupcake.price);
    const matchesPrice = price >= priceRange[0] && price <= priceRange[1];
    return matchesSearch && matchesPrice;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Page Header */}
      <div className="bg-gradient-to-r from-pink to-pink-dark py-12 px-4">
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold text-white text-center mb-6">Cupcakes</h1>
          <p className="text-white text-center max-w-2xl mx-auto">
            Our delicious cupcakes are perfect for any occasion. Each cupcake is made with premium ingredients and topped with our signature frosting.
          </p>
        </div>
      </div>
      
      {/* Search and Filter */}
      <div className="bg-white py-6 px-4 shadow-md">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row gap-4 justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search cupcakes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-pink-dark"
              />
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X size={16} />
                </button>
              )}
            </div>
            
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2"
            >
              <SlidersHorizontal size={18} />
              Filters {showFilters ? '(Hide)' : '(Show)'}
            </Button>
          </div>
          
          {/* Filter Options */}
          {showFilters && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-medium mb-3">Price Range (₹)</h3>
              <div className="flex gap-4 items-center">
                <input
                  type="number"
                  value={priceRange[0]}
                  onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                  className="w-24 p-2 border border-gray-300 rounded"
                  min="0"
                  max={priceRange[1]}
                />
                <span>to</span>
                <input
                  type="number"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="w-24 p-2 border border-gray-300 rounded"
                  min={priceRange[0]}
                />
                <Button 
                  variant="secondary" 
                  size="sm"
                  onClick={() => setPriceRange([0, 100])}
                >
                  Reset
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Products Grid */}
      <div className="flex-grow bg-pink-light py-12">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Our Cupcake Collection</h2>
            <p className="text-gray-600">Each cupcake is handcrafted with love and the finest ingredients.</p>
          </div>
          
          {filteredCupcakes.length > 0 ? (
            <>
              <p className="text-gray-600 mb-8">{filteredCupcakes.length} products found</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredCupcakes.map((cupcake) => (
                  <ProductCard 
                    key={cupcake.id}
                    id={cupcake.id}
                    name={cupcake.name}
                    price={cupcake.price}
                    image={cupcake.image}
                    category="other"
                    description={cupcake.description}
                  />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-2xl font-medium mb-2">No cupcakes found</h3>
              <p className="text-gray-600 mb-6">Try adjusting your filters or search term.</p>
              <Button onClick={() => {setSearchTerm(''); setPriceRange([0, 100]);}}>
                Reset Filters
              </Button>
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default CupcakesPage;
