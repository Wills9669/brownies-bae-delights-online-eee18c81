
import { Star } from 'lucide-react';

const TestimonialsSection = () => {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10">What Our Customers Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <TestimonialCard
            text="The chocolate brownies were an absolute delight! So fudgy and rich. The delivery was prompt and the packaging was beautiful. Will definitely order again!"
            author="Priya S., Coimbatore"
          />
          <TestimonialCard
            text="I ordered the red velvet cake for my daughter's birthday and it was a huge hit! The texture was perfect and the cream cheese frosting was divine. Thank you for making her day special!"
            author="Rajesh M., RS Puram"
          />
          <TestimonialCard
            text="The cake pops were adorable and delicious! My kids loved them. The personalized recommendation from your AI was spot on - exactly what we were looking for. Amazing service!"
            author="Lakshmi V., Gandhipuram"
          />
        </div>
      </div>
    </section>
  );
};

const TestimonialCard = ({ text, author }: { text: string; author: string }) => (
  <div className="bg-pink-light p-6 rounded-lg shadow-md transform transition-transform hover:scale-105">
    <div className="flex text-yellow-400 mb-3">
      {[...Array(5)].map((_, i) => (
        <Star key={i} size={18} fill="currentColor" />
      ))}
    </div>
    <p className="mb-4 text-gray-700">{text}</p>
    <p className="font-medium">{author}</p>
  </div>
);

export default TestimonialsSection;
