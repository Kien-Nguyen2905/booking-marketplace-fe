'use client';
import { GoogleIcon } from '@/icons';
import React from 'react';
import { Button } from '@/components/ui/button';
import { LoginModal } from '@/components/LoginModal';
import { RegisterModal } from '@/components/RegisterModal';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useModalAuth } from './useModalAuth';
import { ForgotPassword } from '@/components/ForgotPassword';
const modeTitles: Record<string, string> = {
  login: 'Login',
  register: 'Register',
  password: 'Forgot Password',
};

const ModalAuth = () => {
  const { isOpenModal, closeModal, mode, switchMode, onLoginGoogle } =
    useModalAuth();

  return (
    <Dialog open={isOpenModal} onOpenChange={closeModal}>
      <DialogContent className="sm:max-w-[510px] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold">
            {modeTitles[mode]}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {mode === 'login' && (
            <>
              <LoginModal />
              <div className="text-right text-sm">
                <button
                  type="button"
                  className="font-medium text-primary hover:text-primary/80"
                  onClick={() => switchMode('password')}
                >
                  Forgot password
                </button>
              </div>
            </>
          )}

          {mode === 'register' && <RegisterModal />}
          {mode === 'password' && <ForgotPassword />}
        </div>

        <div className="relative my-2">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">
              Or continue with
            </span>
          </div>
        </div>

        <div className="grid gap-3">
          <Button variant="outline" className="h-12" onClick={onLoginGoogle}>
            <GoogleIcon /> Google
          </Button>
        </div>

        <div className="text-center mt-2">
          <p className="text-sm text-gray-600">
            {mode === 'login' ? (
              <>Do not have an account? </>
            ) : (
              <>Already have an account? </>
            )}
            <button
              type="button"
              onClick={() =>
                switchMode(mode === 'login' ? 'register' : 'login')
              }
              className="font-medium text-primary hover:text-primary/80"
            >
              {mode === 'login' ? 'Register' : 'Login'}
            </button>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ModalAuth;
