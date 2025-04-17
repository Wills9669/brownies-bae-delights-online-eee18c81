
import { useState, useEffect } from 'react';
import { browniesList, cakesList } from '@/data/index';

export const useProductDetail = (category: string | undefined, id: string | undefined) => {
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('per_piece'); // For brownies: per_piece, half_kg, one_kg

  useEffect(() => {
    setLoading(true);
    
    // Find product based on category and id
    let foundProduct = null;
    if (category === 'brownies') {
      foundProduct = browniesList.find(item => item.id === id);
      if (foundProduct) {
        // Set random related products (4 other brownies)
        const related = browniesList
          .filter(item => item.id !== id)
          .sort(() => 0.5 - Math.random())
          .slice(0, 4);
        setRelatedProducts(related);
      }
    } else if (category === 'cakes') {
      foundProduct = cakesList.find(item => item.id === id);
      if (foundProduct) {
        // Set random related products (4 other cakes)
        const related = cakesList
          .filter(item => item.id !== id)
          .sort(() => 0.5 - Math.random())
          .slice(0, 4);
        setRelatedProducts(related);
      }
    }
    
    if (foundProduct) {
      setProduct(foundProduct);
      
      // Set appropriate default size
      if (category === 'brownies') {
        setSelectedSize('per_piece');
      } else if (category === 'cakes') {
        setSelectedSize('half_kg');
      }
    }
    
    setLoading(false);
  }, [category, id]);

  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };
  
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };
  
  const getPrice = () => {
    if (category === 'brownies') {
      switch (selectedSize) {
        case 'per_piece': return product.perPiecePrice;
        case 'half_kg': return product.halfKgPrice;
        case 'one_kg': return product.oneKgPrice;
        default: return product.perPiecePrice;
      }
    } else {
      // For cakes
      switch (selectedSize) {
        case 'half_kg': return product.halfKgPrice;
        case 'one_kg': return product.oneKgPrice;
        default: return product.halfKgPrice;
      }
    }
  };
  
  const getSizeLabel = () => {
    if (category === 'brownies') {
      switch (selectedSize) {
        case 'per_piece': return 'Per Piece';
        case 'half_kg': return 'Half Kg';
        case 'one_kg': return 'One Kg';
        default: return 'Per Piece';
      }
    } else {
      // For cakes
      switch (selectedSize) {
        case 'half_kg': return 'Half Kg';
        case 'one_kg': return 'One Kg';
        default: return 'Half Kg';
      }
    }
  };

  return {
    product,
    loading,
    relatedProducts,
    quantity,
    selectedSize,
    setSelectedSize,
    incrementQuantity,
    decrementQuantity,
    getPrice,
    getSizeLabel
  };
};
