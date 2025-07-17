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
import ConfirmDialog from '@/components/ConfirmDialog/ConfirmDialog';

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
  const {
    form,
    handleSubmit,
    isSubmitting,
    showConfirmDialog,
    setShowConfirmDialog,
    exceedingOrders,
    handleConfirmUpdate,
  } = useRoomForm(room, selectedRoomTypeId, onOpenChange);
  // Create warning message for dialog
  const createWarningMessage = () => {
    if (!exceedingOrders || exceedingOrders.length === 0) return null;

    return (
      <div className="text-sm">
        <div className="font-medium mb-2">
          Warning: There are orders containing more room quantity than the new
          room quantity{' '}
          <strong className="text-black font-bold">
            ({form.watch('quantity')} rooms)
          </strong>
          . Please note when guests check in to avoid mistakes.
        </div>
        <div className="mt-2 max-h-[200px] overflow-y-auto">
          {exceedingOrders.map((order: any) => (
            <div
              key={order.id}
              className="p-2 border border-amber-200 bg-amber-50 rounded mb-2"
            >
              <p>
                Order ID: <span className="font-medium">{order.id}</span>
              </p>
              <p>
                Room Quantity:{' '}
                <span className="font-medium">{order.quantity}</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <>
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
                  min={0}
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

      {/* Confirmation Dialog for orders exceeding quantity */}
      <ConfirmDialog
        open={showConfirmDialog}
        onOpenChange={setShowConfirmDialog}
        isLoading={isSubmitting}
        handleConfirm={handleConfirmUpdate}
        title="Warning: Room quantity is not enough"
        descriptionComponent={createWarningMessage()}
        confirmText="Confirm"
        variant="default"
      />
    </>
  );
};

export default RoomForm;
