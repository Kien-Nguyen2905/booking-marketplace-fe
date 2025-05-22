import { Loading } from '@/components';
import { useAppContext } from '@/context/AppProvider';
import { ProfileHeader, ProfileTabs } from '@/features/profile/components';
import React from 'react';

const ProfilePage = () => {
  const { profile } = useAppContext();
  if (!profile) {
    return <Loading />;
  }
  return (
    <div className="space-y-8">
      <ProfileHeader />
      <ProfileTabs />
    </div>
  );
};

export default ProfilePage;
