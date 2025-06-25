import { GetUserProfileResType } from '@/models';

export type TMenuProps = {
  menuRef: React.RefObject<HTMLDivElement | null>;
  isMenuOpen: boolean;
  toggleMenu: () => void;
  closeMenu: () => void;
  profile: GetUserProfileResType | null;
  handleLogout: () => void;
};
