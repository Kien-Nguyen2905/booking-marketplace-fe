import { ORDER_STATUS, PAYMENT_TYPE } from '@/constants';
import { UserSchema } from '@/models/auth.model';
import { CustomerSchema } from '@/models/customer.model';
import { HotelSchema } from '@/models/hotel.model';
import { ReviewSchema } from '@/models/review.model';
import { RoleSchema } from '@/models/role.model';
import { RoomBedSchema, RoomTypeSchema } from '@/models/room-type.model';
import { RoomSchema } from '@/models/room.model';
import { z } from 'zod';

export const OrderSchema = z.object({
  id: z.number().int().positive(),
  userId: z.number().int().positive(),
  customerId: z.number().int().positive(),
  hotelId: z.number().int().positive(),
  roomId: z.number().int().positive(),
  quantity: z.number().int().positive(),
  checkinDate: z.coerce.date(),
  checkoutDate: z.coerce.date(),
  basePrice: z.number().positive(),
  pointDiscount: z.number().nonnegative().default(0),
  couponId: z.number().int().positive().optional().nullable(),
  couponAmount: z.number().nonnegative().default(0),
  promotionId: z.number().int().positive().optional().nullable(),
  promotionAmount: z.number().nonnegative().default(0),
  vatAmount: z.number().positive(),
  serviceFeeAmount: z.number().positive(),
  totalPrice: z.number().positive(),
  commissionAmount: z.number().positive(),
  status: z
    .enum([
      ORDER_STATUS.PENDING,
      ORDER_STATUS.CONFIRMED,
      ORDER_STATUS.FAILED,
      ORDER_STATUS.CANCELED,
      ORDER_STATUS.PENDING_REFUND,
      ORDER_STATUS.REFUNDED,
      ORDER_STATUS.CHECKOUT,
      ORDER_STATUS.NO_SHOW,
    ])
    .default(ORDER_STATUS.PENDING)
    .optional(),
  paymentType: z.enum([PAYMENT_TYPE.BANKING, PAYMENT_TYPE.PAY_AT_HOTEL]),
  arrivalTime: z.coerce.date().optional().nullable(),
  reason: z.string().max(255).optional().nullable(),
  checkoutTime: z.coerce.date().optional().nullable(),
  createdAt: z.date().nullable(),
  updatedAt: z.date().nullable(),
});

export type OrderType = z.infer<typeof OrderSchema>;

export const GetOrdersQuerySchema = z
  .object({
    page: z.coerce.number().int().positive().default(1),
    limit: z.coerce.number().int().positive().default(8),
    search: z.string().optional(),
    order: z.enum(['asc', 'desc']).optional().default('desc'),
    dateFrom: z.coerce.date().optional(),
    dateTo: z.coerce.date().optional(),
    orderBy: z.string().optional(),
    status: z.string().optional(),
    paymentType: z.string().optional(),
  })
  .strict();

export const GetOrdersResSchema = z.object({
  data: z.array(OrderSchema),
  totalItems: z.number(),
  page: z.number(),
  limit: z.number(),
  totalPages: z.number(),
});

export const GetOrderResSchema = OrderSchema;

export const GetOrderByIdResSchema = OrderSchema.extend({
  customer: CustomerSchema,
  hotel: HotelSchema,
  room: RoomSchema.extend({
    roomType: RoomTypeSchema.extend({
      roomBed: z.array(RoomBedSchema),
    }),
  }),
  user: UserSchema.extend({
    role: RoleSchema,
  }),
});

export const GetOrdersByUserIdResSchema = z.object({
  data: z.array(
    OrderSchema.extend({
      review: ReviewSchema,
    }),
  ),
  totalItems: z.number(),
  page: z.number(),
  limit: z.number(),
  totalPages: z.number(),
});

export const CreateOrderBodySchema = OrderSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  customerId: true,
  checkoutTime: true,
  status: true,
})
  .extend({
    fullName: z.string().max(100),
    phoneNumber: z.string().max(20),
    email: z.string().email(),
  })
  .strict()
  .superRefine(({ checkinDate, checkoutDate }, ctx) => {
    if (checkinDate > checkoutDate) {
      ctx.addIssue({
        code: 'custom',
        message: 'Checkout date must be greater than check-in date',
        path: ['checkoutDate'],
      });
    }
  });

export const CreateOrderResSchema = OrderSchema;

export const UpdateOrderBodySchema = OrderSchema.pick({
  status: true,
  reason: true,
})
  .strict()
  .superRefine(({ status, reason }, ctx) => {
    if (status === ORDER_STATUS.CANCELED && !reason) {
      ctx.addIssue({
        code: 'custom',
        message: 'Reason is required',
        path: ['reason'],
      });
    }
    if (status === ORDER_STATUS.PENDING_REFUND && !reason) {
      ctx.addIssue({
        code: 'custom',
        message: 'Reason is required',
        path: ['reason'],
      });
    }
  });
export const UpdateOrderResSchema = OrderSchema;

export const ExportPartnerRevenueResSchema = z.array(
  z.object({
    startDate: z.string(),
    endDate: z.string(),
    partnerName: z.string(),
    hotelName: z.string(),
    accountNumber: z.string(),
    bankName: z.string(),
    bankAccount: z.string(),
    countOrder: z.number(),
    totalOrderValue: z.number(),
    totalPrice: z.number(),
    hotelPayment: z.number(),
    commissionAmount: z.number(),
    transferAmount: z.number(),
  }),
);

export const FindOrdersExceedQuantitySchema = z.object({
  roomId: z.number(),
  quantity: z.number(),
});

export const FindOrdersExceedQuantityResSchema = z.array(OrderSchema);

export type GetOrdersQueryType = z.infer<typeof GetOrdersQuerySchema>;
export type GetOrdersResType = z.infer<typeof GetOrdersResSchema>;

export type GetOrderResType = z.infer<typeof GetOrderResSchema>;
export type GetOrderByIdResType = z.infer<typeof GetOrderByIdResSchema>;

export type GetOrdersByUserIdResType = z.infer<
  typeof GetOrdersByUserIdResSchema
>;

export type CreateOrderBodyType = z.infer<typeof CreateOrderBodySchema>;
export type CreateOrderResType = z.infer<typeof CreateOrderResSchema>;

export type UpdateOrderBodyType = z.infer<typeof UpdateOrderBodySchema>;
export type UpdateOrderResType = z.infer<typeof UpdateOrderResSchema>;

export type ExportPartnerRevenueResType = z.infer<
  typeof ExportPartnerRevenueResSchema
>;

export type FindOrdersExceedQuantityType = z.infer<
  typeof FindOrdersExceedQuantitySchema
>;
export type FindOrdersExceedQuantityResType = z.infer<
  typeof FindOrdersExceedQuantityResSchema
>;
