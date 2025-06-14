import { useMultipleUploading } from '@/components/MultipleUploading/useMultipleUploading';
import { useParams } from 'next/navigation';
import {
  useDeleteFilesMutation,
  useDeleteRoomTypeMutation,
  useGetAmenitiesQuery,
  useGetRoomTypeByIdQuery,
  useUpdateRoomTypeAmenitiesMutation,
  useUpdateRoomTypeBedMutation,
  useUpdateRoomTypeMutation,
} from '@/queries';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  CreateRoomTypeBodyType,
  UpdateRoomTypeBodySchema,
  UpdateRoomTypeBodyType,
} from '@/models/room-type.model';
import { useEffect, useState } from 'react';
import { GetAmenityResType } from '@/models/amenity.model';
import { RoomBedType, ROUTES, SUCCESS_MESSAGES } from '@/constants';
import { handleErrorApi } from '@/lib/helper';
import { showToast } from '@/lib/toast';
import { useRouter } from 'next/navigation';

export const usePartnerRoomTypeDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const uploader = useMultipleUploading(4);
  const { data: roomTypeData } = useGetRoomTypeByIdQuery(id);
  const roomType = roomTypeData?.data.data;

  const { mutateAsync: updateRoomType, isPending: isUpdatingRoomType } =
    useUpdateRoomTypeMutation(roomType?.id || 0);
  const { mutateAsync: updateRoomBed, isPending: isUpdatingRoomBed } =
    useUpdateRoomTypeBedMutation();
  const { mutateAsync: updateAmenities, isPending: isUpdatingAmenities } =
    useUpdateRoomTypeAmenitiesMutation();
  const { mutateAsync: deleteRoomType, isPending: isDeletingRoomType } =
    useDeleteRoomTypeMutation();
  const { mutateAsync: deleteImage } = useDeleteFilesMutation();
  const { data: amenitiesData } = useGetAmenitiesQuery();

  const allAmenities =
    amenitiesData?.data.data.filter((item) => item.category === 'ROOM') || [];

  const [amenities, setAmenities] = useState<GetAmenityResType[]>(
    roomType?.amenities || [],
  );
  const [openAmenity, setOpenAmenity] = useState(false);
  const [openRoom, setOpenRoom] = useState(false);
  const [openQuantity, setOpenQuantity] = useState(false);

  const [valueRoom, setValueRoom] = useState('');
  const [roomQuantity, setRoomQuantity] = useState(1);
  const [roomBeds, setRoomBeds] = useState<
    Array<{ roomBedType: RoomBedType; quantity: number }>
  >(
    roomType?.roomBed?.map((item) => ({
      roomBedType: item.roomBedType,
      quantity: item.quantity,
    })) || [],
  );

  const [searchValue, setSearchValue] = useState('');

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const form = useForm<UpdateRoomTypeBodyType>({
    resolver: zodResolver(UpdateRoomTypeBodySchema),
    defaultValues: {
      hotelId: roomType?.hotelId || 0,
      type: roomType?.type || '',
      adults: roomType?.adults || 1,
      child: roomType?.child || 0,
      area: roomType?.area || 0,
      serviceFeeRate: roomType?.serviceFeeRate || 0,
      description: roomType?.description || '',
      images: [],
    },
  });

  const onAddAmenity = (amenity: GetAmenityResType) => {
    if (!amenities.some((item) => item.id === amenity.id)) {
      setAmenities((prev) => [amenity, ...prev]);
    }
    setOpenAmenity(false);
    setSearchValue('');
  };

  const onRemoveAmenity = (amenityId: number) => {
    setAmenities((prev) => prev.filter((item) => item.id !== amenityId));
  };

  const getAvailableAmenities = () => {
    const amenityIds = amenities.map((item) => item.id);
    return allAmenities.filter((amenity) => !amenityIds.includes(amenity.id));
  };

  const onSelectRoomBed = (roomBedType: string) => {
    setValueRoom(roomBedType);
    setOpenRoom(false);
    setOpenQuantity(true);
  };

  const onCancelAddRoomBed = () => {
    setOpenQuantity(false);
    setRoomQuantity(1);
  };

  const onAddRoomBed = () => {
    // Add the room type with quantity to the selected rooms list
    const existingRoomIndex = roomBeds.findIndex(
      (room) => room.roomBedType === valueRoom,
    );

    if (existingRoomIndex >= 0) {
      // Update existing room quantity
      const updatedRooms = [...roomBeds];
      updatedRooms[existingRoomIndex].quantity = roomQuantity;
      setRoomBeds(updatedRooms);
    } else {
      // Add new room type
      setRoomBeds([
        ...roomBeds,
        {
          roomBedType: valueRoom as RoomBedType,
          quantity: roomQuantity,
        },
      ]);
    }

    // Reset and close dialog
    setOpenQuantity(false);
    setRoomQuantity(1);
  };

  const onRemoveRoomBed = (index: number) => {
    const updatedRooms = [...roomBeds];
    updatedRooms.splice(index, 1);
    setRoomBeds(updatedRooms);
  };

  const handleUpdateRoomBed = async () => {
    try {
      if (!roomType?.id) return;

      if (roomBeds.length === 0) {
        showToast({
          type: 'error',
          message: 'Please select at least one bedroom',
        });
        return;
      }
      const { data } = await updateRoomBed({
        id: roomType?.id,
        body: {
          roomBeds,
        },
      });
      if (data.data) {
        showToast({
          type: 'success',
          message: SUCCESS_MESSAGES.UPDATED,
        });
      }
    } catch (error) {
      handleErrorApi({ error, setError: form.setError });
    }
  };

  const handleUpdateAmenities = async () => {
    try {
      if (!roomType?.id) return;
      const { data } = await updateAmenities({
        id: roomType?.id,
        body: {
          amenities: amenities.map((item) => item.id),
        },
      });
      if (data.data) {
        showToast({
          type: 'success',
          message: SUCCESS_MESSAGES.UPDATED,
        });
      }
    } catch (error) {
      handleErrorApi({ error, setError: form.setError });
    }
  };

  const handleUpdateRoomType = async (values: CreateRoomTypeBodyType) => {
    try {
      if (!roomType?.hotelId) return;
      const imageUrls = await uploader.uploadAllImages();
      if (imageUrls) {
        const roomTypeData = {
          ...values,
          hotelId: roomType?.hotelId,
          images: imageUrls as [string, ...string[]],
        };
        const { data } = await updateRoomType(roomTypeData);
        if (data.data?.id) {
          showToast({
            type: 'success',
            message: SUCCESS_MESSAGES.UPDATED,
          });
        }
      }
    } catch (error) {
      handleErrorApi({ error, setError: form.setError });
    }
  };

  const handleDeleteRoomType = async () => {
    try {
      if (!roomType?.id) return;
      const { data } = await deleteRoomType(roomType?.id);
      if (data.data) {
        deleteImage({
          oldFileKeys: roomType?.images || [],
        });
        showToast({
          type: 'success',
          message: SUCCESS_MESSAGES.DELETED,
        });
        router.push(ROUTES.PARTNER.ROOM_TYPES);
      }
    } catch (error) {
      handleErrorApi({ error, setError: form.setError });
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (roomType?.id) {
        form.reset({
          hotelId: roomType.hotelId,
          type: roomType?.type || '',
          adults: roomType?.adults || 1,
          child: roomType?.child || 0,
          area: roomType?.area || 0,
          serviceFeeRate: Math.round(roomType?.serviceFeeRate * 100),
          description: roomType?.description || '',
          images: roomType?.images || [],
        });
        setAmenities(roomType?.amenities || []);
        setRoomBeds(
          roomType?.roomBed?.map((item) => ({
            roomBedType: item.roomBedType,
            quantity: item.quantity,
          })) || [],
        );
      }
    }, 100);
    return () => clearTimeout(timer);
  }, [roomType, form]);

  const dialogRoomQuantityProps = {
    openQuantity,
    setOpenQuantity,
    valueRoom,
    roomQuantity,
    setRoomQuantity,
    onCancelAddRoomBed,
    onAddRoomBed,
  };

  return {
    uploader,
    form,
    amenities,
    roomBeds,
    availableAmenities: getAvailableAmenities(),
    onAddAmenity,
    onRemoveAmenity,
    openAmenity,
    setOpenAmenity,
    openRoom,
    setOpenRoom,
    searchValue,
    onSelectRoomBed,
    onRemoveRoomBed,
    handleUpdateRoomBed,
    isUpdatingRoomBed,
    handleUpdateAmenities,
    isUpdatingAmenities,
    handleUpdateRoomType,
    isUpdatingRoomType,
    handleDeleteRoomType,
    isDeletingRoomType,
    dialogRoomQuantityProps,
    roomType,
    showDeleteConfirm,
    setShowDeleteConfirm,
  };
};
