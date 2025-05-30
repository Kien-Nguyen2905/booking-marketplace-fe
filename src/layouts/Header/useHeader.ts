import { useState, useEffect, useRef } from 'react';
import { useModalAuth } from '@/components/ModalAuth/useModalAuth';
import { useLogout } from '@/hooks';
import { useAppContext } from '@/context/AppProvider';

export const useHeader = () => {
  const { role, isAuthenticated, profile, isPendingPartner } = useAppContext();
  const { openLoginModal } = useModalAuth();
  const { handleLogout } = useLogout();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSelector, setActiveSelector] = useState<
    'location' | 'date' | 'people' | null
  >(null);

  const menuRef = useRef<HTMLDivElement>(null);

  // Handle click outside to close selectors and menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Close selectors if clicked outside
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setActiveSelector(null);
      }

      // Close menu if clicked outside
      if (
        menuRef.current &&
        isMenuOpen &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  // Toggle menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Close menu
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Toggle selector
  const toggleSelector = (selector: 'location' | 'date' | 'people') => {
    setActiveSelector(activeSelector === selector ? null : selector);
  };

  return {
    isMenuOpen,
    toggleMenu,
    closeMenu,
    activeSelector,
    toggleSelector,
    setActiveSelector,
    menuRef,
    handleLogout,
    openLoginModal,
    role,
    isAuthenticated,
    profile,
    isPendingPartner,
  };
};
