
const optimizeImage = (file: File, maxWidth = 400, maxHeight = 400, quality = 0.5): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
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
        
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Could not get canvas context'));
          return;
        }
        
        ctx.drawImage(img, 0, 0, width, height);
        const optimizedDataUrl = canvas.toDataURL('image/jpeg', quality);
        resolve(optimizedDataUrl);
      };
      
      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = event.target?.result as string || '';
    };
    
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
};

// Add a function to safely store image in localStorage
const safelyStoreImage = (key: string, imageData: string): boolean => {
  try {
    // First try to free up some space by removing old temp data
    try {
      for (let i = 0; i < localStorage.length; i++) {
        const storageKey = localStorage.key(i);
        if (storageKey?.startsWith('temp-')) {
          localStorage.removeItem(storageKey);
        }
      }
    } catch (e) {
      console.log('Error cleaning up temp storage', e);
    }
    
    // Try to store the image
    localStorage.setItem(key, imageData);
    return true;
  } catch (error) {
    console.error('Storage error:', error);
    return false;
  }
};

export const validateImage = (file: File) => {
  const maxSize = 3 * 1024 * 1024; // 3MB
  const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
  
  if (file.size > maxSize) {
    throw new Error('Image size must be less than 3MB');
  }
  
  if (!validTypes.includes(file.type)) {
    throw new Error('Please upload a valid image (JPEG, PNG, GIF, WEBP)');
  }
};

export { optimizeImage, safelyStoreImage };
