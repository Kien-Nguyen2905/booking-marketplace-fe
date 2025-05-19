'use client';
import { MapPinHouse, Menu, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ModalAuth } from '@/components';
import { useHeader } from './useHeader';
import { NAV_LINKS, ROLE_NAME } from '@/constants';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const Header = () => {
  const {
    isMenuOpen,
    toggleMenu,
    closeMenu,
    menuRef,
    handleLogout,
    openLoginModal,
    role,
    isAuthenticated,
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
              {role === ROLE_NAME.CUSTOMER && (
                <Link href="/become-partner" className="flex items-center">
                  <Button variant="link">Become to Partner</Button>
                </Link>
              )}
              {role === ROLE_NAME.PARTNER && (
                <Link href="/partner" className="flex items-center">
                  <Button variant="link">Switch to hosting</Button>
                </Link>
              )}
              <div className="relative" ref={menuRef}>
                <Button
                  variant="outline"
                  className="flex items-center justify-center gap-2 rounded-full p-2 md:px-4"
                  onClick={toggleMenu}
                >
                  <Menu size={16} />
                  <div className="h-7 w-7 rounded-full bg-gray-500 text-white flex items-center justify-center">
                    {isAuthenticated ? (
                      <Avatar className="w-full h-full">
                        <AvatarImage src={''} />
                        <AvatarFallback className="text-xs lg:text-sm bg-primary">
                          {'U'}
                        </AvatarFallback>
                      </Avatar>
                    ) : (
                      <User size={14} />
                    )}
                  </div>
                </Button>

                {isMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white shadow-md rounded-md overflow-hidden border border-gray-200 z-50">
                    {isAuthenticated ? (
                      <>
                        <div className="px-4 py-3 border-b border-gray-100">
                          <p className="text-sm font-semibold">Kien</p>
                          <p className="text-xs text-gray-500">
                            kien@gmail.com
                          </p>
                        </div>
                        <div className="py-1">
                          {NAV_LINKS.map((link: any) =>
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
                          Login / Register
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <ModalAuth />
    </>
  );
};

export default Header;
