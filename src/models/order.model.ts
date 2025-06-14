import { ORDER_STATUS, PAYMENT_TYPE } from '@/constants';
import { CustomerSchema } from '@/models/customer.model';
import { HotelSchema } from '@/models/hotel.model';
import { RoomTypeSchema } from '@/models/room-type.model';
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
      ORDER_STATUS.REFUNDED,
    ])
    .default(ORDER_STATUS.PENDING)
    .optional(),
  paymentType: z.enum([PAYMENT_TYPE.BANKING, PAYMENT_TYPE.PAY_AT_HOTEL]),
  arrivalTime: z.coerce.date().optional().nullable(),
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
    roomType: RoomTypeSchema,
  }),
});

export const GetOrdersByUserIdResSchema = z.array(OrderSchema);

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
  id: true,
  status: true,
}).strict();

export const UpdateOrderResSchema = OrderSchema;

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
