export const getOptimizedImageUrl = (imageRef, options = {}) => {
  const {
    width = 800,
    height = 600,
    quality = 80,
    format = 'webp',
    fit = 'crop',
  } = options;

  if (!imageRef) return '';

  return imageRef
    .width(width)
    .height(height)
    .quality(quality)
    .format(format)
    .fit(fit)
    .url();
};