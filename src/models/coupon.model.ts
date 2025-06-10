import { ERROR_COUPON_MESSAGES } from '@/constants';
import { z } from 'zod';

export const CouponSchema = z.object({
  id: z.number().int().positive(),
  title: z
    .string()
    .max(100, { message: ERROR_COUPON_MESSAGES.title.maxLength })
    .nonempty({ message: ERROR_COUPON_MESSAGES.title.required }),
  description: z
    .string()
    .max(255, { message: ERROR_COUPON_MESSAGES.description.maxLength })
    .nonempty({ message: ERROR_COUPON_MESSAGES.description.required }),
  code: z.string().max(50),
  amount: z
    .number({ message: ERROR_COUPON_MESSAGES.amount.required })
    .min(1, { message: ERROR_COUPON_MESSAGES.amount.min })
    .int({ message: ERROR_COUPON_MESSAGES.amount.invalidNumber }),
  percentage: z
    .number({ message: ERROR_COUPON_MESSAGES.percentage.required })
    .min(0, { message: ERROR_COUPON_MESSAGES.percentage.min })
    .max(15, { message: ERROR_COUPON_MESSAGES.percentage.max })
    .int({ message: ERROR_COUPON_MESSAGES.percentage.invalidNumber }),
  usedCount: z.number().int().default(0),
  createdById: z.number().int().positive(),
  createdAt: z.date().nullable(),
  updatedAt: z.date().nullable(),
});

export type CouponType = z.infer<typeof CouponSchema>;

export const GetCouponsResSchema = z.object({
  data: z.array(CouponSchema),
  totalItems: z.number(),
  page: z.number(),
  limit: z.number(),
  totalPages: z.number(),
});

export const GetCouponsQuerySchema = z
  .object({
    page: z.coerce.number().int().positive().default(1),
    limit: z.coerce.number().int().positive().default(8),
  })
  .strict();

export const GetCouponResSchema = CouponSchema;

export const CreateCouponBodySchema = CouponSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  code: true,
  createdById: true,
  usedCount: true,
}).strict();

export const UpdateCouponBodySchema = CouponSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  code: true,
  createdById: true,
  usedCount: true,
}).strict();

export const CreateCouponResSchema = CouponSchema;

export const UpdateCouponResSchema = CouponSchema;

export const DeleteCouponResSchema = CouponSchema;

export type GetCouponsQueryType = z.infer<typeof GetCouponsQuerySchema>;

export type GetCouponsResType = z.infer<typeof GetCouponsResSchema>;
export type GetCouponResType = z.infer<typeof GetCouponResSchema>;
export type CreateCouponBodyType = z.infer<typeof CreateCouponBodySchema>;
export type UpdateCouponBodyType = z.infer<typeof UpdateCouponBodySchema>;
export type CreateCouponResType = z.infer<typeof CreateCouponResSchema>;
export type UpdateCouponResType = z.infer<typeof UpdateCouponResSchema>;
export type DeleteCouponResType = z.infer<typeof DeleteCouponResSchema>;
