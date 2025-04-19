
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const CallToAction = () => {
  return (
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
  );
};

export default CallToAction;
