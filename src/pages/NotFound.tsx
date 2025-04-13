
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow bg-pink-light flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <h1 className="text-7xl font-bold text-pink-dark mb-4">404</h1>
          <h2 className="text-2xl font-bold mb-4">Page Not Found</h2>
          <p className="text-gray-600 mb-8">
            We couldn't find the page you're looking for. The page might have been removed, renamed, or doesn't exist.
          </p>
          <Button asChild size="lg" className="flex items-center gap-2">
            <Link to="/">
              <Home size={18} />
              Back to Home
            </Link>
          </Button>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default NotFound;
