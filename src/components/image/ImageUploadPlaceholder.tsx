
import { ImageIcon } from 'lucide-react';

interface ImageUploadPlaceholderProps {
  onUploadClick: () => void;
  onCameraClick: () => void;
}

const ImageUploadPlaceholder = ({ onUploadClick, onCameraClick }: ImageUploadPlaceholderProps) => {
  return (
    <div className="mb-4 h-48 w-48 flex flex-col items-center justify-center bg-gray-100 border-2 border-dashed border-gray-300 rounded-md hover:border-pink-dark transition-colors cursor-pointer">
      <ImageIcon className="text-gray-400 mb-2" size={48} />
      <span className="text-sm text-gray-500">Click to upload image</span>
      <div className="flex gap-2 mt-4">
        <button onClick={onUploadClick} className="cursor-pointer bg-pink-dark text-white px-3 py-1 rounded-md text-sm hover:bg-pink-dark/90">
          Upload
        </button>
        <button
          onClick={onCameraClick}
          className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-600"
          title="Take picture"
        >
          Camera
        </button>
      </div>
    </div>
  );
};

export default ImageUploadPlaceholder;
