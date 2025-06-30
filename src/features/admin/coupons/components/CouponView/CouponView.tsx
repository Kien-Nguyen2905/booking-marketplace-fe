import { LoadingButton, RHFInput } from '@/components';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import { TCouponViewProps } from '@/features/admin/coupons/components/CouponView/type';
import { format } from 'date-fns';
import React, { FC } from 'react';

const CouponView: FC<TCouponViewProps> = ({
  open,
  onOpenChange,
  selectedCoupon,
  form,
  handleSubmit,
  isSubmitting,
  handleDelete,
  isSubmittingDelete,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Coupon ID: #{selectedCoupon?.id}</DialogTitle>
          {selectedCoupon && (
            <div className="flex items-center justify-between text-sm">
              <span>
                Created :{' '}
                {format(
                  new Date(selectedCoupon?.createdAt || ''),
                  'dd/MM/yyyy-HH:mm',
                )}
              </span>
              <span>
                Updated :{' '}
                {format(
                  new Date(selectedCoupon?.updatedAt || ''),
                  'dd/MM/yyyy-HH:mm',
                )}
              </span>
            </div>
          )}
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <div className="space-y-4">
              <RHFInput
                form={form}
                name="title"
                label="Title"
                placeholder="Title"
                required
              />
              <RHFInput
                form={form}
                name="description"
                label="Description"
                placeholder="Description"
                required
              />
              <RHFInput
                form={form}
                name="percentage"
                label="Percentage %"
                placeholder="Percentage"
                required
                min={1}
                type="number"
              />
              <RHFInput
                form={form}
                name="amount"
                label="Amount"
                placeholder="Amount"
                required
                min={1}
                type="number"
              />
            </div>

            <div className="flex pt-4 items-center gap-2 justify-end">
              {selectedCoupon && (
                <Button
                  type="button"
                  variant="destructive"
                  className="w-[110px] h-10"
                  disabled={isSubmittingDelete}
                  onClick={handleDelete}
                >
                  {isSubmittingDelete ? <LoadingButton /> : 'Delete'}
                </Button>
              )}
              <Button
                type="submit"
                className="w-[110px] h-10 relative"
                disabled={isSubmitting}
              >
                {isSubmitting ? <LoadingButton /> : 'Save'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CouponView;
