
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { MapPin } from 'lucide-react';

const HeroSection = () => {
  return (
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
            <span>Now available in Coimbatore | Free delivery on orders above ₹2888</span>
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
          <div className="animate-float" style={{ animationDelay: "1s" }}>
            <img alt="Chocolate cupcakes" className="rounded-lg shadow-lg h-48 w-full object-cover" src="/lovable-uploads/ea39afb1-82f4-49c9-ac8b-2eeeb3a9da79.jpg" />
          </div>
          <div className="animate-float" style={{ animationDelay: "1.5s" }}>
            <img alt="Peanut butter brownies" className="rounded-lg shadow-lg h-48 w-full object-cover" src="/lovable-uploads/757f397b-a3ba-42ef-b743-3059f8842595.jpg" />
          </div>
          <div className="animate-float" style={{ animationDelay: "0.5s" }}>
            <img alt="Red velvet cupcakes" className="rounded-lg shadow-lg h-48 w-full object-cover" src="/lovable-uploads/c4975858-5a54-48d0-b866-548b360525d0.jpg" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
