import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Bed, Minus, Plus } from 'lucide-react';
import React, { FC } from 'react';
import { TDialogRoomQuantityProps } from './type';

const DialogRoomQuantity: FC<TDialogRoomQuantityProps> = ({
  openQuantity,
  setOpenQuantity,
  valueRoom,
  roomQuantity,
  setRoomQuantity,
  onCancelAddRoomBed,
  onAddRoomBed,
}) => {
  return (
    <Dialog open={openQuantity} onOpenChange={setOpenQuantity}>
      <DialogContent className="sm:max-w-[450px] p-6">
        <div className="flex items-center mb-4 gap-2">
          <DialogTitle className="text-xl font-semibold">
            Bedroom Quantity
          </DialogTitle>
        </div>
        <div className="grid gap-6">
          {/* Room Type Display */}
          <div className="bg-muted p-4 rounded-lg">
            <div className="flex justify-between items-center text-primary">
              <Bed className="h-5 w-5" />
              <div className="text-base font-medium capitalize">
                {valueRoom?.toLowerCase()}
              </div>
            </div>
          </div>
          {/* Quantity Selector */}
          <div className="border rounded-lg p-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-primary">
                How many bedrooms of type?
              </span>
              <div className="flex items-center gap-3 border rounded-md overflow-hidden">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-9 rounded-none border-r hover:bg-muted"
                  onClick={() => setRoomQuantity(Math.max(1, roomQuantity - 1))}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-10 text-center font-medium">
                  {roomQuantity}
                </span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-9 rounded-none border-l hover:bg-muted"
                  onClick={() => setRoomQuantity(roomQuantity + 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
        {/* Action Buttons */}
        <div className="flex justify-end gap-3 mt-2">
          <Button
            type="button"
            variant="outline"
            className="px-4"
            onClick={onCancelAddRoomBed}
          >
            Cancel
          </Button>
          <Button type="button" className="px-5" onClick={onAddRoomBed}>
            Add
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DialogRoomQuantity;
