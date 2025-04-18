
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Upload, Image as ImageIcon, X, Edit2, Save, Camera, AlertCircle } from 'lucide-react';

interface ImageUploaderProps {
  onImageUploaded: (imageUrl: string) => void;
  currentImage?: string;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUploaded, currentImage }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | undefined>(currentImage);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [hasChanges, setHasChanges] = useState(false);

  // Update preview if currentImage changes
  useEffect(() => {
    if (currentImage) {
      setPreviewImage(currentImage);
    }
  }, [currentImage]);

  // Resize and optimize image
  const resizeImage = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          // Target dimensions - smaller for better performance
          const maxWidth = 600;
          const maxHeight = 600;
          
          // Calculate dimensions while maintaining aspect ratio
          let width = img.width;
          let height = img.height;
          
          if (width > height) {
            if (width > maxWidth) {
              height = Math.round(height * (maxWidth / width));
              width = maxWidth;
            }
          } else {
            if (height > maxHeight) {
              width = Math.round(width * (maxHeight / height));
              height = maxHeight;
            }
          }
          
          // Create a canvas to resize the image
          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          
          // Draw the image on the canvas
          const ctx = canvas.getContext('2d');
          if (!ctx) {
            reject(new Error('Could not get canvas context'));
            return;
          }
          
          ctx.drawImage(img, 0, 0, width, height);
          
          // Get the resized image as a data URL with reduced quality
          const resizedDataUrl = canvas.toDataURL('image/jpeg', 0.6); // Lower quality for smaller size
          resolve(resizedDataUrl);
        };
        
        img.onerror = () => {
          reject(new Error('Failed to load image'));
        };
        
        if (event.target?.result) {
          img.src = event.target.result as string;
        } else {
          reject(new Error('Failed to read file'));
        }
      };
      
      reader.onerror = () => {
        reject(new Error('Failed to read file'));
      };
      
      reader.readAsDataURL(file);
    });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setError(null);
    
    // Validate file size (5MB is usually enough for web images)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image size must be less than 5MB');
      toast.error('Image size must be less than 5MB');
      return;
    }
    
    // Validate file type
    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setError('Please upload a valid image (JPEG, PNG, GIF, WEBP)');
      toast.error('Please upload a valid image (JPEG, PNG, GIF, WEBP)');
      return;
    }
    
    setIsUploading(true);
    
    try {
      // Resize and optimize the image
      const optimizedImageDataUrl = await resizeImage(file);
      setPreviewImage(optimizedImageDataUrl);
      setHasChanges(true);
      setIsUploading(false);
      toast.success("Image loaded and optimized successfully.");
    } catch (error) {
      console.error('Upload error:', error);
      setError('Failed to process image. Please try again with a different image.');
      toast.error("Failed to process image. Please try again with a different image.");
      setIsUploading(false);
    }
  };

  const removeImage = () => {
    setPreviewImage(undefined);
    setHasChanges(true);
  };

  const saveChanges = () => {
    try {
      if (previewImage) {
        onImageUploaded(previewImage);
        setHasChanges(false);
        toast.success('Image saved successfully!');
      } else {
        setError('No image to save');
        toast.error('No image to save');
      }
    } catch (error) {
      console.error('Error saving image:', error);
      toast.error('Failed to save image. Try using a smaller image.');
      setError('Failed to save image. Try using a smaller image.');
    }
  };

  const handleTakePicture = () => {
    if (fileInputRef.current) {
      fileInputRef.current.setAttribute('capture', 'environment');
      fileInputRef.current.click();
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
              <div className="flex gap-2">
                <label htmlFor="image-upload-edit" className="cursor-pointer bg-white p-2 rounded-full">
                  <Edit2 className="text-gray-800" size={20} />
                </label>
                <button
                  onClick={handleTakePicture}
                  className="bg-white p-2 rounded-full"
                  title="Take picture"
                >
                  <Camera className="text-gray-800" size={20} />
                </button>
              </div>
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
          <div className="flex gap-2 mt-4">
            <label htmlFor="image-upload" className="cursor-pointer bg-pink-dark text-white px-3 py-1 rounded-md text-sm hover:bg-pink-dark/90">
              Upload
            </label>
            <button
              onClick={handleTakePicture}
              className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-600"
              title="Take picture"
            >
              Camera
            </button>
          </div>
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
