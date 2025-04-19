
import { Truck, MapPin, Star } from 'lucide-react';

const DeliverySection = () => {
  return (
    <section className="py-12 bg-pink-light">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 max-w-5xl mx-auto">
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold mb-4">Delivery in Coimbatore</h2>
            <div className="space-y-4">
              <InfoCard
                icon={<Truck size={24} />}
                title="Same Day Delivery"
                description="Order before 2 PM for same-day delivery"
              />
              <InfoCard
                icon={<MapPin size={24} />}
                title="Delivery Areas"
                description="We deliver across Coimbatore City and nearby areas"
              />
              <InfoCard
                icon={<Star size={24} />}
                title="Delivery Charges"
                description={
                  <>
                    <p>Free Delivery Above 2888</p>
                    <p>According To The Locations</p>
                  </>
                }
              />
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
  );
};

const InfoCard = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: React.ReactNode }) => (
  <div className="flex items-start gap-3">
    <div className="bg-white p-2 rounded-full">
      <div className="text-pink-dark">{icon}</div>
    </div>
    <div>
      <h3 className="font-bold">{title}</h3>
      <div className="text-gray-700">{description}</div>
    </div>
  </div>
);

export default DeliverySection;
