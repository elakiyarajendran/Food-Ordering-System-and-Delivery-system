import React, { useState } from 'react';
import { getDishImage, getRestaurantImage } from '../utils/images';

export const SafeImage = ({ src, alt, className, type = 'dish', name = '' }) => {
  const fallback = type === 'restaurant' ? getRestaurantImage(name || alt) : getDishImage(name || alt);
  const [imgSrc, setImgSrc] = useState(src || fallback);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      setImgSrc(fallback);
    }
  };

  return (
    <img
      src={imgSrc}
      alt={alt || 'Foodyx item'}
      className={className}
      onError={handleError}
      loading="lazy"
    />
  );
};
