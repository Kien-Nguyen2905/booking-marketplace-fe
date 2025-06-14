import { POLICY_TYPE, SUCCESS_MESSAGES } from '@/constants';
import { handleErrorApi } from '@/lib/helper';
import { showToast } from '@/lib/toast';
import {
  CreateRoomBodySchema,
  CreateRoomBodyType,
  RoomType,
  UpdateRoomBodyType,
} from '@/models/room.model';
import { useCreateRoomMutation } from '@/queries';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useUpdateRoomMutation } from '@/queries';
import { usePartnerRoom } from '@/features/partner/room/hooks';

export const useRoomForm = (
  room?: RoomType | null,
  selectedRoomTypeId?: number,
  onOpenChange?: () => void,
) => {
  const { hotelId } = usePartnerRoom();
  const { mutateAsync: createRoom, isPending: isCreating } =
    useCreateRoomMutation();
  const { mutateAsync: updateRoom, isPending: isUpdating } =
    useUpdateRoomMutation();

  const form = useForm<CreateRoomBodyType>({
    resolver: zodResolver(CreateRoomBodySchema),
    defaultValues: {
      quantity: 0,
      hotelId,
      roomTypeId: selectedRoomTypeId || 0,
      price: 0,
      rangeLimitDate: 0,
      policy: POLICY_TYPE.NON_REFUNDABLE,
      notePolicy: '',
    },
  });

  const handleCreateRoom = async (values: CreateRoomBodyType) => {
    try {
      if (room) return;
      const { data } = await createRoom(values);
      if (data?.data) {
        showToast({
          type: 'success',
          message: SUCCESS_MESSAGES.CREATED,
        });
        onOpenChange?.();
      }
    } catch (error) {
      handleErrorApi({ error, setError: form.setError });
    }
  };

  const handleUpdateRoom = async (values: UpdateRoomBodyType) => {
    try {
      if (!room) return;
      const { data } = await updateRoom({
        id: room.id,
        body: values,
      });
      if (data?.data) {
        showToast({
          type: 'success',
          message: SUCCESS_MESSAGES.UPDATED,
        });
        onOpenChange?.();
      }
    } catch (error) {
      handleErrorApi({ error, setError: form.setError });
    }
  };

  const handleSubmit = room?.id ? handleUpdateRoom : handleCreateRoom;

  useEffect(() => {
    if (room && hotelId) {
      form.reset({
        quantity: room.quantity || 0,
        hotelId,
        roomTypeId: room.roomTypeId,
        price: room.price || 0,
        rangeLimitDate: room.rangeLimitDate || 0,
        policy: room.policy || POLICY_TYPE.NON_REFUNDABLE,
        notePolicy: room.notePolicy || '',
      });
      return;
    }
    form.reset({
      quantity: 0,
      hotelId,
      roomTypeId: selectedRoomTypeId,
      price: 0,
      rangeLimitDate: 0,
      policy: POLICY_TYPE.NON_REFUNDABLE,
      notePolicy: '',
    });
  }, [room, hotelId, selectedRoomTypeId, form]);
  return {
    form,
    handleSubmit,
    isSubmitting: isCreating || isUpdating,
  };
};
