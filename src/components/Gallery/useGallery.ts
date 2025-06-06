import { useState } from 'react';

export const useGallery = () => {
  const [open, setOpen] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);

  const openLightbox = (index: number) => {
    setImageIndex(index);
    setOpen(true);
  };
  return {
    openLightbox,
    open,
    imageIndex,
    setOpen,
  };
};
