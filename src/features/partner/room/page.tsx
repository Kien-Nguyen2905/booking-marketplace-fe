'use client';
import React, { Fragment } from 'react';
import { usePartnerRoom } from './hooks/usePartnerRoom';
import {
  CalendarOff,
  Edit,
  HandCoins,
  MoreHorizontal,
  RefreshCwOff,
  Trash2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { formatCurrency } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  ButtonBack,
  ConfirmDialog,
  RoomCarousel,
  RoomDetailModal,
} from '@/components';
import { RoomForm } from '@/features/partner/room/components';
import { Separator } from '@/components/ui/separator';
import { POLICY_TYPE_LIST, ROUTES } from '@/constants';

const PartnerRoomPage = () => {
  const {
    roomTypes,
    selectedRoomType,
    isModalOpen,
    handleOpenRoomDetails,
    handleCloseModal,
    isFormOpen,
    onOpenForm,
    onCloseForm,
    selectedRoom,
    onUpdateRoom,
    selectedRoomTypeId,
    isDeleting,
    handleDeleteRoom,
    isDeletedOpen,
    setIsDeletedOpen,
    onDeleteRoom,
  } = usePartnerRoom();
  if (roomTypes?.length === 0) {
    return (
      <div className="flex items-center justify-between">
        <div>Please add room types first</div>
        <ButtonBack link={ROUTES.PARTNER.ROOM_TYPES} />
      </div>
    );
  }
  return (
    <div className="my-8 mt-10">
      <div className="space-y-8">
        {roomTypes?.map((room, index) => (
          <Fragment key={room.id}>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="font-bold text-xl">{room.type}</h2>
                {room.room.length < POLICY_TYPE_LIST.length && (
                  <Button onClick={() => onOpenForm(room.id)}>Add Room</Button>
                )}
              </div>

              <div className="flex flex-col lg:flex-row gap-6">
                {/* Left side - Room image and amenities */}
                <RoomCarousel
                  room={room}
                  handleOpenRoomDetails={handleOpenRoomDetails}
                />
                {/* Right side - Room options */}
                <div className="w-full flex-1">
                  {/* Header */}
                  <div className="grid grid-cols-12 px-4 py-3 bg-gray-100 rounded-t-lg font-medium text-gray-700 text-sm border border-gray-200">
                    <div className="col-span-3 text-left">Policy</div>
                    <div className="col-span-3 text-center">Quantity</div>
                    <div className="col-span-3 text-center">Price/night</div>
                    <div className="col-span-3 text-right">Action</div>
                  </div>

                  {/* Room options */}
                  <div className="border-x border-b border-gray-200 rounded-b-lg overflow-hidden">
                    {room.room.map((item, index) => (
                      <div
                        key={index}
                        className={`p-4 grid grid-cols-12 items-start hover:bg-gray-50 transition-colors ${
                          index !== 0 ? 'border-t border-gray-200' : ''
                        }`}
                      >
                        {/* Policy */}
                        <div className="col-span-3">
                          <div className="flex flex-col gap-1">
                            <div className="flex items-center">
                              {item.policy === 'FREE_CANCELLATION' ? (
                                <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-0">
                                  <CalendarOff size={14} className="mr-1" />
                                  Free Cancellation
                                </Badge>
                              ) : item.policy === 'PAY_AT_HOTEL' ? (
                                <Badge className="bg-blue-100 text-primary hover:bg-blue-100 border-0">
                                  <HandCoins size={14} className="mr-1" />
                                  Pay at Hotel
                                </Badge>
                              ) : (
                                <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100 border-0">
                                  <RefreshCwOff size={14} className="mr-1" />
                                  Non-Refundable
                                </Badge>
                              )}
                            </div>
                            {(item?.rangeLimitDate || 0) > 0 && (
                              <span className="text-xs text-gray-500 mt-1">
                                Limit range booking: {item.rangeLimitDate} days
                              </span>
                            )}
                            {item.notePolicy && (
                              <span className="text-xs text-gray-500 mt-1">
                                {item.notePolicy}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Room option details */}
                        <div className="col-span-3 text-center">
                          {item.quantity}
                        </div>

                        {/* Price */}
                        <div className="text-orange-600 col-span-3 text-xl text-center font-bold">
                          {formatCurrency(item.price, 'VND')}
                        </div>

                        <div className="col-span-3 flex flex-col items-end">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56">
                              <DropdownMenuItem
                                className="cursor-pointer"
                                onClick={() =>
                                  setTimeout(() => onUpdateRoom(item), 50)
                                }
                              >
                                <Edit className="mr-2 h-4 w-4" />
                                <span>Update</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="cursor-pointer"
                                onClick={() =>
                                  setTimeout(() => onDeleteRoom(item.id), 50)
                                }
                              >
                                <Trash2 className="mr-2 h-4 w-4 text-destructive" />
                                <span>Delete</span>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            {roomTypes?.length > index + 1 && <Separator />}
          </Fragment>
        ))}
      </div>
      <RoomForm
        open={isFormOpen}
        onOpenChange={onCloseForm}
        room={selectedRoom}
        selectedRoomTypeId={selectedRoomTypeId}
      />
      <RoomDetailModal
        open={isModalOpen}
        onOpenChange={handleCloseModal}
        roomType={selectedRoomType!}
      />
      <ConfirmDialog
        open={isDeletedOpen}
        onOpenChange={setIsDeletedOpen}
        isLoading={isDeleting}
        handleConfirm={handleDeleteRoom}
        title="Delete room"
        description="Are you sure you want to delete this room?"
        confirmText="Delete"
        variant="destructive"
      />
    </div>
  );
};

export default PartnerRoomPage;
