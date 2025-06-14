import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import { LoadingButton, RHFInput, RHFSelection } from '@/components';
import { useRoomForm } from '@/features/partner/room/components/RoomForm/useRoomForm';
import { POLICY_TYPE } from '@/constants';
import { Button } from '@/components/ui/button';
import { RoomType } from '@/models/room.model';

const RoomForm = ({
  open,
  onOpenChange,
  room,
  selectedRoomTypeId,
}: {
  open: boolean;
  onOpenChange: () => void;
  room?: RoomType | null;
  selectedRoomTypeId?: number;
}) => {
  const { form, handleSubmit, isSubmitting } = useRoomForm(
    room,
    selectedRoomTypeId,
    onOpenChange,
  );
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Room</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <div className="space-y-4">
              <RHFInput
                form={form}
                name="quantity"
                required
                type="number"
                label="Quantity"
                min={1}
              />
              <RHFInput
                form={form}
                name="price"
                required
                type="number"
                label="Price"
                min={1}
              />
              <RHFSelection
                form={form}
                label="Policy"
                name="policy"
                required
                list={Object.values(POLICY_TYPE).map((policy) => ({
                  value: policy,
                  label: policy,
                }))}
              />
              {form.watch('policy') === POLICY_TYPE.PAY_AT_HOTEL && (
                <RHFInput
                  form={form}
                  name="rangeLimitDate"
                  type="number"
                  label="Range Limit Date"
                  min={0}
                />
              )}
              <RHFInput
                form={form}
                name="notePolicy"
                type="text"
                label="Note Policy"
              />
            </div>
            <div className="flex justify-end">
              <Button
                disabled={isSubmitting}
                type="submit"
                className="w-[90px] h-10 relative"
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

export default RoomForm;
