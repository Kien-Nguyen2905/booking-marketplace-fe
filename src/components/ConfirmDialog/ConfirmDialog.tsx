import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import React, { FC } from 'react';
import { Button } from '@/components/ui/button';
import { LoadingButton } from '@/components';
import { TConfirmDialogProps } from '@/components/ConfirmDialog/type';

const ConfirmDialog: FC<TConfirmDialogProps> = ({
  open,
  onOpenChange,
  isLoading,
  handleConfirm,
  title,
  description,
  confirmText,
  variant = 'destructive',
  descriptionComponent,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {!descriptionComponent ? (
            <DialogDescription>{description}</DialogDescription>
          ) : (
            descriptionComponent
          )}
        </DialogHeader>
        <DialogFooter className="gap-2 sm:justify-end">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isLoading}
            className="w-[90px] h-9"
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant={variant}
            disabled={isLoading}
            onClick={() => {
              handleConfirm();
              onOpenChange(false);
            }}
            className="relative w-[90px] h-9"
          >
            {isLoading ? <LoadingButton /> : confirmText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmDialog;
