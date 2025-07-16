import { useParams, useRouter } from 'next/navigation';
import {
  useAvailableRoomsByRoomIds,
  useGetHotelByIdQuery,
  useGetWishlistsByUserIdQuery,
  useDeleteWishlistMutation,
  useGetPromotionsByValidFromQuery,
  useGetReviewsQuery,
} from '@/queries';
import {
  AMENITY_CATEGORY,
  ERROR_MESSAGES,
  HOTEL_STATUS,
  MAX_ROOM_PAY_AT_HOTEL,
  POLICY_TYPE,
  PolicyType,
  ROUTES,
  SUCCESS_MESSAGES,
} from '@/constants';
import { useEffect, useState } from 'react';
import { GetRoomTypeByIdResType } from '@/models/room-type.model';
import { useSearchParams } from 'next/navigation';
import { useCreateWishlistMutation } from '@/queries';
import { showToast } from '@/lib/toast';
import { handleErrorApi } from '@/lib/helper';
import { useAppContext } from '@/context/AppProvider';
import { eachDayOfInterval, parse, startOfDay, subDays } from 'date-fns';
import { saveBooking, setVersionHotelLocalStorage } from '@/lib/utils';

export const useHotelDetailPage = () => {
  const { profile, toggleModal } = useAppContext();
  const params = useParams();
  const searchParams = useSearchParams();
  const id = params.id as string;

  const router = useRouter();

  const { data: wishlistData } = useGetWishlistsByUserIdQuery(!!profile?.id);
  const { mutateAsync: createWishlist } = useCreateWishlistMutation();
  const { mutateAsync: deleteWishlist } = useDeleteWishlistMutation();
  const wishlists = wishlistData?.data.data;
  const wishlist = wishlists?.find(
    (wishlist) => wishlist.hotelId === Number(id),
  );

  const startDateParams = searchParams.get('start') || '';
  const endDateParams = searchParams.get('end') || '';
  const availableParam = Number(searchParams.get('available')) || 0;
  const adultParam = Number(searchParams.get('adult')) || 0;
  const childParam = Number(searchParams.get('child')) || 0;
  const dateRange = eachDayOfInterval({
    start: parse(startDateParams, 'dd-MM-yyyy', new Date()),
    end: subDays(parse(endDateParams, 'dd-MM-yyyy', new Date()), 1),
  });

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

  const { data: reviewsData } = useGetReviewsQuery(id);
  const reviews = reviewsData?.data.data;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRoomType, setSelectedRoomType] =
    useState<GetRoomTypeByIdResType | null>(null);
  const [isLoadingNavigate, setIsLoadingNavigate] = useState(false);
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handleOpenRoomDetails = (room: GetRoomTypeByIdResType) => {
    setSelectedRoomType(room);
    setIsModalOpen(true);
  };

  const queryString = `start=${startDateParams}&end=${endDateParams}`;
  const results = useAvailableRoomsByRoomIds(roomIdList, queryString);

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
    if (wishlist) return handleDeleteWishlist();
    return handleCreateWishlist();
  };

  const now = startOfDay(new Date());
  const targetDate =
    startDateParams &&
    startOfDay(parse(startDateParams, 'dd-MM-yyyy', new Date()));

  const isFuture = targetDate && targetDate > now;

  const onBookNow = (
    roomTypeId: number,
    roomId: number,
    policy: PolicyType,
  ) => {
    if (!profile?.id) {
      toggleModal();
      return;
    }
    if (
      !startDateParams ||
      !endDateParams ||
      !availableParam ||
      !adultParam ||
      !id ||
      !roomTypeId ||
      !roomId
    ) {
      return;
    }
    if (
      policy === POLICY_TYPE.PAY_AT_HOTEL &&
      availableParam > MAX_ROOM_PAY_AT_HOTEL
    ) {
      showToast({
        type: 'error',
        message: ERROR_MESSAGES.POLICY_NOT_ALLOW_BOOKING,
      });
      return;
    }
    const booking = {
      roomTypeId,
      roomId,
      hotelId: Number(id),
      startDate: startDateParams,
      endDate: endDateParams,
      adult: adultParam,
      child: childParam,
      available: availableParam,
    };
    const versionData = {
      hotel: hotel?.updatedAt ?? null,
      roomType:
        hotel?.roomType?.find((roomType) => roomType.id === roomTypeId)
          ?.updatedAt ?? null,
      room:
        hotel?.roomType
          ?.find((roomType) => roomType.id === roomTypeId)
          ?.room.find((room) => room.id === roomId)?.updatedAt ?? null,
    };
    const code = saveBooking(booking);
    setVersionHotelLocalStorage(code, JSON.stringify(versionData));
    setIsLoadingNavigate(true);
    router.push(`${ROUTES.ORDER}?code=${code}`);
  };

  useEffect(() => {
    if (hotel && hotel.status !== HOTEL_STATUS.ACTIVE) {
      router.push(ROUTES.HOME);
    }
    if (startDateParams && endDateParams) {
      const startDate = parse(startDateParams, 'dd-MM-yyyy', new Date());
      const endDate = parse(endDateParams, 'dd-MM-yyyy', new Date());
      if (
        startOfDay(startDate) < startOfDay(new Date()) ||
        startOfDay(startDate) >= startOfDay(endDate)
      ) {
        router.push(ROUTES.HOME);
      }
    }
  }, [hotel, startDateParams, endDateParams]);

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
    onBookNow,
    isLoadingNavigate,
    dateRange,
    reviews,
  };
};
