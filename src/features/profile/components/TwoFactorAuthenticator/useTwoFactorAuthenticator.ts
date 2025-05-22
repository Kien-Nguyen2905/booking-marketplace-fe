import { useAppContext } from '@/context/AppProvider';
import { handleErrorApi } from '@/lib/helper';
import { showToast } from '@/lib/toast';
import { TwoFactorSetupResType } from '@/models';
import {
  useDisableTwoFactorMutation,
  useEnableTwoFactorMutation,
} from '@/queries';
import { useState } from 'react';

export const useTwoFactorAuthenticator = () => {
  const { profile } = useAppContext();
  const { mutateAsync: enable2FA, isPending: isEnabling } =
    useEnableTwoFactorMutation();
  const { mutateAsync: disable2FA, isPending: isDisabling } =
    useDisableTwoFactorMutation();
  const [result2FA, setResult2FA] = useState<TwoFactorSetupResType | null>(
    null,
  );
  const [showQRCode, setShowQRCode] = useState(false);
  const [showDisableModal, setShowDisableModal] = useState(false);
  const [isEnabled, setIsEnabled] = useState(
    () => profile?.totpSecret !== null,
  );
  const [error, setError] = useState('');
  const [value, setValue] = useState('');

  const handleDisable = async () => {
    try {
      const { data } = await disable2FA({ totpCode: value });
      if (data.data) {
        showToast({
          type: 'success',
          message: data.message,
        });
        setIsEnabled(false);
        setShowDisableModal(false);
        setResult2FA(null);
        setValue('');
      }
    } catch (error: any) {
      if (error.response.data.message[0].message) {
        setError(error.response.data.message[0].message);
      } else {
        handleErrorApi({ error });
      }
    }
  };

  const handleEnable2FA = async () => {
    try {
      const { data } = await enable2FA();
      if (data.data) {
        setResult2FA(data.data);
        setShowQRCode(true);
        setIsEnabled(true);
      }
    } catch (error) {
      handleErrorApi({ error });
    }
  };

  const onShowQRCode = () => {
    if (!result2FA && profile?.totpSecret && profile?.uriSecret) {
      setResult2FA({ secret: profile.totpSecret, uri: profile.uriSecret });
    }
    setShowQRCode(true);
  };

  return {
    isEnabling,
    handleEnable2FA,
    onShowQRCode,
    result2FA,
    showQRCode,
    setShowQRCode,
    setShowDisableModal,
    showDisableModal,
    isDisabling,
    error,
    value,
    setValue,
    handleDisable,
    setIsEnabled,
    isEnabled,
    setError,
  };
};
