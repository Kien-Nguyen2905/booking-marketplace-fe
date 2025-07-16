import {
  ERROR_MESSAGES,
  ROUTES,
  SUCCESS_MESSAGES,
  PAYMENT_TYPE,
  POLICY_TYPE,
  PERCENTAGE,
  MINIMUM_AMOUNT,
} from '@/constants';
import {
  calculateTotalPromotionDiscount,
  clearBooking,
  getBooking,
  getVersionHotelLocalStorage,
} from '@/lib/utils';
import {
  useGetAvailableRoomsByRoomIdQuery,
  useGetHotelByIdQuery,
  useGetPromotionsByValidFromQuery,
  useValidateCouponByCodeMutation,
} from '@/queries';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  CreateCustomerBodySchema,
  CreateCustomerBodyType,
} from '@/models/customer.model';
import { differenceInDays, parse } from 'date-fns';
import { useEffect, useState, useRef } from 'react';
import { addDays, set } from 'date-fns';
import { showToast } from '@/lib/toast';
import { useAppContext } from '@/context/AppProvider';
import { handleErrorApi } from '@/lib/helper';
import { CouponType } from '@/models/coupon.model';
import { useSearchParams } from 'next/navigation';
import { TBooking } from '@/types/booking.type';
import {
  calculateBaseAmount,
  calculateCouponDiscount,
  calculateServiceFee,
  calculateVAT,
} from '@/lib/utils';
import { useCreateOrderMutation } from '@/queries/useOrder';
import { CreateOrderBodyType } from '@/models';
export const useOrderPage = () => {
  const { profile } = useAppContext();
  const searchParams = useSearchParams();
  const availablePoint = profile?.earnPoint || 0;
  const router = useRouter();
  const [booking, setBooking] = useState<TBooking | null>(null);
  const [estimatedCheckInTime, setEstimatedCheckInTime] = useState<Date | null>(
    null,
  );
  const { mutateAsync: createOrder } = useCreateOrderMutation();
  const [isCreatingOrder, setIsCreatingOrder] = useState(false);
  const { data: hotelDetailData } = useGetHotelByIdQuery(booking?.hotelId || 0);
  const hotel = hotelDetailData?.data.data;
  const roomType = hotel?.roomType.find(
    (roomType) => roomType.id === booking?.roomTypeId,
  );
  const room = roomType?.room.find((room) => room.id === booking?.roomId);

  const [versionHotel, setVersionHotel] = useState<any>(null);

  const queryStringPromotion =
    booking?.startDate && booking?.endDate
      ? `validFrom=${booking?.startDate}&validUntil=${booking?.endDate}`
      : '';
  const { data: promotionsData } =
    useGetPromotionsByValidFromQuery(queryStringPromotion);

  const promotionToday = promotionsData?.data.data.todayPromotions;
  const promotionNotToday = promotionsData?.data.data.promotions[0];
  const promotion = promotionToday || promotionNotToday;
  const checkIn =
    (booking?.startDate &&
      parse(booking.startDate, 'dd-MM-yyyy', new Date())) ||
    new Date();
  const checkOut =
    (booking?.endDate && parse(booking.endDate, 'dd-MM-yyyy', new Date())) ||
    new Date();

  const nights = checkIn && checkOut ? differenceInDays(checkOut, checkIn) : 0;

  const queryStringAvailable =
    booking?.startDate && booking?.endDate
      ? `start=${booking?.startDate}&end=${booking?.endDate}`
      : '';
  const { data: availableRoomData } = useGetAvailableRoomsByRoomIdQuery(
    booking?.roomId || 0,
    queryStringAvailable,
  );

  const form = useForm<CreateCustomerBodyType>({
    resolver: zodResolver(CreateCustomerBodySchema),
    defaultValues: {
      fullName: '',
      phoneNumber: '',
      email: '',
    },
  });

  const [coupon, setCoupon] = useState<CouponType | null>(null);

  const { mutateAsync: validateCoupon, isPending: isValidateCoupon } =
    useValidateCouponByCodeMutation();

  const formCoupon = useForm<{ code: string }>({
    defaultValues: {
      code: '',
    },
  });

  const formPoint = useForm<{ point: number }>({
    defaultValues: {
      point: 0,
    },
  });

  const [point, setPoint] = useState<number>(0);

  const baseAmount = calculateBaseAmount(
    room?.price || 0,
    booking?.available || 0,
    nights,
  );

  const pointDiscountAmount = (point || 0) * 1000;

  const serviceFeeAmount = calculateServiceFee(
    baseAmount,
    roomType?.serviceFeeRate || 0,
  );

  const vatAmount = calculateVAT(baseAmount, hotel?.vat || 0);

  const subtotalAmount = baseAmount + serviceFeeAmount + vatAmount;

  const couponDiscountAmount = coupon
    ? calculateCouponDiscount(coupon, subtotalAmount)
    : 0;

  const totalPromotionDiscount =
    calculateTotalPromotionDiscount(
      checkIn,
      checkOut,
      promotion,
      room,
      booking,
      nights,
    ) || 0;

  const subtotalAfterPromotionAmount = subtotalAmount - totalPromotionDiscount;

  const platformBaseProfitAmount =
    subtotalAfterPromotionAmount * PERCENTAGE.COMMISSION;
  const promotionShareAmount =
    (promotion?.sharePercentage || 0) * totalPromotionDiscount || 0;

  const platformProfit = Math.round(
    platformBaseProfitAmount -
      promotionShareAmount -
      couponDiscountAmount -
      pointDiscountAmount,
  );

  const partnerBaseProfitAmount =
    PERCENTAGE.PARTNER * subtotalAfterPromotionAmount;

  const partnerProfit = Math.round(
    partnerBaseProfitAmount + promotionShareAmount,
  );

  const calculateTotalAmount =
    subtotalAfterPromotionAmount - (couponDiscountAmount + pointDiscountAmount);
  const totalAmount =
    calculateTotalAmount < MINIMUM_AMOUNT ? 0 : calculateTotalAmount;

  const handleApplyCoupon = async (values: { code: string }) => {
    try {
      if (values.code.trim() === '' || values.code.trim().length !== 6) {
        showToast({
          type: 'warning',
          message: ERROR_MESSAGES.COUPON_NOT_FOUND,
        });
        return;
      }
      const { data } = await validateCoupon(values.code);
      if (data.data) {
        setCoupon(data.data);
      } else {
        showToast({
          type: 'warning',
          message: ERROR_MESSAGES.COUPON_NOT_FOUND,
        });
      }
    } catch (error) {
      handleErrorApi({ error });
    }
  };

  const handleApplyPoint = (values: { point: number }) => {
    if (values.point > availablePoint) {
      showToast({
        type: 'warning',
        message: ERROR_MESSAGES.POINT_NOT_ENOUGH,
      });
      return;
    }
    setPoint(values.point);
  };

  const handleCreateOrder = async (values: CreateCustomerBodyType) => {
    if (!booking || !profile || !room) return;
    setIsCreatingOrder(true);
    if (totalAmount - (platformProfit + partnerProfit) > 20) {
      showToast({
        type: 'error',
        message: ERROR_MESSAGES.SOMETHING_WRONG,
      });
      return;
    }
    try {
      const order: CreateOrderBodyType = {
        ...values,
        userId: profile.id,
        fullName: values.fullName,
        phoneNumber: values.phoneNumber,
        email: values.email,
        hotelId: booking.hotelId,
        roomId: booking.roomId,
        quantity: booking.available,
        checkinDate: checkIn,
        checkoutDate: checkOut,
        arrivalTime: estimatedCheckInTime,
        basePrice: room.price,
        pointDiscount: point * 1000,
        couponId: coupon?.id,
        couponAmount: couponDiscountAmount,
        promotionId: promotion?.id,
        promotionAmount: totalPromotionDiscount,
        vatAmount: vatAmount,
        serviceFeeAmount: serviceFeeAmount,
        totalPrice: totalAmount,
        platformProfit,
        partnerProfit,
        paymentType:
          room.policy === POLICY_TYPE.PAY_AT_HOTEL
            ? PAYMENT_TYPE.PAY_AT_HOTEL
            : PAYMENT_TYPE.BANKING,
        version: {
          ...versionHotel,
          coupon: coupon?.updatedAt,
          promotion: promotion?.updatedAt,
        },
      };
      const { data } = await createOrder(order);
      if (data.data.id) {
        if (
          totalAmount === 0 ||
          data.data.paymentType === PAYMENT_TYPE.PAY_AT_HOTEL
        ) {
          showToast({
            type: 'success',
            message: SUCCESS_MESSAGES.CREATED,
          });
          router.push(ROUTES.HOME);
        } else {
          router.push(`${ROUTES.PAYMENT}?id=${data.data.id}`);
        }
        clearBooking(searchParams.get('code') || '');
      }
    } catch (error) {
      handleErrorApi({ error, setError: form.setError });
      setIsCreatingOrder(false);
    }
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const timer = setTimeout(() => {
      const code = searchParams.get('code');
      if (!code) {
        router.push(ROUTES.HOME);
        return;
      }
      const booking = getBooking(code);
      const version = getVersionHotelLocalStorage(code);

      if (booking && version) {
        setBooking(booking);
        setVersionHotel(version);
      } else {
        router.push(ROUTES.HOME);
      }
    }, 200);
    return () => clearTimeout(timer);
  }, [searchParams, router]);

  useEffect(() => {
    if (!booking || !availableRoomData?.data.data) return;

    const timer = setTimeout(() => {
      if (
        availableRoomData.data.data?.availableRooms < (booking.available || 0)
      ) {
        router.push(ROUTES.HOME);
        showToast({
          type: 'info',
          message: ERROR_MESSAGES.ROOM_NOT_AVAILABLE,
        });
      }
    }, 200);
    return () => clearTimeout(timer);
  }, [availableRoomData, booking, router]);

  useEffect(() => {
    if (!booking || booking.hotelId === 0) return;

    if (hotelDetailData !== undefined && !hotelDetailData?.data.data) {
      const timer = setTimeout(() => {
        router.push(ROUTES.HOME);
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [hotelDetailData, booking, router]);

  // Store a ref to track if the real checkIn from booking has been processed
  const checkInProcessedRef = useRef(false);

  useEffect(() => {
    const needsInitialSetup = !estimatedCheckInTime;
    const needsUpdate = booking?.startDate && !checkInProcessedRef.current;

    if (checkIn && (needsInitialSetup || needsUpdate)) {
      const defaultCheckInTime = set(new Date(checkIn), {
        hours: 14,
        minutes: 0,
        seconds: 0,
      });
      setEstimatedCheckInTime(defaultCheckInTime);

      if (booking?.startDate) {
        checkInProcessedRef.current = true;
      }
    }
  }, [checkIn, booking?.startDate, estimatedCheckInTime]);
  const handleEstimatedCheckInTimeChange = (time: Date | null) => {
    setEstimatedCheckInTime(time);
  };

  const minimumCheckInTime = checkIn
    ? set(new Date(checkIn), { hours: 12, minutes: 0, seconds: 0 })
    : null;
  const maximumCheckInTime = checkIn
    ? set(addDays(new Date(checkIn), 1), { hours: 12, minutes: 0, seconds: 0 })
    : null;

  // const simulateTwoOrders = async (values: CreateCustomerBodyType) => {
  //   try {
  //     // Gọi handleCreateOrder hai lần với cùng values
  //     const results = await Promise.all([
  //       handleCreateOrder(values), // Đơn hàng 1
  //       handleCreateOrder(values), // Đơn hàng 2
  //     ]);
  //     showToast({
  //       type: 'success',
  //       message: 'Both orders processed. Check results for details.',
  //     });
  //   } catch (error) {
  //     showToast({
  //       type: 'error',
  //       message: 'Simultaneous order failed',
  //     });
  //     return null;
  //   }
  // };

  return {
    booking,
    hotel,
    roomType,
    room,
    form,
    promotion,
    checkIn,
    checkOut,
    nights,
    availablePoint,
    coupon,
    formCoupon,
    handleApplyCoupon,
    formPoint,
    handleApplyPoint,
    point,
    handleCreateOrder,
    baseAmount,
    couponDiscountAmount,
    pointDiscountAmount,
    serviceFeeAmount,
    vatAmount,
    subtotalAmount,
    totalAmount,
    totalPromotionDiscount,
    estimatedCheckInTime,
    handleEstimatedCheckInTimeChange,
    minimumCheckInTime,
    maximumCheckInTime,
    isCreatingOrder,
    isValidateCoupon,
  };
};
