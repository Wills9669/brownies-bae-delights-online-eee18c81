
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cupcakesList, cakeJarsList, cakePopsList } from '@/data/index';

const OtherProductsPage = () => {
  const [activeTab, setActiveTab] = useState('cupcakes');
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow bg-pink-light py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-2">Our Specialty Products</h1>
          <p className="text-center text-gray-600 mb-8">
            Indulge in our selection of specialty desserts made with love and premium ingredients
          </p>
          
          <Tabs defaultValue="cupcakes" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-3 mb-8 w-full sm:w-[400px] mx-auto">
              <TabsTrigger value="cupcakes">Cupcakes</TabsTrigger>
              <TabsTrigger value="cake-jars">Cake Jars</TabsTrigger>
              <TabsTrigger value="cake-pops">Cake Pops</TabsTrigger>
            </TabsList>
            
            <TabsContent value="cupcakes">
              <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-6">Our Cupcake Collection</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {cupcakesList.map((cupcake) => (
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
              </div>
            </TabsContent>
            
            <TabsContent value="cake-jars">
              <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-6">Our Cake Jars</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {cakeJarsList.map((jar) => (
                    <ProductCard 
                      key={jar.id}
                      id={jar.id}
                      name={jar.name}
                      price={jar.price}
                      image={jar.image}
                      category="other"
                    />
                  ))}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="cake-pops">
              <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-6">Our Cake Pops</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {cakePopsList.map((pop) => (
                    <ProductCard 
                      key={pop.id}
                      id={pop.id}
                      name={pop.name}
                      price={pop.price}
                      image={pop.image}
                      category="other"
                    />
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default OtherProductsPage;
