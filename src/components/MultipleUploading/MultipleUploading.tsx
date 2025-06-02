'use client';
import { TMultipleUploadingProps } from '@/components/MultipleUploading/type';
import { RequiredField } from '@/components/RequiredField';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { ERROR_MESSAGES } from '@/constants';
import { showToast } from '@/lib/toast';
import { Camera, Plus, RefreshCw, X } from 'lucide-react';
import Image from 'next/image';
import React, { FC, useEffect } from 'react';
import ImageUploading, { ImageListType } from 'react-images-uploading';

const MultipleUploading: FC<TMultipleUploadingProps> = ({
  label,
  required,
  description,
  maxFileSize = 1,
  initialImages = [],
  uploader,
  className = '',
  isButton = true,
  maxNumber,
  classNamePreview = '',
}) => {
  const { images, onImageChange, error, setImages } = uploader;
  // If external uploader starts empty but we have initialImages, hydrate it once
  useEffect(() => {
    if (initialImages.length && images.length === 0) {
      // map to ImageListType shape if not already
      const formatted = initialImages.map((img: any) => ({
        dataURL: img.dataURL ?? img,
        file: img.file ?? null,
        isExist: img.isExist ?? true,
      }));
      setImages?.(formatted);
    }
  }, [initialImages, images.length, setImages]);

  return (
    <div className="space-y-1">
      <Label className={`${error && 'text-destructive'}`}>
        {label} <RequiredField required={required} />
        {description && (
          <span className="ml-2 text-sm text-gray-500">({description})</span>
        )}
      </Label>
      <ImageUploading
        multiple
        value={images}
        onChange={onImageChange}
        maxNumber={maxNumber}
        maxFileSize={1024 * 1024 * maxFileSize}
        acceptType={['jpg', 'jpeg', 'png', 'webp']}
        dataURLKey="dataURL"
        onError={(error) => {
          console.log(error);
          showToast({
            type: 'error',
            message: error?.maxFileSize
              ? ERROR_MESSAGES.FILE.SIZE_EXCEEDS_LIMIT
              : error?.maxNumber
              ? ERROR_MESSAGES.FILE.MAX_NUMBER_EXCEEDED
              : error?.acceptType
              ? ERROR_MESSAGES.FILE.INVALID_TYPE
              : ERROR_MESSAGES.SOMETHING_WRONG,
          });
        }}
      >
        {({
          imageList,
          onImageUpload,
          onImageRemoveAll,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps,
        }) => (
          <div className={`${className} space-y-4`}>
            {/* Image previews */}
            {imageList.length > 0 ? (
              <div
                className={`${classNamePreview} grid pt-2 grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4`}
              >
                {imageList.map(
                  (image: ImageListType[number], index: number) => (
                    <div
                      key={index}
                      className="relative group h-32 rounded-md overflow-hidden border"
                    >
                      <Image
                        src={image.dataURL || ''}
                        alt={`Hotel image ${index + 1}`}
                        className="w-full h-full object-cover"
                        fill
                      />
                      {/* Overlay on hover */}
                      <div className="absolute z-10 inset-0  transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <div className="flex gap-2">
                          <Button
                            type="button"
                            variant="secondary"
                            size="icon"
                            className="h-8 w-8 rounded-full"
                            onClick={() => onImageUpdate(index)}
                          >
                            <RefreshCw className="h-4 w-4" />
                          </Button>
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            className="h-8 w-8 rounded-full"
                            onClick={() => onImageRemove(index)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      {/* Image index badge */}
                      <div className="absolute top-1 left-1 bg-primary text-white text-xs px-1.5 py-0.5 rounded-full">
                        {index + 1}
                      </div>
                    </div>
                  ),
                )}

                {/* Show add more button if less than max images */}
                {imageList.length < (maxNumber ?? 0) && (
                  <div
                    className="flex flex-col items-center justify-center h-32 border-2 border-dashed rounded-lg cursor-pointer hover:border-primary/50"
                    onClick={onImageUpload}
                  >
                    <Plus className="w-8 h-8 mb-1 text-gray-400" />
                    <p className="text-sm text-gray-500">Add more</p>
                  </div>
                )}
              </div>
            ) : (
              <>
                {/* Upload area */}
                <div
                  className={`${className} flex flex-col items-center cursor-pointer justify-center h-32 border-2 border-dashed rounded-lg p-4 transition-colors ${
                    isDragging
                      ? 'border-primary bg-primary/5'
                      : 'border-gray-300 hover:border-primary/50'
                  } ${error ? 'border-destructive' : ''}`}
                  onClick={onImageUpload}
                  {...dragProps}
                >
                  <Camera className="w-8 h-8 mb-2 text-gray-400" />
                  <p className="text-sm text-center text-gray-500">
                    Drag & drop hotel images here or click to browse
                    <br />
                    <span className="text-xs">
                      JPG, PNG, WEBP up to {maxFileSize}MB
                    </span>
                  </p>
                </div>
              </>
            )}
            {/* Controls */}
            {isButton && imageList.length > 1 && (
              <div className="flex justify-end">
                <Button type="button" size="sm" onClick={onImageRemoveAll}>
                  Remove All
                </Button>
              </div>
            )}
          </div>
        )}
      </ImageUploading>

      {/* Validation error message */}
      {error && <p className="mt-1 text-sm text-destructive">{error}</p>}
    </div>
  );
};

export default MultipleUploading;
