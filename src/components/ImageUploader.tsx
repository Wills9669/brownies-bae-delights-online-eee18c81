
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Upload, Image as ImageIcon, X, Edit2 } from 'lucide-react';

interface ImageUploaderProps {
  onImageUploaded: (imageUrl: string) => void;
  currentImage?: string;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUploaded, currentImage }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | undefined>(currentImage);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);

  // Update preview if currentImage changes
  useEffect(() => {
    setPreviewImage(currentImage);
  }, [currentImage]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setError(null);
    
    // Validate file size (increased to 10MB for high-quality images)
    if (file.size > 10 * 1024 * 1024) {
      setError('Image size must be less than 10MB');
      toast.error('Image size must be less than 10MB');
      return;
    }
    
    // Validate file type with more formats
    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/heic', 'image/heif'];
    if (!validTypes.includes(file.type)) {
      setError('Please upload a valid image (JPEG, PNG, GIF, WEBP, HEIC)');
      toast.error('Please upload a valid image (JPEG, PNG, GIF, WEBP, HEIC)');
      return;
    }
    
    setIsUploading(true);
    
    try {
      // Create a dataURL that will persist across page reloads when saved to localStorage
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          const dataUrl = event.target.result as string;
          setPreviewImage(dataUrl);
          // Automatically save the image
          onImageUploaded(dataUrl);
        }
      };
      reader.readAsDataURL(file);
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
    toast.success("Image removed successfully!");
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {previewImage ? (
        <div className="relative group mb-4">
          <div className="h-48 w-48 rounded-md overflow-hidden border border-gray-300">
            <img
              src={previewImage}
              alt="Product preview"
              className="w-full h-full object-cover transition-opacity group-hover:opacity-75"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
              <label htmlFor="image-upload-edit" className="cursor-pointer">
                <Edit2 className="text-white" size={24} />
              </label>
              <input
                id="image-upload-edit"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                ref={fileInputRef}
              />
            </div>
          </div>
          <button 
            onClick={removeImage}
            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
            title="Remove image"
          >
            <X size={16} />
          </button>
        </div>
      ) : (
        <div className="mb-4 h-48 w-48 flex flex-col items-center justify-center bg-gray-100 border-2 border-dashed border-gray-300 rounded-md hover:border-pink-dark transition-colors cursor-pointer relative">
          <ImageIcon className="text-gray-400 mb-2" size={48} />
          <span className="text-sm text-gray-500">Click to upload image</span>
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            ref={fileInputRef}
          />
        </div>
      )}
      
      {error && (
        <p className="text-red-500 text-xs">{error}</p>
      )}
      
      {isUploading && (
        <p className="text-blue-500 text-xs">Uploading image...</p>
      )}
      
      <p className="text-xs text-gray-500 text-center max-w-[200px]">
        Upload high-quality images up to 10MB (JPEG, PNG, GIF, WEBP, HEIC)
      </p>
    </div>
  );
};

export default ImageUploader;
