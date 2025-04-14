
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const ProductLoading = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow flex items-center justify-center bg-pink-light">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-dark"></div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductLoading;
