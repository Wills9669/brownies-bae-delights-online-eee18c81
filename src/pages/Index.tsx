
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductRecommender from '@/components/ProductRecommender';
import HeroSection from '@/components/home/HeroSection';
import CategorySection from '@/components/home/CategorySection';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import DeliverySection from '@/components/home/DeliverySection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import CallToAction from '@/components/home/CallToAction';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <HeroSection />
      
      {/* AI Recommender Section */}
      <section className="py-12 bg-gradient-to-r from-pink-light to-white">
        <div className="container mx-auto px-4">
          <ProductRecommender />
        </div>
      </section>
      
      <CategorySection />
      <FeaturedProducts />
      <DeliverySection />
      <TestimonialsSection />
      <CallToAction />
      <Footer />
    </div>
  );
};

export default Index;
