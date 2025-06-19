import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import React, { FC } from 'react';
import { TAccountOrderItemReviewProps } from './type';
import { useAccountOrderItemReview } from '@/features/account/pages/order/components/AccountOrderItemReview/useAccountOrderItemReview';
import { Form } from '@/components/ui/form';
import { LoadingButton, RHFInput } from '@/components';
import { Button } from '@/components/ui/button';
import StartRating from '@/components/StartRating/StartRating';
import { Label } from '@/components/ui/label';

const AccountOrderItemReview: FC<TAccountOrderItemReviewProps> = ({
  open,
  onOpenChange,
  selectedOrder,
}) => {
  const { form, handleRatingChange, handleCreateReview, isSubmitting } =
    useAccountOrderItemReview(onOpenChange, selectedOrder);
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Review (You can get a reward point)</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleCreateReview, (error) => {
              console.log(error);
            })}
            className="space-y-4"
          >
            <RHFInput
              form={form}
              label="Title"
              name="title"
              placeholder="Enter title"
              required
            />
            <RHFInput
              form={form}
              label="Content"
              name="content"
              placeholder="Enter content"
              required
            />
            <div className="space-y-2">
              <Label>Rating</Label>
              <StartRating
                rating={form.watch('rating') || 0}
                interactive={true}
                onChange={handleRatingChange}
                size={24}
                maxRating={5}
              />
            </div>
            <div className="flex justify-end">
              <Button
                disabled={isSubmitting}
                type="submit"
                className="w-[100px] h-9 relative"
              >
                {isSubmitting ? <LoadingButton /> : 'Review'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AccountOrderItemReview;
