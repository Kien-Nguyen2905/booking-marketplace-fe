import { useAppContext } from '@/context/AppProvider';
import { useRouter } from 'next/navigation';

export const useModalAuth = () => {
  const { toggleModal, isOpenModal, mode, setMode } = useAppContext();
  const router = useRouter();

  const switchMode = (mode: 'login' | 'register' | 'password') => {
    setMode(mode);
  };

  const closeModal = () => {
    toggleModal();
  };

  const onLoginGoogle = () => {
    setMode('login');
    router.push('/login-google');
  };

  // Open auth modal in login mode
  const openLoginModal = () => {
    setMode('login');
    toggleModal();
  };

  // Open auth modal in register mode
  const openRegisterModal = () => {
    setMode('register');
    toggleModal();
  };

  // Open forget password modal in register mode
  const openForgotPasswordModal = () => {
    setMode('password');
    toggleModal();
  };

  return {
    isOpenModal,
    toggleModal: toggleModal,
    closeModal,
    mode,
    switchMode,
    openLoginModal,
    openRegisterModal,
    openForgotPasswordModal,
    onLoginGoogle,
  };
};
