import { SUCCESS_MESSAGES } from '@/constants';
import { useAppContext } from '@/context/AppProvider';
import { handleErrorApi } from '@/lib/helper';
import { showToast } from '@/lib/toast';
import { GetRoomTypeByIdResType } from '@/models/room-type.model';
import { RoomType } from '@/models/room.model';
import { useDeleteRoomMutation, useGetRoomTypesQuery } from '@/queries';
import { useState } from 'react';

export const usePartnerRoom = () => {
  const { partnerProfile } = useAppContext();
  const hotelId = partnerProfile?.hotel?.id || 0;
  const { data } = useGetRoomTypesQuery(hotelId);
  const roomTypes = data?.data.data;

  const { mutateAsync: deleteRoom, isPending: isDeleting } =
    useDeleteRoomMutation();
  const [selectedRoomType, setSelectedRoomType] =
    useState<GetRoomTypeByIdResType | null>(null);

  const [selectedRoom, setSelectedRoom] = useState<RoomType | null>(null);
  const [selectedRoomTypeId, setSelectedRoomTypeId] = useState<number>(0);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeletedOpen, setIsDeletedOpen] = useState(false);

  const handleOpenRoomDetails = (room: GetRoomTypeByIdResType) => {
    setSelectedRoomType(room);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedRoom(null);
    setSelectedRoomTypeId(0);
  };

  const onOpenForm = (roomTypeId: number) => {
    setSelectedRoomTypeId(roomTypeId);
    setSelectedRoom(null);
    setIsFormOpen(true);
  };

  const onCloseForm = () => {
    setIsFormOpen(false);
    setSelectedRoomTypeId(0);
    setSelectedRoom(null);
  };

  const onUpdateRoom = (room: RoomType) => {
    setSelectedRoomTypeId(room.roomTypeId);
    setSelectedRoom(room);
    setIsFormOpen(true);
  };

  const onDeleteRoom = (roomTypeId: number) => {
    setSelectedRoomTypeId(roomTypeId);
    setIsDeletedOpen(true);
  };

  const handleDeleteRoom = async () => {
    try {
      const { data } = await deleteRoom(selectedRoomTypeId);
      if (data?.data) {
        showToast({
          type: 'success',
          message: SUCCESS_MESSAGES.DELETED,
        });
        setIsDeletedOpen(false);
      }
    } catch (error) {
      handleErrorApi({ error });
    }
  };
  return {
    roomTypes,
    selectedRoomType,
    selectedRoom,
    isModalOpen,
    handleOpenRoomDetails,
    handleCloseModal,
    isFormOpen,
    onOpenForm,
    onCloseForm,
    onUpdateRoom,
    hotelId,
    selectedRoomTypeId,
    setIsFormOpen,
    isDeletedOpen,
    setIsDeletedOpen,
    handleDeleteRoom,
    isDeleting,
    onDeleteRoom,
  };
};
