import React, { useState } from 'react';

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackIcon?: string;
  fallbackText?: string;
}

export const SafeImage: React.FC<SafeImageProps> = ({
  src,
  alt,
  className = '',
  fallbackIcon = 'restaurant',
  fallbackText = 'Desayuno Saludable',
  ...rest
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  if (hasError || !src) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#f5f3f3] to-[#efeded] text-[#006e1c] select-none p-3 text-center ${className}`}
        role="img"
        aria-label={alt || fallbackText}
      >
        <span className="material-symbols-outlined text-[32px] text-[#4caf50] mb-1">
          {fallbackIcon}
        </span>
        <span className="text-[11px] font-medium text-[#3f4a3c] line-clamp-1">{alt || fallbackText}</span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-[#efeded] animate-pulse flex items-center justify-center text-[#6f7a6b]">
          <span className="material-symbols-outlined text-[20px] animate-spin">progress_activity</span>
        </div>
      )}
      <img
        src={src}
        alt={alt}
        referrerPolicy="no-referrer"
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false);
          setHasError(true);
        }}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
        {...rest}
      />
    </div>
  );
};
