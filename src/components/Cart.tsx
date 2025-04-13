
import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { ShoppingCart, X, Plus, Minus, CreditCard, QrCode } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { toast } from 'sonner';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice } = useCart();
  const [showQrPayment, setShowQrPayment] = useState(false);

  const handleCheckout = () => {
    if (cart.length === 0) {
      toast.error("Your cart is empty");
      return;
    }
    setShowQrPayment(true);
  };

  const handlePaymentComplete = () => {
    toast.success("Order placed successfully!");
    clearCart();
    setShowQrPayment(false);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <ShoppingCart size={20} />
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-pink-dark text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader className="mb-4">
          <SheetTitle>Your Cart</SheetTitle>
          <SheetDescription>
            {cart.length === 0 ? 'Your cart is empty' : `You have ${totalItems} item(s) in your cart`}
          </SheetDescription>
        </SheetHeader>

        {showQrPayment ? (
          <div className="flex flex-col items-center justify-center space-y-4 mt-6">
            <h3 className="text-lg font-medium">Scan to Pay ₹{totalPrice}</h3>
            <img 
              src="/lovable-uploads/6f4f7dfd-2459-44c6-8044-806be30dac1f.png" 
              alt="Payment QR Code" 
              className="w-64 h-64 object-contain border rounded p-2"
            />
            <p className="text-sm text-center text-gray-600">
              UPI ID: abhimanyuswa6996@oksbi
            </p>
            <p className="text-sm text-center mt-2 mb-4">
              Scan to pay with any UPI app
            </p>
            <Button onClick={handlePaymentComplete} className="mt-4">
              Payment Complete
            </Button>
            <Button variant="outline" onClick={() => setShowQrPayment(false)} className="mt-2">
              Go Back
            </Button>
          </div>
        ) : (
          <>
            <div className="space-y-4 mt-2 mb-4">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-8">
                  <ShoppingCart size={64} className="text-gray-300 mb-4" />
                  <p className="text-gray-500 mb-4">Your cart is empty</p>
                  <SheetClose asChild>
                    <Button asChild>
                      <Link to="/brownies">Start Shopping</Link>
                    </Button>
                  </SheetClose>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={`${item.id}-${item.size}`} className="flex items-start gap-3 border-b pb-3">
                    <div className="h-16 w-16 overflow-hidden rounded-md">
                      <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <Link to={`/product/${item.category}/${item.id}`} className="font-medium hover:underline">
                          {item.name}
                        </Link>
                        <button onClick={() => removeFromCart(item.id, item.size)} className="text-gray-400 hover:text-red-500">
                          <X size={16} />
                        </button>
                      </div>
                      {item.size && <p className="text-sm text-gray-500">Size: {item.size}</p>}
                      <p className="text-sm font-medium mt-1">₹{item.price}</p>
                      <div className="flex items-center mt-1">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1, item.size)}
                          className="p-1 border rounded-l"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="px-2 py-1 border-y bg-white text-sm w-8 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1, item.size)}
                          className="p-1 border rounded-r"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <>
                <div className="space-y-1.5 py-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Total items</span>
                    <span>{totalItems}</span>
                  </div>
                  <div className="flex items-center justify-between font-semibold text-lg border-t pt-2">
                    <span>Total</span>
                    <span>₹{totalPrice}</span>
                  </div>
                </div>

                <SheetFooter className="mt-6 flex flex-col gap-2">
                  <Button onClick={handleCheckout} className="w-full">
                    <CreditCard className="mr-2 h-4 w-4" />
                    Checkout
                  </Button>
                  <Button variant="outline" onClick={() => clearCart()} className="w-full">
                    Clear Cart
                  </Button>
                </SheetFooter>
              </>
            )}
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default Cart;
