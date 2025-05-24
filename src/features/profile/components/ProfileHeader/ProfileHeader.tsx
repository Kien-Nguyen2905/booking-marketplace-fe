'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Camera } from 'lucide-react';
import { FC } from 'react';
import ImageUploading from 'react-images-uploading';
import { getInitials } from '@/lib/utils';
import { useProfileHeader } from './useProfileHeader';
import 'react-image-crop/dist/ReactCrop.css';
import { showToast } from '@/lib/toast';
import CropAvatar from '@/features/profile/components/ProfileHeader/CropAvatar';
import { ERROR_MESSAGES } from '@/constants';
import { LoadingButton } from '@/components';

const ProfileHeader: FC = () => {
  const {
    images,
    onImageChange,
    isHovered,
    setIsHovered,
    profile,
    cropAvatarProps,
    isLoading,
  } = useProfileHeader();

  return (
    <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b">
      <ImageUploading
        value={images}
        onChange={onImageChange}
        maxNumber={1}
        maxFileSize={1024 * 1024 * 3}
        onError={(error) => {
          showToast({
            type: 'error',
            message: error?.maxFileSize
              ? ERROR_MESSAGES.FILE.SIZE_EXCEEDS_LIMIT
              : ERROR_MESSAGES.SOMETHING_WRONG,
          });
        }}
        dataURLKey="dataURL"
        acceptType={['jpg', 'jpeg', 'png', 'webp']}
      >
        {({ onImageUpload, dragProps }) => (
          <div
            className="relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <Avatar className="h-24 w-24 bg-gray-300 relative lg:h-28 lg:w-28 ring-1 ring-primary/80 ring-offset-2">
              {isLoading ? (
                <LoadingButton />
              ) : (
                <AvatarImage src={profile?.avatar || ''} />
              )}
              <AvatarFallback className="text-xl lg:text-2xl bg-[var(--brand)]/5 text-[var(--brand)]">
                {profile?.fullName ? getInitials(profile.fullName) : 'U'}
              </AvatarFallback>
            </Avatar>
            {isHovered && (
              <Button
                size="icon"
                variant="secondary"
                className="absolute -bottom-1 -right-1 h-8 w-8 rounded-full shadow-md"
                onClick={onImageUpload}
                {...dragProps}
              >
                <Camera className="h-4 w-4" />
              </Button>
            )}
          </div>
        )}
      </ImageUploading>

      <CropAvatar {...cropAvatarProps} />

      <div className="text-center sm:text-left">
        <h1 className="text-xl lg:text-2xl font-semibold text-slate-900">
          {profile?.fullName || 'Welcome'}
        </h1>
        <p className="text-sm lg:text-base text-slate-600 mt-1">
          {profile?.email}
        </p>
      </div>
    </div>
  );
};
export default ProfileHeader;
