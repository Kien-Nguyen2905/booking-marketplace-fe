import { REFUND_STATUS } from '@/constants';
import { UserSchema } from '@/models/auth.model';
import { OrderSchema } from '@/models/order.model';
import { z } from 'zod';

export const RefundSchema = z.object({
  id: z.number().int().positive(),
  orderId: z.number().int().positive(),
  amount: z.number().int().positive(),
  reason: z.string().max(255),
  status: z
    .enum([REFUND_STATUS.PENDING, REFUND_STATUS.COMPLETED])
    .default(REFUND_STATUS.PENDING),
  createdById: z.number().int().positive(),
  createdAt: z.date().nullable(),
  updatedAt: z.date().nullable(),
});

export type RefundType = z.infer<typeof RefundSchema>;

export const GetRefundsResSchema = z.object({
  data: z.array(RefundSchema),
  totalItems: z.number(),
  page: z.number(),
  limit: z.number(),
  totalPages: z.number(),
});

export const GetRefundResSchema = RefundSchema.extend({
  order: OrderSchema.extend({
    user: UserSchema,
  }),
});

export const CreateRefundBodySchema = RefundSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  status: true,
  createdById: true,
}).strict();

export const CreateRefundResSchema = RefundSchema;

export type GetRefundsResType = z.infer<typeof GetRefundsResSchema>;
export type GetRefundResType = z.infer<typeof GetRefundResSchema>;
export type CreateRefundBodyType = z.infer<typeof CreateRefundBodySchema>;
export type CreateRefundResType = z.infer<typeof CreateRefundResSchema>;
