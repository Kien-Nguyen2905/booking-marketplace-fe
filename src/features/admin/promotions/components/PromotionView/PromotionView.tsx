import React, { FC } from 'react';
import { TPromotionViewProps } from './type';
import { Form } from '@/components/ui/form';
import { LoadingButton, RHFInput, RHFPickDate } from '@/components';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';

const PromotionView: FC<TPromotionViewProps> = ({
  open,
  onOpenChange,
  selectedPromotion,
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
          <DialogTitle>Promotion</DialogTitle>
          {selectedPromotion && (
            <div className="flex items-center justify-between text-sm">
              <span>
                Created :{' '}
                {format(
                  new Date(selectedPromotion?.createdAt),
                  'dd/MM/yyyy-HH:mm',
                )}
              </span>
              <span>
                Updated :{' '}
                {format(
                  new Date(selectedPromotion?.updatedAt),
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
                name="percentage"
                label="Percentage %"
                placeholder="Percentage"
                required
                min={1}
                type="number"
              />
              <RHFInput
                form={form}
                name="sharePercentage"
                label="Share Percentage %"
                placeholder="Share Percentage"
                required
                min={0}
                type="number"
              />
              <RHFInput
                form={form}
                name="validFrom"
                label="Valid From"
                placeholder="Pick valid from"
                required
                renderProp={(props: any, field: any) => (
                  <RHFPickDate
                    field={field}
                    {...props}
                    disabled={(date) => date < new Date()}
                  />
                )}
              />

              <RHFInput
                form={form}
                name="validUntil"
                label="Valid Until"
                placeholder="Pick valid until"
                required
                renderProp={(props: any, field: any) => (
                  <RHFPickDate
                    field={field}
                    {...props}
                    disabled={(date) => date < new Date()}
                  />
                )}
              />
            </div>

            <div className="flex pt-4 items-center gap-2 justify-end">
              {selectedPromotion && (
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

export default PromotionView;
