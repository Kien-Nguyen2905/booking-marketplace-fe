'use client';
import React, { FC } from 'react';
import { Button } from '@/components/ui/button';
import { Menu as MenuIcon, User } from 'lucide-react';
import { TMenuProps } from '@/layouts/Menu/type';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getInitials } from '@/lib/utils';
import { DASHBOARD_NAV_LINKS, NAV_LINKS } from '@/constants';
import { usePathname } from 'next/navigation';
import { useAppContext } from '@/context/AppProvider';
import { useModalAuth } from '@/components/ModalAuth/useModalAuth';

const Menu: FC<TMenuProps> = ({
  menuRef,
  isMenuOpen,
  toggleMenu,
  closeMenu,
  profile,
  handleLogout,
}) => {
  const { openLoginModal, openRegisterModal } = useModalAuth();

  const { role } = useAppContext();
  const pathname = usePathname();
  const navLinks =
    pathname.includes('/partner') || pathname.includes('/admin')
      ? DASHBOARD_NAV_LINKS[role]
      : NAV_LINKS;
  return (
    <div className="relative" ref={menuRef}>
      <Button
        variant="outline"
        className="flex items-center justify-center gap-2 rounded-full p-2 md:px-4"
        onClick={toggleMenu}
      >
        <MenuIcon size={16} />
        <div className="h-7 w-7 rounded-full bg-gray-500 text-white flex items-center justify-center">
          {profile ? (
            <Avatar className="w-full h-full">
              <AvatarImage src={profile.avatar || ''} />
              <AvatarFallback className="text-xs lg:text-sm bg-primary">
                {profile.fullName ? getInitials(profile.fullName) : 'U'}
              </AvatarFallback>
            </Avatar>
          ) : (
            <User size={14} />
          )}
        </div>
      </Button>

      {isMenuOpen && (
        <div className="absolute right-0 top-full mt-2 w-56 bg-white shadow-md rounded-md overflow-hidden border border-gray-200 z-50">
          {profile ? (
            <>
              <div className="px-4 py-3 border-b border-gray-100">
                <p className="text-sm font-semibold">{profile?.fullName}</p>
              </div>
              <div className="py-1">
                {navLinks?.map((link: any) =>
                  link.href === null ? (
                    <button
                      key={link.name}
                      className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left flex items-center"
                      onClick={() => {
                        handleLogout();
                        closeMenu();
                      }}
                    >
                      <link.icon size={14} className="mr-2" />
                      {link.name}
                    </button>
                  ) : (
                    <Link key={link.href} href={link.href}>
                      <button
                        className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left flex items-center"
                        onClick={closeMenu}
                      >
                        <link.icon size={14} className="mr-2" />
                        {link.name}
                      </button>
                    </Link>
                  ),
                )}
              </div>
            </>
          ) : (
            <div className="py-1">
              <button
                className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                onClick={() => {
                  closeMenu();
                  openLoginModal();
                }}
              >
                Login
              </button>
              <button
                className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                onClick={() => {
                  closeMenu();
                  openRegisterModal();
                }}
              >
                Register
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Menu;
