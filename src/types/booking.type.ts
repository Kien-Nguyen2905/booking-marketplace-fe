export type TBooking = {
  roomTypeId: number;
  roomId: number;
  hotelId: number;
  startDate: string;
  endDate: string;
  adult: number;
  child: number;
  available: number;
};

export type TBookingInput = {
  basePrice: number; // Base Price (P)
  numberOfNights: number; // Số đêm (N)
  promotionNights: number; // Số đêm áp dụng promotion (K)
  promotionPercentage: number; // Tỷ lệ giảm promotion (Pr)
  promotionSharePercentage: number; // Tỷ lệ trợ giá của sàn (Sp)
  serviceFeeRate: number; // Tỷ lệ phí dịch vụ (S_rate)
  vatRate: number; // Tỷ lệ VAT (V_rate)
  couponPercentage: number; // Tỷ lệ coupon (C)
  pointsDiscount: number; // Giảm giá từ điểm (D_points)
};

export type TProfitResult = {
  platformProfit: number; // Lợi nhuận thực tế của sàn
  partnerProfit: number; // Lợi nhuận của đối tác
  finalAmount: number; // Tổng tiền khách trả
  subtotalAfterPromotion: number; // Subtotal sau promotion
  promotionDiscount: number; // Giảm giá từ promotion (D_p)
  couponDiscount: number; // Giảm giá từ coupon (D_c)
  pointsDiscount: number; // Giảm giá từ điểm (D_points)
};
