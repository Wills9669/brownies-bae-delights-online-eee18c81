
import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { AlertCircle, Save } from 'lucide-react';
import ImagePreview from './image/ImagePreview';
import ImageUploadPlaceholder from './image/ImageUploadPlaceholder';
import { optimizeImage, validateImage } from '@/utils/imageUtils';

interface ImageUploaderProps {
  onImageUploaded: (imageUrl: string) => void;
  currentImage?: string;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUploaded, currentImage }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | undefined>(currentImage);
  const [error, setError] = useState<string | null>(null);
  const [hasChanges, setHasChanges] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setError(null);
    
    try {
      validateImage(file);
      setIsUploading(true);
      const optimizedImageDataUrl = await optimizeImage(file);
      setPreviewImage(optimizedImageDataUrl);
      setHasChanges(true);
      toast.success("Image loaded and optimized successfully.");
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to process image';
      setError(message);
      toast.error(message);
    } finally {
      setIsUploading(false);
    }
  };

  const handleTakePicture = () => {
    if (fileInputRef.current) {
      fileInputRef.current.setAttribute('capture', 'environment');
      fileInputRef.current.click();
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const saveChanges = () => {
    if (previewImage) {
      onImageUploaded(previewImage);
      setHasChanges(false);
      toast.success('Image saved successfully!');
    } else {
      const message = 'No image to save';
      setError(message);
      toast.error(message);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
      
      {previewImage ? (
        <ImagePreview
          imageUrl={previewImage}
          onEdit={handleUploadClick}
          onRemove={() => {
            setPreviewImage(undefined);
            setHasChanges(true);
          }}
          onTakePicture={handleTakePicture}
          alt="Preview"
        />
      ) : (
        <ImageUploadPlaceholder
          onUploadClick={handleUploadClick}
          onCameraClick={handleTakePicture}
        />
      )}
      
      {error && (
        <div className="flex items-center gap-2 text-red-500 text-xs">
          <AlertCircle size={12} />
          <p>{error}</p>
        </div>
      )}
      
      {isUploading && (
        <p className="text-blue-500 text-xs">Processing image...</p>
      )}

      {hasChanges && previewImage && (
        <Button 
          onClick={saveChanges} 
          className="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600"
        >
          <Save size={16} />
          Save Changes
        </Button>
      )}
      
      <p className="text-xs text-gray-500 text-center max-w-[200px]">
        Images will be automatically optimized to load faster
      </p>
    </div>
  );
};

export default ImageUploader;
