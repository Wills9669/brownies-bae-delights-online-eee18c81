
import { Link } from 'react-router-dom';
import { Cookie, Cake, PieChart, CakeSlice } from 'lucide-react';

const CategorySection = () => {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10">Our Product Categories</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          <CategoryCard
            to="/brownies"
            icon={<Cookie className="h-14 w-14 mx-auto mb-4 text-pink-dark" />}
            title="Brownies"
            description="Rich and fudgy handcrafted brownies"
          />
          <CategoryCard
            to="/cakes"
            icon={<Cake className="h-14 w-14 mx-auto mb-4 text-pink-dark" />}
            title="Cakes"
            description="Special divine cakes for every occasion"
          />
          <CategoryCard
            to="/cupcakes"
            icon={<PieChart className="h-14 w-14 mx-auto mb-4 text-pink-dark" />}
            title="Cupcakes"
            description="Delicious bite-sized frosted cupcakes"
          />
          <CategoryCard
            to="/cake-jars"
            icon={<CakeSlice className="h-14 w-14 mx-auto mb-4 text-pink-dark" />}
            title="Cake Jars"
            description="Layered desserts in convenient jars"
          />
          <CategoryCard
            to="/cake-pops"
            icon={<CakeSlice className="h-14 w-14 mx-auto mb-4 text-pink-dark transform rotate-45" />}
            title="Cake Pops"
            description="Fun bite-sized cake pops on a stick"
          />
        </div>
      </div>
    </section>
  );
};

const CategoryCard = ({ to, icon, title, description }: { to: string; icon: React.ReactNode; title: string; description: string }) => (
  <Link to={to} className="bg-pink-light rounded-lg p-6 text-center hover:shadow-md transition-transform hover:scale-105 duration-300">
    {icon}
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600 text-sm">{description}</p>
  </Link>
);

export default CategorySection;
