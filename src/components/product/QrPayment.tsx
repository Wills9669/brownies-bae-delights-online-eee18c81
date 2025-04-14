
import { Button } from '@/components/ui/button';
import { Phone } from 'lucide-react';

interface QrPaymentProps {
  product: any;
  quantity: number;
  getSizeLabel: () => string;
  getPrice: () => string;
  handlePaymentComplete: () => void;
  setShowQrPayment: (show: boolean) => void;
}

const QrPayment: React.FC<QrPaymentProps> = ({ 
  product, 
  quantity, 
  getSizeLabel,
  getPrice,
  handlePaymentComplete, 
  setShowQrPayment 
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Complete Your Payment</h2>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2 flex flex-col items-center justify-center">
          <div className="bg-white p-4 rounded-lg border shadow-sm mb-4 max-w-sm">
            <img 
              src="/lovable-uploads/6f4f7dfd-2459-44c6-8044-806be30dac1f.png" 
              alt="Payment QR Code" 
              className="w-full object-contain"
            />
          </div>
          <p className="text-center text-gray-700 mb-2">
            <span className="font-semibold">UPI ID:</span> abhimanyuswa6996@oksbi
          </p>
          <p className="text-center text-gray-700 mb-4">
            Scan to pay with any UPI app
          </p>
        </div>
        
        <div className="md:w-1/2">
          <div className="bg-gray-50 p-6 rounded-lg mb-6">
            <h3 className="font-bold text-lg mb-4">Order Summary</h3>
            <div className="mb-4 pb-4 border-b">
              <div className="flex justify-between mb-2">
                <span>Product:</span>
                <span className="font-medium">{product.name}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Size:</span>
                <span>{getSizeLabel()}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Quantity:</span>
                <span>{quantity}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Price:</span>
                <span>₹{getPrice()} per {getSizeLabel()}</span>
              </div>
            </div>
            <div className="flex justify-between text-lg font-bold">
              <span>Total:</span>
              <span>₹{parseFloat(getPrice()) * quantity}</span>
            </div>
          </div>
          
          <div className="flex flex-col gap-4">
            <Button onClick={handlePaymentComplete} className="py-6">
              Confirm Payment
            </Button>
            <Button variant="outline" onClick={() => setShowQrPayment(false)}>
              Cancel
            </Button>
            <div className="flex items-center justify-center mt-2 gap-2 text-gray-600">
              <Phone size={18} />
              <span>Need help? Call <a href="tel:9585329788" className="text-pink-dark font-semibold">9585329788</a></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QrPayment;
