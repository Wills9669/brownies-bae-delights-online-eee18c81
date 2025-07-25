
/**
 * Utility functions for image optimization, storage and retrieval
 */

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

// Enhanced safelyStoreImage function with more robust storage and validation
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
    
    // Try storing the image
    localStorage.setItem(key, imageData);
    
    // Verify the image was stored correctly
    const storedData = localStorage.getItem(key);
    if (!storedData || storedData !== imageData) {
      console.error('Storage verification failed');
      return false;
    }
    
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

// Improved function to broadcast image changes to all components
export const broadcastImageChange = (productId: string) => {
  try {
    // Create a specific event name for this product
    const eventName = `productImage-${productId}-updated`;
    
    // Store timestamp to ensure changes are detected
    localStorage.setItem(`product-image-${productId}-timestamp`, new Date().getTime().toString());
    
    // Trigger all possible events to ensure synchronization across all components
    
    // General storage event for cross-tab sync
    localStorage.setItem('last-image-update', new Date().getTime().toString());
    window.dispatchEvent(new Event('storage'));
    
    // Custom events for in-page updates
    window.dispatchEvent(new CustomEvent('productImageUpdated', { 
      detail: { productId, timestamp: new Date().getTime() }
    }));
    
    // Dispatch specific product event
    window.dispatchEvent(new CustomEvent(eventName, {
      detail: { timestamp: new Date().getTime() }
    }));
    
    return true;
  } catch (error) {
    console.error('Error broadcasting image change:', error);
    return false;
  }
};

// Enhanced function to retrieve stored images with improved error handling and caching
export const getStoredImage = (productId: string, fallbackImage: string): string => {
  try {
    // Try to get the image from localStorage with validation
    const savedImage = localStorage.getItem(`product-image-${productId}`);
    
    if (!savedImage) {
      console.log(`No stored image found for product ${productId}, using fallback`);
      return fallbackImage;
    }
    
    // Simple validation check to ensure it's likely an image data URL
    if (savedImage.startsWith('data:image/')) {
      console.log(`Using stored image for product ${productId}`);
      return savedImage;
    } else {
      console.warn('Invalid image format in localStorage for:', productId);
      // Clean up invalid data
      localStorage.removeItem(`product-image-${productId}`);
      return fallbackImage;
    }
  } catch (error) {
    console.error('Error retrieving stored image:', error);
    return fallbackImage;
  }
};

// Clear all product images from localStorage
export const clearAllProductImages = () => {
  try {
    const keysToRemove = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('product-image-')) {
        keysToRemove.push(key);
      }
    }
    
    keysToRemove.forEach(key => localStorage.removeItem(key));
    return true;
  } catch (error) {
    console.error('Error clearing product images:', error);
    return false;
  }
};

export { optimizeImage, safelyStoreImage };
