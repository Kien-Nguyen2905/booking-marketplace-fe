import { MODAL_MODES, ModalModeType } from '@/constants';
import { useAppContext } from '@/context/AppProvider';
import { useRouter } from 'next/navigation';

export const useModalAuth = () => {
  const { toggleModal, isOpenModal, mode, setMode } = useAppContext();
  const router = useRouter();

  const switchMode = (mode: ModalModeType) => {
    setMode(mode);
  };

  const closeModal = () => {
    toggleModal();
  };

  const onLoginGoogle = () => {
    setMode(MODAL_MODES.LOGIN);
    router.push('/login-google');
  };

  const openLoginModal = () => {
    setMode(MODAL_MODES.LOGIN);
    toggleModal();
  };

  const openRegisterModal = () => {
    setMode(MODAL_MODES.REGISTER);
    toggleModal();
  };

  const openForgotPasswordModal = () => {
    setMode(MODAL_MODES.PASSWORD);
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
