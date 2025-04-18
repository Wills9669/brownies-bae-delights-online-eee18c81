
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import ImageUploader from '@/components/ImageUploader';
import { toast } from 'sonner';

interface ProductImageEditorProps {
  isOpen: boolean;
  onClose: () => void;
  onImageUpdate: (newImageUrl: string) => void;
  productName: string;
  currentImage: string;
}

const ProductImageEditor = ({
  isOpen,
  onClose,
  onImageUpdate,
  productName,
  currentImage,
}: ProductImageEditorProps) => {
  const handleImageUploaded = (newImageUrl: string) => {
    if (newImageUrl) {
      onImageUpdate(newImageUrl);
      toast.success("Image updated successfully everywhere!");
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
