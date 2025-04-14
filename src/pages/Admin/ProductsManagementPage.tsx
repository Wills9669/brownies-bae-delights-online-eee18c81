
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import ProductEditor from '@/components/product/ProductEditor';
import { cakesList, browniesList, cupcakesList, cakeJarsList, cakePopsList } from '@/data/index';
import { PlusCircle, Pencil, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

const ProductsManagementPage = () => {
  const [activeTab, setActiveTab] = useState('cakes');
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<any>(null);
  
  // In a real app, these would be connected to your backend
  const productLists = {
    cakes: [...cakesList],
    brownies: [...browniesList],
    cupcakes: [...cupcakesList],
    'cake-jars': [...cakeJarsList],
    'cake-pops': [...cakePopsList]
  };
  
  const handleEdit = (product: any) => {
    setCurrentProduct(product);
    setIsEditorOpen(true);
  };
  
  const handleNew = () => {
    setCurrentProduct(null);
    setIsEditorOpen(true);
  };
  
  const handleSave = (product: any) => {
    console.log('Saving product:', product);
    // In a real app, this would save to your backend
    toast.success(`Product ${product.name} saved successfully!`);
    setIsEditorOpen(false);
  };
  
  const handleDelete = (productId: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      // In a real app, this would delete from your backend
      console.log('Deleting product:', productId);
      toast.success('Product deleted successfully!');
    }
  };

  const categoryLabels: Record<string, string> = {
    'cakes': 'Cakes',
    'brownies': 'Brownies',
    'cupcakes': 'Cupcakes',
    'cake-jars': 'Cake Jars',
    'cake-pops': 'Cake Pops'
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow bg-pink-light py-8">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold">Product Management</h1>
              <Button onClick={handleNew}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add New {categoryLabels[activeTab] || 'Product'}
              </Button>
            </div>
            
            <Tabs defaultValue="cakes" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-3 md:grid-cols-5 mb-6">
                <TabsTrigger value="cakes">Cakes</TabsTrigger>
                <TabsTrigger value="brownies">Brownies</TabsTrigger>
                <TabsTrigger value="cupcakes">Cupcakes</TabsTrigger>
                <TabsTrigger value="cake-jars">Cake Jars</TabsTrigger>
                <TabsTrigger value="cake-pops">Cake Pops</TabsTrigger>
              </TabsList>
              
              {Object.keys(productLists).map((category) => (
                <TabsContent key={category} value={category} className="space-y-4">
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="px-4 py-3 text-left">Image</th>
                          <th className="px-4 py-3 text-left">Name</th>
                          <th className="px-4 py-3 text-left">
                            {category === 'cakes' || category === 'brownies' ? 'Half Kg Price' : 'Price'}
                          </th>
                          <th className="px-4 py-3 text-left">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {productLists[category as keyof typeof productLists].map((product: any) => (
                          <tr key={product.id} className="border-t hover:bg-gray-50">
                            <td className="px-4 py-3">
                              <div className="h-12 w-12 rounded overflow-hidden">
                                <img 
                                  src={product.image} 
                                  alt={product.name} 
                                  className="h-full w-full object-cover"
                                />
                              </div>
                            </td>
                            <td className="px-4 py-3">{product.name}</td>
                            <td className="px-4 py-3">
                              ₹{category === 'cakes' || category === 'brownies' 
                                ? product.halfKgPrice 
                                : product.price}
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-2">
                                <Button size="sm" variant="ghost" onClick={() => handleEdit(product)}>
                                  <Pencil size={16} />
                                </Button>
                                <Button size="sm" variant="ghost" onClick={() => handleDelete(product.id)}>
                                  <Trash2 size={16} />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </div>
      </div>
      
      <Dialog open={isEditorOpen} onOpenChange={setIsEditorOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>
              {currentProduct ? `Edit ${currentProduct.name}` : `Add New ${categoryLabels[activeTab]}`}
            </DialogTitle>
          </DialogHeader>
          <ProductEditor 
            product={currentProduct}
            category={activeTab}
            onSave={handleSave}
            onCancel={() => setIsEditorOpen(false)}
          />
        </DialogContent>
      </Dialog>
      
      <Footer />
    </div>
  );
};

export default ProductsManagementPage;
