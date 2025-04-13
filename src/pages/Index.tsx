
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Star } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import { browniesList, cakesList } from '@/data/products';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Index = () => {
  const [featuredBrownies, setFeaturedBrownies] = useState<any[]>([]);
  const [featuredCakes, setFeaturedCakes] = useState<any[]>([]);

  useEffect(() => {
    // Select 4 random brownies and cakes for featured products
    const randomBrownies = [...browniesList].sort(() => 0.5 - Math.random()).slice(0, 4);
    const randomCakes = [...cakesList].sort(() => 0.5 - Math.random()).slice(0, 4);
    
    setFeaturedBrownies(randomBrownies);
    setFeaturedCakes(randomCakes);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="hero-pattern py-16 md:py-24">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Delicious <span className="text-pink-dark">Handcrafted</span> Brownies & Cakes
            </h1>
            <p className="text-lg mb-8 text-gray-700">
              Indulge in our premium brownies and cakes made with the finest ingredients. Perfect for any occasion or just to treat yourself!
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="text-base">
                <Link to="/brownies">Order Brownies</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-base border-pink-dark text-pink-dark hover:bg-pink-dark hover:text-white">
                <Link to="/cakes">Explore Cakes</Link>
              </Button>
            </div>
          </div>
          <div className="md:w-1/2 grid grid-cols-2 gap-4">
            <div className="animate-float">
              <img
                src="/lovable-uploads/f71f3e41-32b2-45d7-831e-b7b13bd1d6d1.png"
                alt="Chocolate cake with cherries"
                className="rounded-lg shadow-lg h-48 w-full object-cover"
              />
            </div>
            <div className="animate-float" style={{ animationDelay: "1s" }}>
              <img
                src="/lovable-uploads/23baadb0-5374-498e-89f0-bfe78200b65e.png"
                alt="Purple cream cake"
                className="rounded-lg shadow-lg h-48 w-full object-cover"
              />
            </div>
            <div className="animate-float" style={{ animationDelay: "1.5s" }}>
              <img
                src="/lovable-uploads/f10d9d01-5a6c-42a6-a63d-b36c0ae8ff85.png"
                alt="Peanut butter brownies"
                className="rounded-lg shadow-lg h-48 w-full object-cover"
              />
            </div>
            <div className="animate-float" style={{ animationDelay: "0.5s" }}>
              <img
                src="/lovable-uploads/80b2e418-4b8f-4bc1-a409-fa99c49e591e.png"
                alt="Butterscotch cake"
                className="rounded-lg shadow-lg h-48 w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Brownies */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Featured Brownies</h2>
            <Button asChild variant="ghost" className="text-pink-dark hover:text-pink-dark">
              <Link to="/brownies" className="flex items-center gap-2">
                View All <ArrowRight size={18} />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {featuredBrownies.map((brownie) => (
              <ProductCard 
                key={brownie.id}
                id={brownie.id}
                name={brownie.name}
                price={brownie.perPiecePrice}
                image={brownie.image}
                category="brownies"
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* Featured Cakes */}
      <section className="py-12 bg-pink-light">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Special Divine Cakes</h2>
            <Button asChild variant="ghost" className="text-pink-dark hover:text-pink-dark">
              <Link to="/cakes" className="flex items-center gap-2">
                View All <ArrowRight size={18} />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {featuredCakes.map((cake) => (
              <ProductCard 
                key={cake.id}
                id={cake.id}
                name={cake.name}
                price={cake.halfKgPrice}
                image={cake.image}
                category="cakes"
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10">What Our Customers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-pink-light p-6 rounded-lg shadow-md">
                <div className="flex text-yellow-400 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={18} fill="currentColor" />
                  ))}
                </div>
                <p className="mb-4 text-gray-700">
                  "The brownies from Brownies Bae are absolutely divine! Perfect texture, rich flavor, and just the right amount of sweetness. Will definitely order again!"
                </p>
                <p className="font-medium">- Happy Customer</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-pink to-pink-dark text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Order?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Place your order now for delicious brownies and cakes. Custom orders available 24/7!
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="lg" variant="secondary" className="text-pink-dark">
              <Link to="/brownies">Order Brownies</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-pink-dark">
              <Link to="/cakes">Order Cakes</Link>
            </Button>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
