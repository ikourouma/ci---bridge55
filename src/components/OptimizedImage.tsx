import { useState, ImgHTMLAttributes } from 'react';
import { ImageOff } from 'lucide-react';

interface OptimizedImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'onError' | 'onLoad'> {
  src: string;
  alt: string;
  fallbackSrc?: string;
  aspectRatio?: string;
}

export function OptimizedImage({
  src,
  alt,
  fallbackSrc,
  aspectRatio = '16/9',
  className = '',
  ...props
}: OptimizedImageProps) {
  const [imageState, setImageState] = useState<'loading' | 'loaded' | 'error'>('loading');
  const [currentSrc, setCurrentSrc] = useState(src);

  const handleLoad = () => {
    setImageState('loaded');
  };

  const handleError = () => {
    if (fallbackSrc && currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc);
      setImageState('loading');
    } else {
      setImageState('error');
    }
  };

  return (
    <div className="relative w-full h-full bg-gray-200">
      {/* Loading Skeleton */}
      {imageState === 'loading' && (
        <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse" />
      )}

      {/* Error State */}
      {imageState === 'error' && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100 text-gray-400">
          <ImageOff className="w-12 h-12 mb-2" />
          <p className="text-sm">Image unavailable</p>
        </div>
      )}

      {/* Actual Image */}
      <img
        src={currentSrc}
        alt={alt}
        loading="lazy"
        decoding="async"
        onLoad={handleLoad}
        onError={handleError}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          imageState === 'loaded' ? 'opacity-100' : 'opacity-0'
        } ${className}`}
        {...props}
      />
    </div>
  );
}
