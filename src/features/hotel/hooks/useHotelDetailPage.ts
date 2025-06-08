import { useParams } from 'next/navigation';
import {
  useAvailableRoomsByRoomIds,
  useGetHotelByIdQuery,
  useGetWishlistsByUserIdQuery,
  useDeleteWishlistMutation,
  useGetPromotionsByValidFromQuery,
} from '@/queries';
import { AMENITY_CATEGORY, SUCCESS_MESSAGES } from '@/constants';
import { useState } from 'react';
import { GetRoomTypeByIdResType } from '@/models/room-type.model';
import { useSearchParams } from 'next/navigation';
import { useCreateWishlistMutation } from '@/queries';
import { showToast } from '@/lib/toast';
import { handleErrorApi } from '@/lib/helper';
import { useAppContext } from '@/context/AppProvider';
import { parse, startOfDay } from 'date-fns';

export const useHotelDetailPage = () => {
  const { profile, toggleModal } = useAppContext();
  const params = useParams();
  const searchParams = useSearchParams();
  const id = params.id as string;

  const { data: wishlistData } = useGetWishlistsByUserIdQuery(!!profile?.id);
  const { mutateAsync: createWishlist } = useCreateWishlistMutation();
  const { mutateAsync: deleteWishlist } = useDeleteWishlistMutation();
  const wishlists = wishlistData?.data.data;
  const wishlist = wishlists?.find(
    (wishlist) => wishlist.hotelId === Number(id),
  );

  const startDateParams = searchParams.get('start');
  const endDateParams = searchParams.get('end');
  const availableParam = Number(searchParams.get('available')) || 0;
  const adultParam = Number(searchParams.get('adult')) || 0;
  const childParam = Number(searchParams.get('child')) || 0;

  const queryStringPromotion = `validFrom=${startDateParams}&validUntil=${endDateParams}`;
  const { data: promotionsData } =
    useGetPromotionsByValidFromQuery(queryStringPromotion);

  const promotionToday = promotionsData?.data.data.todayPromotions;
  const promotionNotToday = promotionsData?.data.data.promotions[0];
  const { data: hotelData } = useGetHotelByIdQuery(id);
  const hotel = hotelData?.data.data;
  const roomTypeList = hotel?.roomType || [];
  const roomIdList =
    roomTypeList.flatMap((roomType) => roomType.room.map((room) => room.id)) ||
    [];
  const amenityServices = hotel?.hotelAmenity.filter(
    (amenity) => amenity.amenity.category === AMENITY_CATEGORY.SERVICE,
  );
  const amenityPublic = hotel?.hotelAmenity.filter(
    (amenity) => amenity.amenity.category === AMENITY_CATEGORY.PUBLIC,
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRoomType, setSelectedRoomType] =
    useState<GetRoomTypeByIdResType | null>(null);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handleOpenRoomDetails = (room: GetRoomTypeByIdResType) => {
    setSelectedRoomType(room);
    setIsModalOpen(true);
  };
  const results = useAvailableRoomsByRoomIds(
    roomIdList,
    `start=${startDateParams}&end=${endDateParams}`,
  );
  const availableRooms = results.map((result) => result.data?.data.data);

  const handleCreateWishlist = async () => {
    if (wishlist) return;
    try {
      const { data } = await createWishlist({ hotelId: +id });
      if (data?.data) {
        showToast({
          type: 'success',
          message: SUCCESS_MESSAGES.ADDED,
        });
      }
    } catch (error: any) {
      handleErrorApi({
        error,
      });
    }
  };

  const handleDeleteWishlist = async () => {
    if (!wishlist) return;
    try {
      const { data } = await deleteWishlist(wishlist.id);
      if (data?.data) {
        showToast({
          type: 'success',
          message: SUCCESS_MESSAGES.REMOVED,
        });
      }
    } catch (error: any) {
      handleErrorApi({
        error,
      });
    }
  };

  const handleWishlist = () => {
    if (!profile?.id) {
      toggleModal();
      return;
    }
    if (wishlist) return handleDeleteWishlist;
    return handleCreateWishlist;
  };

  const now = startOfDay(new Date());
  const targetDate =
    startDateParams &&
    startOfDay(parse(startDateParams, 'dd-MM-yyyy', new Date()));

  const isFuture = targetDate && targetDate > now;
  return {
    hotelId: id,
    hotel,
    amenityServices,
    amenityPublic,
    isModalOpen,
    handleCloseModal,
    handleOpenRoomDetails,
    selectedRoomType,
    startDateParams,
    endDateParams,
    availableParam,
    adultParam,
    childParam,
    availableRooms,
    wishlist,
    handleWishlist,
    promotion: promotionToday || promotionNotToday,
    isFuture,
  };
};
