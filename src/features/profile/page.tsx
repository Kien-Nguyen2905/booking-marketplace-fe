'use client';
import { Loading } from '@/components';
import { useAppContext } from '@/context/AppProvider';
import { ProfileHeader, ProfileTabs } from '@/features/profile/components';

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
