
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
  
  // Add progress indicator
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setError(null);
    setUploadProgress(0);
    
    try {
      validateImage(file);
      setIsUploading(true);
      
      // Simulate progress for better UX
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 100);
      
      const optimizedImageDataUrl = await optimizeImage(file);
      clearInterval(progressInterval);
      setUploadProgress(100);
      
      setPreviewImage(optimizedImageDataUrl);
      setHasChanges(true);
      toast.success("Image loaded and optimized successfully.");
      
      // Reset progress after a delay
      setTimeout(() => setUploadProgress(0), 1000);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to process image';
      setError(message);
      toast.error(message);
      setUploadProgress(0);
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
    if (fileInputRef.current) {
      // Reset capture attribute to allow file selection
      fileInputRef.current.removeAttribute('capture');
      fileInputRef.current.click();
    }
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
        <div className="w-full">
          <p className="text-blue-500 text-xs mb-1">Processing image...</p>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-blue-600 h-2.5 rounded-full transition-all duration-300" 
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>
        </div>
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
