
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import Index from "./pages/Index";
import BrowniesPage from "./pages/BrowniesPage";
import CakesPage from "./pages/CakesPage";
import CupcakesPage from "./pages/CupcakesPage";
import CakeJarsPage from "./pages/CakeJarsPage";
import CakePopsPage from "./pages/CakePopsPage";
import OtherProductsPage from "./pages/OtherProductsPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import ProductsManagementPage from "./pages/Admin/ProductsManagementPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CartProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/brownies" element={<BrowniesPage />} />
            <Route path="/cakes" element={<CakesPage />} />
            <Route path="/cupcakes" element={<CupcakesPage />} />
            <Route path="/cake-jars" element={<CakeJarsPage />} />
            <Route path="/cake-pops" element={<CakePopsPage />} />
            <Route path="/other-products" element={<OtherProductsPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/product/:category/:id" element={<ProductDetailPage />} />
            <Route path="/admin/products" element={<ProductsManagementPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
