'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { ProfileDevices } from '@/features/profile/components/ProfileDevices';
import { ProfileInfo } from '@/features/profile/components/ProfileInfo';
import { ProfileSecurity } from '@/features/profile/components/ProfileSecurity';
import { TwoFactorAuthenticator } from '@/features/profile/components/TwoFactorAuthenticator';

const ProfileTabs = () => {
  return (
    <Tabs defaultValue="personal" className="w-full">
      <TabsList className="w-full max-w-[540px] grid grid-cols-4 mb-1">
        <TabsTrigger
          value="personal"
          className="data-[state=active]:bg-[var(--brand)]/5 data-[state=active]:text-[var(--blue-primary)] data-[state=active]:shadow-none"
        >
          Profile
        </TabsTrigger>
        <TabsTrigger
          value="security"
          className="data-[state=active]:bg-[var(--brand)]/5 data-[state=active]:text-[var(--blue-primary)] data-[state=active]:shadow-none"
        >
          Security
        </TabsTrigger>
        <TabsTrigger
          value="2fa"
          className="data-[state=active]:bg-[var(--brand)]/5 data-[state=active]:text-[var(--blue-primary)] data-[state=active]:shadow-none"
        >
          2FA
        </TabsTrigger>
        <TabsTrigger
          value="devices"
          className="data-[state=active]:bg-[var(--brand)]/5 data-[state=active]:text-[var(--blue-primary)] data-[state=active]:shadow-none"
        >
          Devices
        </TabsTrigger>
      </TabsList>

      <TabsContent value="personal" className="mt-0">
        <ProfileInfo />
      </TabsContent>
      <TabsContent value="security" className="mt-0">
        <ProfileSecurity />
      </TabsContent>
      <TabsContent value="2fa" className="mt-0">
        <TwoFactorAuthenticator />
      </TabsContent>
      <TabsContent value="devices" className="mt-0">
        <ProfileDevices />
      </TabsContent>
    </Tabs>
  );
};
export default ProfileTabs;
