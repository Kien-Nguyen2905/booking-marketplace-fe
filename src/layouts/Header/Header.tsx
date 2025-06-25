'use client';
import { Handshake, MapPinHouse } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ModalAuth } from '@/components';
import { useHeader } from './useHeader';
import { ROLE_NAME, ROUTES } from '@/constants';
import { Menu } from '@/layouts/Menu';
import { Badge } from '@/components/ui/badge';

const Header = () => {
  const {
    isMenuOpen,
    toggleMenu,
    closeMenu,
    menuRef,
    handleLogout,
    role,
    profile,
    isPendingPartner,
  } = useHeader();
  return (
    <>
      <div
        className={`sticky top-0 z-50 w-full transition-all duration-300 bg-white shadow-sm`}
      >
        <div className="mx-auto max-w-7xl">
          <div className="flex h-19 items-center justify-between px-6">
            <div className="flex-shrink-0 text-[var(--blue-primary)] ">
              <Link href="/" className="flex items-center">
                <MapPinHouse size={24} />
                <span className="ml-2 text-2xl font-bold hidden sm:block">
                  Booking
                </span>
              </Link>
            </div>
            {/* User Menu */}
            <div className="flex items-center gap-2">
              {profile && isPendingPartner && (
                <Badge variant="default" className="text-sm font-medium">
                  <Handshake size={20} /> Applied Partner
                </Badge>
              )}
              {role === ROLE_NAME.CUSTOMER && !isPendingPartner && (
                <Link href={ROUTES.BECOME_PARTNER.PARTNER}>
                  <Button variant="link">Become to Partner</Button>
                </Link>
              )}
              {role === ROLE_NAME.PARTNER && (
                <Link href={ROUTES.PARTNER.ROOT} className="flex items-center">
                  <Button variant="link">Switch to hosting</Button>
                </Link>
              )}
              <Menu
                menuRef={menuRef}
                isMenuOpen={isMenuOpen}
                toggleMenu={toggleMenu}
                closeMenu={closeMenu}
                profile={profile}
                handleLogout={handleLogout}
              />
            </div>
          </div>
        </div>
      </div>
      <ModalAuth />
    </>
  );
};

export default Header;
