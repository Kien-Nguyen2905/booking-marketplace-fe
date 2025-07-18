'use client';
import React, { FC } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';
import 'yet-another-react-lightbox/plugins/thumbnails.css';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import Fullscreen from 'yet-another-react-lightbox/plugins/fullscreen';
import Slideshow from 'yet-another-react-lightbox/plugins/slideshow';
import { TGalleryProps } from '@/components/Gallery/type';
import { useGallery } from '@/components/Gallery/useGallery';
import Image from 'next/image';
import { useBreakpoint } from '@/hooks';

const Gallery: FC<TGalleryProps> = ({ images }) => {
  const slides = images.map((src) => ({ src }));

  const { openLightbox, open, imageIndex, setOpen } = useGallery();

  const isMdScreen = useBreakpoint('md', 'min');

  return (
    <div className="container mx-auto pb-8">
      {/* Gallery Grid Layout */}
      <div className="grid rounded-lg overflow-hidden grid-cols-1 md:grid-cols-4 gap-2 h-[300px] md:h-[340px]">
        {/* Feature the first image larger */}
        {images.length > 0 && (
          <div
            className="relative col-span-1 md:col-span-2 md:row-span-2 overflow-hidden cursor-pointer transform hover:opacity-70 transition-transform duration-800"
            onClick={() => openLightbox(0)}
          >
            <Image
              src={images[0]}
              alt="Hotel view"
              className="w-full h-full object-cover"
              fill
            />
            {!isMdScreen && (
              <div className="absolute inset-0 bg-transparent bg-opacity-60 flex items-center justify-center">
                <span className="text-white text-sm font-semibold">
                  +{images.length - 1} more
                </span>
              </div>
            )}
          </div>
        )}

        {/* Display the next 5 images in the grid */}
        {isMdScreen &&
          images.slice(1, 5).map((image, index) => (
            <div
              key={`gallery-image-${index + 1}`}
              className="relative overflow-hidden h-full cursor-pointer transform hover:opacity-70 transition-transform duration-800"
              onClick={() => openLightbox(index + 1)}
            >
              <img
                src={image}
                alt={`Hotel view ${index + 1}`}
                className="w-full h-full object-cover"
              />
              {/* Add overlay with '+X more' text only to the last image (index 4) */}
              {index === 3 && images.length > 5 && (
                <div className="absolute inset-0 bg-transparent bg-opacity-60 flex items-center justify-center">
                  <span className="text-white text-sm font-semibold">
                    +{images.length - 5} more
                  </span>
                </div>
              )}
            </div>
          ))}
      </div>

      {/* Lightbox Component */}
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={slides}
        index={imageIndex}
        plugins={[Thumbnails, Zoom, Fullscreen, Slideshow]}
        thumbnails={{
          position: 'bottom',
          width: 120,
          height: 80,
          border: 2,
          borderRadius: 4,
          padding: 4,
          gap: 16,
        }}
        zoom={{
          maxZoomPixelRatio: 3,
          zoomInMultiplier: 2,
        }}
        slideshow={{
          autoplay: false,
          delay: 5000,
        }}
      />
    </div>
  );
};

export default Gallery;
