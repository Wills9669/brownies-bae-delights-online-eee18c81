
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface ImageUploaderProps {
  onImageUploaded: (imageUrl: string) => void;
  currentImage?: string;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUploaded, currentImage }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | undefined>(currentImage);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Show preview immediately
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setPreviewImage(event.target.result as string);
      }
    };
    reader.readAsDataURL(file);
    
    setIsUploading(true);
    
    // This would typically use an API to upload the file
    // For now, we'll simulate an upload and just use the local preview
    try {
      // Simulate upload delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real implementation, this would be the URL returned from your upload API
      const uploadedUrl = URL.createObjectURL(file);
      onImageUploaded(uploadedUrl);
      toast.success("Image uploaded successfully!");
    } catch (error) {
      toast.error("Failed to upload image. Please try again.");
      console.error(error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {previewImage && (
        <div className="mb-4 h-48 w-48 rounded-md overflow-hidden border border-gray-300">
          <img
            src={previewImage}
            alt="Product preview"
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      <label htmlFor="image-upload">
        <Button 
          variant="outline" 
          className="cursor-pointer relative" 
          disabled={isUploading}
        >
          {isUploading ? "Uploading..." : "Upload Image"}
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
        </Button>
      </label>
      <p className="text-xs text-gray-500">
        Click to select an image. Recommended size: 600x600px.
      </p>
    </div>
  );
};

export default ImageUploader;
