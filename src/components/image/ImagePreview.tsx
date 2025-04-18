
import { Edit2, Camera, X } from 'lucide-react';

interface ImagePreviewProps {
  imageUrl: string;
  onEdit: () => void;
  onRemove: () => void;
  onTakePicture: () => void;
  alt: string;
}

const ImagePreview = ({ imageUrl, onEdit, onRemove, onTakePicture, alt }: ImagePreviewProps) => {
  return (
    <div className="relative group mb-4">
      <div className="h-48 w-48 rounded-md overflow-hidden border border-gray-300">
        <img
          src={imageUrl}
          alt={alt}
          className="w-full h-full object-cover transition-opacity group-hover:opacity-75"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
          <div className="flex gap-2">
            <button onClick={onEdit} className="cursor-pointer bg-white p-2 rounded-full">
              <Edit2 className="text-gray-800" size={20} />
            </button>
            <button
              onClick={onTakePicture}
              className="bg-white p-2 rounded-full"
              title="Take picture"
            >
              <Camera className="text-gray-800" size={20} />
            </button>
          </div>
        </div>
      </div>
      <button 
        onClick={onRemove}
        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
        title="Remove image"
      >
        <X size={16} />
      </button>
    </div>
  );
};

export default ImagePreview;
