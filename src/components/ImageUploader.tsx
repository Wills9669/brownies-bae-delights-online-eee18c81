
import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Upload, Image as ImageIcon, X } from 'lucide-react';

interface ImageUploaderProps {
  onImageUploaded: (imageUrl: string) => void;
  currentImage?: string;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUploaded, currentImage }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | undefined>(currentImage);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Reset any previous error
    setError(null);
    
    // Check file size (limit to 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image size must be less than 5MB');
      toast.error('Image size must be less than 5MB');
      return;
    }
    
    // Check file type
    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setError('Please upload a valid image (JPEG, PNG, GIF, or WEBP)');
      toast.error('Please upload a valid image (JPEG, PNG, GIF, or WEBP)');
      return;
    }
    
    // Show preview immediately
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setPreviewImage(event.target.result as string);
      }
    };
    reader.readAsDataURL(file);
    
    setIsUploading(true);
    
    try {
      // For local development, use the local preview
      // In production, this would connect to your storage service
      const uploadedUrl = URL.createObjectURL(file);
      onImageUploaded(uploadedUrl);
      toast.success("Image updated successfully!");
    } catch (error) {
      console.error('Upload error:', error);
      setError('Failed to upload image. Please try again.');
      toast.error("Failed to upload image. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const removeImage = () => {
    setPreviewImage(undefined);
    onImageUploaded('');
    // Clear the file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    toast.info('Image removed');
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {previewImage ? (
        <div className="relative mb-4">
          <div className="h-48 w-48 rounded-md overflow-hidden border border-gray-300">
            <img
              src={previewImage}
              alt="Product preview"
              className="w-full h-full object-cover"
            />
          </div>
          <button 
            onClick={removeImage}
            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
            title="Remove image"
          >
            <X size={16} />
          </button>
        </div>
      ) : (
        <div className="mb-4 h-48 w-48 flex items-center justify-center bg-gray-100 border border-dashed border-gray-300 rounded-md">
          <ImageIcon className="text-gray-400" size={48} />
          <span className="ml-2 text-gray-400">No image selected</span>
        </div>
      )}
      
      {error && (
        <p className="text-red-500 text-xs">{error}</p>
      )}
      
      <label htmlFor="image-upload">
        <Button 
          variant="outline" 
          className="cursor-pointer relative gap-2" 
          disabled={isUploading}
        >
          <Upload size={16} />
          {isUploading ? "Uploading..." : "Upload Image"}
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            ref={fileInputRef}
          />
        </Button>
      </label>
      <p className="text-xs text-gray-500">
        Click to select an image. Recommended size: 600x600px. Max size: 5MB.
      </p>
    </div>
  );
};

export default ImageUploader;
