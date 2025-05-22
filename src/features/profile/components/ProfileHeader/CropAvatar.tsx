import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Check, X } from 'lucide-react';
import React from 'react';
import ReactCrop from 'react-image-crop';
import { FC } from 'react';
import { TCropAvatarProps } from './type';
import { LoadingButton } from '@/components';

const CropAvatar: FC<TCropAvatarProps> = ({
  showCrop,
  setShowCrop,
  images,
  crop,
  setCrop,
  completedCrop,
  setCompletedCrop,
  imgRef,
  handleUploadImage,
  isUploadingImage,
}) => {
  return (
    <Dialog open={showCrop} onOpenChange={setShowCrop}>
      <DialogContent className="min-w-max">
        <DialogTitle>Crop Image</DialogTitle>
        <div className="flex flex-col gap-4 w-max mx-auto">
          {images.length > 0 && images[0].dataURL && (
            <div className="flex flex-col gap-4">
              <ReactCrop
                className="max-h-[400px] w-full"
                crop={crop}
                onChange={(c) => setCrop(c)}
                onComplete={(c) => setCompletedCrop(c)}
                aspect={1}
                circularCrop
                keepSelection
                minHeight={30}
                minWidth={30}
              >
                <img
                  ref={imgRef}
                  src={images[0].dataURL}
                  alt="Crop preview"
                  className="w-auto object-contain mx-auto"
                />
              </ReactCrop>
              <div className="flex justify-end space-x-2 mt-4">
                <Button
                  variant="outline"
                  onClick={() => setShowCrop(false)}
                  disabled={isUploadingImage}
                  className="w-[120px] h-10"
                >
                  <X className="h-4 w-4 mr-2" /> Cancel
                </Button>
                <Button
                  type="button"
                  onClick={handleUploadImage}
                  disabled={!completedCrop || isUploadingImage}
                  className="w-[120px] h-10 relative"
                >
                  {isUploadingImage ? (
                    <LoadingButton />
                  ) : (
                    <>
                      <Check className="h-4 w-4 mr-2" /> Save
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CropAvatar;
