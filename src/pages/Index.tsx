
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Star, Cookie, CakeSlice, Cake, PieChart, MapPin, Truck, Bot, Search } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import { browniesList, cakesList, cupcakesList, cakeJarsList, cakePopsList } from '@/data/index';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductRecommender from '@/components/ProductRecommender';

const Index = () => {
  const [featuredBrownies, setFeaturedBrownies] = useState<any[]>([]);
  const [featuredCakes, setFeaturedCakes] = useState<any[]>([]);
  const [featuredCupcakes, setFeaturedCupcakes] = useState<any[]>([]);
  
  useEffect(() => {
    const randomBrownies = [...browniesList].sort(() => 0.5 - Math.random()).slice(0, 4);
    const randomCakes = [...cakesList].sort(() => 0.5 - Math.random()).slice(0, 4);
    const randomCupcakes = [...cupcakesList].sort(() => 0.5 - Math.random()).slice(0, 4);
    
    setFeaturedBrownies(randomBrownies);
    setFeaturedCakes(randomCakes);
    setFeaturedCupcakes(randomCupcakes);
  }, []);
  
  return <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="hero-pattern py-16 md:py-24">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Delicious <span className="text-pink-dark">Handcrafted</span> Desserts
            </h1>
            <p className="text-lg mb-4 text-gray-700">
              Indulge in our premium brownies, cakes, cupcakes and more made with the finest ingredients. Perfect for any occasion or just to treat yourself!
            </p>
            <div className="flex items-center text-gray-700 mb-6">
              <MapPin className="text-pink-dark mr-2" size={18} />
              <span>Now available in Coimbatore | Free delivery on orders above ₹500</span>
            </div>
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
              <img alt="Chocolate cake with cherries" className="rounded-lg shadow-lg h-48 w-full object-cover" src="/lovable-uploads/6396d276-59ba-4efc-b8be-0ef08b153f5e.jpg" />
            </div>
            <div className="animate-float" style={{
            animationDelay: "1s"
          }}>
              <img alt="Chocolate cupcakes" className="rounded-lg shadow-lg h-48 w-full object-cover" src="/lovable-uploads/ea39afb1-82f4-49c9-ac8b-2eeeb3a9da79.jpg" />
            </div>
            <div className="animate-float" style={{
            animationDelay: "1.5s"
          }}>
              <img alt="Peanut butter brownies" className="rounded-lg shadow-lg h-48 w-full object-cover" src="/lovable-uploads/757f397b-a3ba-42ef-b743-3059f8842595.jpg" />
            </div>
            <div className="animate-float" style={{
            animationDelay: "0.5s"
          }}>
              <img alt="Red velvet cupcakes" className="rounded-lg shadow-lg h-48 w-full object-cover" src="/lovable-uploads/c4975858-5a54-48d0-b866-548b360525d0.jpg" />
            </div>
          </div>
        </div>
      </section>
      
      {/* AI Recommender Section */}
      <section className="py-12 bg-gradient-to-r from-pink-light to-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-3 mb-8">
            <Bot size={28} className="text-pink-dark" />
            <h2 className="text-3xl font-bold text-center">Let Our Dessert AI Recommend You Something Sweet</h2>
          </div>
          <ProductRecommender />
        </div>
      </section>
      
      {/* Product Categories */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10">Our Product Categories</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            <Link to="/brownies" className="bg-pink-light rounded-lg p-6 text-center hover:shadow-md transition-transform hover:scale-105 duration-300">
              <Cookie className="h-14 w-14 mx-auto mb-4 text-pink-dark" />
              <h3 className="text-xl font-semibold mb-2">Brownies</h3>
              <p className="text-gray-600 text-sm">Rich and fudgy handcrafted brownies</p>
            </Link>
            <Link to="/cakes" className="bg-pink-light rounded-lg p-6 text-center hover:shadow-md transition-transform hover:scale-105 duration-300">
              <Cake className="h-14 w-14 mx-auto mb-4 text-pink-dark" />
              <h3 className="text-xl font-semibold mb-2">Cakes</h3>
              <p className="text-gray-600 text-sm">Special divine cakes for every occasion</p>
            </Link>
            <Link to="/cupcakes" className="bg-pink-light rounded-lg p-6 text-center hover:shadow-md transition-transform hover:scale-105 duration-300">
              <PieChart className="h-14 w-14 mx-auto mb-4 text-pink-dark" />
              <h3 className="text-xl font-semibold mb-2">Cupcakes</h3>
              <p className="text-gray-600 text-sm">Delicious bite-sized frosted cupcakes</p>
            </Link>
            <Link to="/cake-jars" className="bg-pink-light rounded-lg p-6 text-center hover:shadow-md transition-transform hover:scale-105 duration-300">
              <CakeSlice className="h-14 w-14 mx-auto mb-4 text-pink-dark" />
              <h3 className="text-xl font-semibold mb-2">Cake Jars</h3>
              <p className="text-gray-600 text-sm">Layered desserts in convenient jars</p>
            </Link>
            <Link to="/cake-pops" className="bg-pink-light rounded-lg p-6 text-center hover:shadow-md transition-transform hover:scale-105 duration-300">
              <CakeSlice className="h-14 w-14 mx-auto mb-4 text-pink-dark transform rotate-45" />
              <h3 className="text-xl font-semibold mb-2">Cake Pops</h3>
              <p className="text-gray-600 text-sm">Fun bite-sized cake pops on a stick</p>
            </Link>
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
            {featuredBrownies.map(brownie => <ProductCard key={brownie.id} id={brownie.id} name={brownie.name} price={brownie.perPiecePrice} image={brownie.image} category="brownies" />)}
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
            {featuredCakes.map(cake => <ProductCard key={cake.id} id={cake.id} name={cake.name} price={cake.halfKgPrice} image={cake.image} category="cakes" />)}
          </div>
        </div>
      </section>
      
      {/* Featured Cupcakes */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Delicious Cupcakes</h2>
            <Button asChild variant="ghost" className="text-pink-dark hover:text-pink-dark">
              <Link to="/cupcakes" className="flex items-center gap-2">
                View All <ArrowRight size={18} />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {featuredCupcakes.map(cupcake => <ProductCard key={cupcake.id} id={cupcake.id} name={cupcake.name} price={cupcake.price} image={cupcake.image} category="other" description={cupcake.description} />)}
          </div>
        </div>
      </section>
      
      {/* Delivery Information */}
      <section className="py-12 bg-pink-light">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 max-w-5xl mx-auto">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-4">Delivery in Coimbatore</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-white p-2 rounded-full">
                    <Truck size={24} className="text-pink-dark" />
                  </div>
                  <div>
                    <h3 className="font-bold">Same Day Delivery</h3>
                    <p className="text-gray-700">Order before 2 PM for same-day delivery</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-white p-2 rounded-full">
                    <MapPin size={24} className="text-pink-dark" />
                  </div>
                  <div>
                    <h3 className="font-bold">Delivery Areas</h3>
                    <p className="text-gray-700">We deliver across Coimbatore City and nearby areas</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-white p-2 rounded-full">
                    <Star size={24} className="text-pink-dark" />
                  </div>
                  <div>
                    <h3 className="font-bold">Delivery Charges</h3>
                    <p className="text-gray-700">₹50 for orders below ₹500</p>
                    <p className="text-gray-700">FREE delivery for orders above ₹500</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <img 
                src="/lovable-uploads/693e7311-0892-452c-9029-18005da57c5e.jpg" 
                alt="Dessert delivery" 
                className="rounded-lg shadow-lg max-w-xs w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10">What Our Customers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-pink-light p-6 rounded-lg shadow-md transform transition-transform hover:scale-105">
              <div className="flex text-yellow-400 mb-3">
                {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="currentColor" />)}
              </div>
              <p className="mb-4 text-gray-700">
                "The chocolate brownies were an absolute delight! So fudgy and rich. The delivery was prompt and the packaging was beautiful. Will definitely order again!"
              </p>
              <p className="font-medium">- Priya S., Coimbatore</p>
            </div>
            <div className="bg-pink-light p-6 rounded-lg shadow-md transform transition-transform hover:scale-105">
              <div className="flex text-yellow-400 mb-3">
                {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="currentColor" />)}
              </div>
              <p className="mb-4 text-gray-700">
                "I ordered the red velvet cake for my daughter's birthday and it was a huge hit! The texture was perfect and the cream cheese frosting was divine. Thank you for making her day special!"
              </p>
              <p className="font-medium">- Rajesh M., RS Puram</p>
            </div>
            <div className="bg-pink-light p-6 rounded-lg shadow-md transform transition-transform hover:scale-105">
              <div className="flex text-yellow-400 mb-3">
                {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="currentColor" />)}
              </div>
              <p className="mb-4 text-gray-700">
                "The cake pops were adorable and delicious! My kids loved them. The personalized recommendation from your AI was spot on - exactly what we were looking for. Amazing service!"
              </p>
              <p className="font-medium">- Lakshmi V., Gandhipuram</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-pink to-pink-dark text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Order?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Place your order now for delicious brownies, cakes, cupcakes and more. Custom orders available 24/7!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" variant="secondary" className="text-pink-dark">
              <Link to="/brownies">Order Brownies</Link>
            </Button>
            <Button asChild size="lg" variant="secondary" className="text-pink-dark">
              <Link to="/cakes">Order Cakes</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-pink-dark">
              <Link to="/cupcakes">Order Cupcakes</Link>
            </Button>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>;
};
export default Index;
