import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
const AboutPage = () => {
  return <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Header */}
      <div className="bg-gradient-to-r from-pink to-pink-dark py-12 px-4">
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold text-white text-center">About Us</h1>
        </div>
      </div>
      
      {/* About Content */}
      <div className="flex-grow bg-pink-light py-12">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg shadow-md p-8 max-w-4xl mx-auto">
            <div className="mb-8">
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <p className="text-gray-700 mb-4">
                Brownies Bae was born out of a passion for creating delicious, homemade treats that bring joy to people's lives. What started as a small home kitchen experiment has grown into a beloved bakery known for our exceptional brownies and cakes.
              </p>
              <p className="text-gray-700">
                Every item we create is made with love, using only the finest ingredients. We believe in quality over quantity and take pride in the care and attention we put into each brownie and cake.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <img alt="Chocolate cake" className="rounded-lg shadow-md h-64 w-full object-cover" src="/lovable-uploads/720f7c79-925d-41aa-b78d-e2e11ce8d9c1.jpg" />
              <img src="/lovable-uploads/3df4beea-c1cf-4704-8484-a6feb0953155.png" alt="Chocolate brownies" className="rounded-lg shadow-md h-64 w-full object-cover" />
            </div>
            
            <div className="mb-8">
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-gray-700">
                At Brownies Bae, our mission is to create irresistible treats that bring moments of happiness to our customers. We strive to provide exceptional quality, innovative flavors, and excellent customer service. We believe in creating not just delicious brownies and cakes, but memorable experiences.
              </p>
            </div>
            
            <div className="mb-8">
              <h2 className="text-3xl font-bold mb-6">What Makes Us Special</h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Premium ingredients with no preservatives</li>
                <li>Handcrafted with love and attention to detail</li>
                <li>Wide variety of flavors to suit every palate</li>
                <li>Custom orders available 24/7</li>
                <li>Freshly baked for maximum flavor</li>
                <li>Commitment to customer satisfaction</li>
              </ul>
            </div>
            
            <div>
              <h2 className="text-3xl font-bold mb-6">Visit Us</h2>
              <p className="text-gray-700 mb-3">
                We'd love to hear from you! Reach out to us for custom orders, feedback, or just to say hello.
              </p>
              <p className="font-medium">
                Phone: <a href="tel:9585329788" className="text-pink-dark">9585329788</a>
              </p>
              <p className="font-medium text-base">
                Email: <a href="mailto:browniesbae6996@gmail.com" className="text-pink-dark">browniesbae6996@gmail.com</a>
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>;
};
export default AboutPage;