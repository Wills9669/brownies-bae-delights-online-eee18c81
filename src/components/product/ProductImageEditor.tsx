
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import ImageUploader from '@/components/ImageUploader';
import { toast } from 'sonner';
import { safelyStoreImage } from '@/utils/imageUtils';

interface ProductImageEditorProps {
  isOpen: boolean;
  onClose: () => void;
  onImageUpdate: (newImageUrl: string) => void;
  productName: string;
  productId: string;
  currentImage: string;
}

const ProductImageEditor = ({
  isOpen,
  onClose,
  onImageUpdate,
  productName,
  productId,
  currentImage,
}: ProductImageEditorProps) => {
  const handleImageUploaded = (newImageUrl: string) => {
    if (newImageUrl) {
      // Try to safely store in localStorage
      const stored = safelyStoreImage(`product-image-${productId}`, newImageUrl);
      
      if (stored) {
        onImageUpdate(newImageUrl);
        toast.success("Image updated successfully everywhere!");
        
        // Broadcast the change to all components
        window.dispatchEvent(new Event('storage'));
        window.dispatchEvent(new CustomEvent('productImageUpdated', { 
          detail: { productId }
        }));
      } else {
        toast.error("Failed to save image. The image may be too large.");
      }
    }
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogTitle>Edit Image for {productName}</DialogTitle>
        <DialogDescription>
          Upload a new image for this product. The image will be optimized automatically.
        </DialogDescription>
        <ImageUploader 
          onImageUploaded={handleImageUploaded}
          currentImage={currentImage}
        />
      </DialogContent>
    </Dialog>
  );
};

export default ProductImageEditor;
