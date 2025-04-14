
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import ImageUploader from '@/components/ImageUploader';
import { toast } from 'sonner';

interface ProductEditorProps {
  product?: any;
  category: string;
  onSave: (product: any) => void;
  onCancel: () => void;
}

const ProductEditor: React.FC<ProductEditorProps> = ({ product, category, onSave, onCancel }) => {
  const [formData, setFormData] = useState<any>({
    id: '',
    name: '',
    description: '',
    image: '/placeholder.svg',
  });

  useEffect(() => {
    if (product) {
      setFormData({
        ...product,
      });
    }
  }, [product]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUploaded = (imageUrl: string) => {
    setFormData(prev => ({ ...prev, image: imageUrl }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.name.trim()) {
      toast.error("Product name is required");
      return;
    }

    // Generate ID if it's a new product
    const productToSave = {
      ...formData,
      id: formData.id || formData.name.toLowerCase().replace(/\s+/g, '-'),
    };

    // Add category-specific properties
    if (category === 'cakes') {
      productToSave.halfKgPrice = formData.halfKgPrice || '0';
      productToSave.oneKgPrice = formData.oneKgPrice || '0';
    } else if (category === 'brownies') {
      productToSave.perPiecePrice = formData.perPiecePrice || '0';
      productToSave.halfKgPrice = formData.halfKgPrice || '0';
      productToSave.oneKgPrice = formData.oneKgPrice || '0';
    } else {
      // For cupcakes, cake jars, cake pops
      productToSave.price = formData.price || '0';
    }

    onSave(productToSave);
    toast.success("Product saved successfully!");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/3">
          <ImageUploader 
            onImageUploaded={handleImageUploaded} 
            currentImage={formData.image}
          />
        </div>
        
        <div className="md:w-2/3 space-y-4">
          <div>
            <Label htmlFor="name">Product Name</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter product name"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description || ''}
              onChange={handleChange}
              placeholder="Enter product description"
              className="min-h-[100px]"
            />
          </div>
          
          {/* Price fields based on category */}
          {category === 'cakes' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="halfKgPrice">Half Kg Price (₹)</Label>
                <Input
                  id="halfKgPrice"
                  name="halfKgPrice"
                  value={formData.halfKgPrice || ''}
                  onChange={handleChange}
                  type="number"
                  placeholder="0"
                />
              </div>
              <div>
                <Label htmlFor="oneKgPrice">One Kg Price (₹)</Label>
                <Input
                  id="oneKgPrice"
                  name="oneKgPrice"
                  value={formData.oneKgPrice || ''}
                  onChange={handleChange}
                  type="number"
                  placeholder="0"
                />
              </div>
            </div>
          )}
          
          {category === 'brownies' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="perPiecePrice">Per Piece Price (₹)</Label>
                <Input
                  id="perPiecePrice"
                  name="perPiecePrice"
                  value={formData.perPiecePrice || ''}
                  onChange={handleChange}
                  type="number"
                  placeholder="0"
                />
              </div>
              <div>
                <Label htmlFor="halfKgPrice">Half Kg Price (₹)</Label>
                <Input
                  id="halfKgPrice"
                  name="halfKgPrice"
                  value={formData.halfKgPrice || ''}
                  onChange={handleChange}
                  type="number"
                  placeholder="0"
                />
              </div>
              <div>
                <Label htmlFor="oneKgPrice">One Kg Price (₹)</Label>
                <Input
                  id="oneKgPrice"
                  name="oneKgPrice"
                  value={formData.oneKgPrice || ''}
                  onChange={handleChange}
                  type="number"
                  placeholder="0"
                />
              </div>
            </div>
          )}
          
          {(category === 'cupcakes' || category === 'cake-jars' || category === 'cake-pops') && (
            <div>
              <Label htmlFor="price">Price (₹)</Label>
              <Input
                id="price"
                name="price"
                value={formData.price || ''}
                onChange={handleChange}
                type="number"
                placeholder="0"
              />
            </div>
          )}
        </div>
      </div>
      
      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          Save Product
        </Button>
      </div>
    </form>
  );
};

export default ProductEditor;
