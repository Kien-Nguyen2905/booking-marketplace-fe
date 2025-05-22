'use client';

import { Button } from '@/components/ui/button';
import { QrCode, Loader2, ShieldAlert, TabletSmartphone } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { QRCodeSVG } from 'qrcode.react';
import { InputOTPCustom, LoadingButton } from '@/components';
import { useTwoFactorAuthenticator } from './useTwoFactorAuthenticator';

const TwoFactorAuthenticator = () => {
  const {
    isEnabling,
    handleEnable2FA,
    showQRCode,
    setShowQRCode,
    setShowDisableModal,
    showDisableModal,
    isDisabling,
    error,
    value,
    setValue,
    handleDisable,
    isEnabled,
    result2FA,
    setError,
    onShowQRCode,
  } = useTwoFactorAuthenticator();
  return (
    <div className="p-4 lg:p-6 border-0 shadow-none">
      <div className="grid gap-4">
        <div className="flex items-start space-x-4">
          <div className="p-2 bg-[var(--brand)]/5 rounded-lg">
            <TabletSmartphone className="h-5 w-5 text-[var(--blue-primary)]" />
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium">Authenticator App</p>
            <p className="text-sm text-slate-500">
              Use an authenticator app to generate verification codes
            </p>
          </div>
        </div>
        <div className="flex items-center justify-end space-x-2">
          {isEnabled ? (
            <>
              <Button
                variant="outline"
                className="w-full sm:w-auto"
                onClick={() => setShowDisableModal(true)}
                disabled={isDisabling}
              >
                {isDisabling ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <ShieldAlert className="h-4 w-4 mr-2" />
                )}
                Disable 2FA
              </Button>
              <Button
                variant="outline"
                className="w-full sm:w-auto"
                onClick={onShowQRCode}
              >
                <QrCode className="h-4 w-4 mr-2" />
                Setup Authenticator
              </Button>
            </>
          ) : (
            <Button
              variant="outline"
              className="w-full sm:w-auto"
              onClick={handleEnable2FA}
              disabled={isEnabling}
            >
              {isEnabling ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <QrCode className="h-4 w-4 mr-2" />
              )}
              Enable 2FA
            </Button>
          )}
        </div>
        <Dialog open={showQRCode} onOpenChange={setShowQRCode}>
          <DialogTrigger asChild></DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Setup Two-Factor Authentication</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="flex justify-center p-4 bg-slate-50 rounded-lg">
                {result2FA?.uri ? (
                  <QRCodeSVG
                    value={result2FA.uri}
                    size={200}
                    className="rounded-lg"
                  />
                ) : (
                  <div className="w-48 h-48 bg-slate-200 rounded-lg flex items-center justify-center">
                    <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
                  </div>
                )}
              </div>
              <div className="space-y-2 text-center">
                <p className="text-sm text-slate-500">
                  Enter the digit code from your authenticator app
                </p>
                {result2FA?.secret && (
                  <p className="text-lg font-semibold">{result2FA.secret}</p>
                )}
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={showDisableModal} onOpenChange={setShowDisableModal}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Disable Two-Factor Authentication</DialogTitle>
              <DialogDescription>
                Enter the 6-digit code from your authenticator app to disable
                2FA
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="flex flex-col items-center gap-4">
                <InputOTPCustom
                  value={value}
                  onChange={(value) => setValue(value)}
                  error={error}
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => {
                  setShowDisableModal(false);
                  setValue('');
                  setError('');
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={handleDisable}
                disabled={isDisabling || value.length !== 6}
                className="min-w-[110px] h-9 relative"
              >
                {isDisabling ? (
                  <>
                    <LoadingButton />
                  </>
                ) : (
                  'Disable 2FA'
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};
export default TwoFactorAuthenticator;
