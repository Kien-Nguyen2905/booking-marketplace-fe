import { useAppContext } from '@/context/AppProvider';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export const useModalAuth = () => {
  const { toggleModal, isOpenModal } = useAppContext();
  const router = useRouter();
  const [mode, setMode] = useState<'login' | 'register' | 'password'>('login');

  const switchMode = (mode: 'login' | 'register' | 'password') => {
    setMode(mode);
  };

  const closeModal = () => {
    setMode('login');
    toggleModal();
  };

  const onLoginGoogle = () => {
    setMode('login');
    router.push('/login-google');
  };
  // Handle logout
  const handleLogout = () => {};

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
    handleLogout,
    openLoginModal,
    openRegisterModal,
    openForgotPasswordModal,
    onLoginGoogle,
  };
};
