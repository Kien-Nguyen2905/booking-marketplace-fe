import { useMultipleUploading } from '@/components/MultipleUploading/useMultipleUploading';
import {
  ERROR_MESSAGES,
  RoomBedType,
  ROUTES,
  SUCCESS_MESSAGES,
} from '@/constants';
import { useAppContext } from '@/context/AppProvider';
import { handleErrorApi } from '@/lib/helper';
import { showToast } from '@/lib/toast';
import { GetAmenityResType } from '@/models/amenity.model';
import {
  CreateRoomTypeBodySchema,
  CreateRoomTypeBodyType,
} from '@/models/room-type.model';
import {
  useCreateRoomBedMutation,
  useCreateRoomTypeAmenitiesMutation,
  useCreateRoomTypeMutation,
  useGetAmenitiesQuery,
} from '@/queries';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

export const usePartnerCreateRoomTypesPage = () => {
  const { partnerProfile } = useAppContext();
  const hotelId = partnerProfile?.hotel?.id || 0;
  const router = useRouter();
  const uploader = useMultipleUploading(4);
  const { mutateAsync: createRoomType } = useCreateRoomTypeMutation();
  const { mutateAsync: createRoomBed } = useCreateRoomBedMutation();
  const { mutateAsync: createRoomTypeAmenities } =
    useCreateRoomTypeAmenitiesMutation();
  const { data } = useGetAmenitiesQuery();
  const allAmenities =
    data?.data.data.filter((item) => item.category === 'ROOM') || [];
  const [amenities, setAmenities] = useState<GetAmenityResType[]>([]);
  const [openAmenity, setOpenAmenity] = useState(false);
  const [openRoom, setOpenRoom] = useState(false);
  const [openQuantity, setOpenQuantity] = useState(false);

  const [valueRoom, setValueRoom] = useState('');
  const [roomQuantity, setRoomQuantity] = useState(1);
  const [roomBeds, setRoomBeds] = useState<
    Array<{ roomBedType: RoomBedType; quantity: number }>
  >([]);

  const [searchValue, setSearchValue] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<CreateRoomTypeBodyType>({
    resolver: zodResolver(CreateRoomTypeBodySchema),
    defaultValues: {
      hotelId,
      type: '',
      adults: 1,
      child: 0,
      area: 0,
      serviceFeeRate: 0,
      description: '',
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

  const handleCreateRoomType = async (values: CreateRoomTypeBodyType) => {
    setIsSubmitting(true);
    try {
      if (roomBeds.length === 0) {
        showToast({
          type: 'error',
          message: ERROR_MESSAGES.SELECT_ROOM_TYPE,
        });
        return;
      }
      const imageUrls = await uploader.uploadAllImages();
      if (imageUrls) {
        const roomTypeData = {
          ...values,
          hotelId,
          images: imageUrls as [string, ...string[]],
        };
        const { data } = await createRoomType(roomTypeData);
        if (data.data?.id) {
          const [roomBedsResult, amenitiesResult] = await Promise.all([
            createRoomBed({
              roomTypeId: data.data.id,
              body: {
                roomBeds,
              },
            }),
            createRoomTypeAmenities({
              roomTypeId: data.data.id,
              body: {
                amenities: amenities.map((item) => item.id),
              },
            }),
          ]);
          if (roomBedsResult.data.data && amenitiesResult.data.data) {
            router.push(ROUTES.PARTNER.ROOM_TYPES);
            showToast({
              type: 'success',
              message: SUCCESS_MESSAGES.CREATED,
            });
          }
        }
      }
    } catch (error) {
      handleErrorApi({ error, setError: form.setError });
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (partnerProfile) {
      form.reset({
        hotelId: partnerProfile.hotel.id,
        type: '',
        adults: 1,
        child: 0,
        area: 0,
        serviceFeeRate: 0,
        description: '',
        images: [],
      });
    }
  }, [partnerProfile, form]);

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
    form,
    uploader,
    openAmenity,
    setOpenAmenity,
    openRoom,
    setOpenRoom,
    roomBeds,
    amenities,
    onAddAmenity,
    onRemoveAmenity,
    availableAmenities: getAvailableAmenities(),
    handleCreateRoomType,
    isSubmitting,
    searchValue,
    dialogRoomQuantityProps,
    onRemoveRoomBed,
    onSelectRoomBed,
  };
};
