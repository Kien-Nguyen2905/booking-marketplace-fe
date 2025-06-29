import { ERROR_PROMOTION_MESSAGES } from '@/constants';
import { NotifySchema } from '@/models/notify.model';
import { endOfDay } from 'date-fns';
import { z } from 'zod';

export const PromotionSchema = z.object({
  id: z.number().int().positive(),
  title: z
    .string()
    .max(100, { message: ERROR_PROMOTION_MESSAGES.title.maxLength })
    .nonempty({ message: ERROR_PROMOTION_MESSAGES.title.required }),
  percentage: z
    .number({ message: ERROR_PROMOTION_MESSAGES.percentage.required })
    .min(1, { message: ERROR_PROMOTION_MESSAGES.percentage.min })
    .max(100, { message: ERROR_PROMOTION_MESSAGES.percentage.max }),
  sharePercentage: z
    .number({ message: ERROR_PROMOTION_MESSAGES.sharePercentage.required })
    .min(0, { message: ERROR_PROMOTION_MESSAGES.sharePercentage.min })
    .max(100, { message: ERROR_PROMOTION_MESSAGES.sharePercentage.max }),
  validFrom: z.coerce
    .date({
      message: ERROR_PROMOTION_MESSAGES.validFrom.required,
    })
    .min(endOfDay(new Date()), {
      message: ERROR_PROMOTION_MESSAGES.validFrom.min,
    }),
  validUntil: z.coerce.date({
    message: ERROR_PROMOTION_MESSAGES.validUntil.required,
  }),
  createdById: z.number().int().positive(),
  deletedAt: z.date().nullable(),
  notifiedAt: z.date().nullable(),
  createdAt: z.coerce.date().nullable(),
  updatedAt: z.date().nullable(),
});

export type PromotionType = z.infer<typeof PromotionSchema>;

export const GetPromotionResSchema = PromotionSchema;

export const GetPromotionByValidFromResSchema = z.object({
  promotions: z.array(PromotionSchema),
  todayPromotions: PromotionSchema,
});

export const GetPromotionsQuerySchema = z
  .object({
    page: z.coerce.number().int().positive().default(1),
    limit: z.coerce.number().int().positive().default(8),
    dateFrom: z.coerce.date().optional(),
    dateTo: z.coerce.date().optional(),
    order: z.enum(['asc', 'desc']).optional().default('desc'),
    orderBy: z.string().optional(),
  })
  .strict();

export const GetPromotionsResSchema = z.object({
  data: z.array(PromotionSchema),
  totalItems: z.number(),
  page: z.number(),
  limit: z.number(),
  totalPages: z.number(),
});

export const CreatePromotionBodySchema = PromotionSchema.omit({
  id: true,
  createdById: true,
  deletedAt: true,
  notifiedAt: true,
  createdAt: true,
  updatedAt: true,
}).strict();

export const CreatePromotionResSchema = PromotionSchema;

export const UpdatePromotionBodySchema = CreatePromotionBodySchema;

export const UpdatePromotionResSchema = PromotionSchema;

export const DeletePromotionResSchema = PromotionSchema;

export const CreateNotifyPromotionBodySchema = NotifySchema.omit({
  id: true,
  createdAt: true,
  createdById: true,
  readAt: true,
})
  .extend({
    promotionId: z.number(),
  })
  .strict();

export const CreateNotifyPromotionResSchema = NotifySchema;

export type GetPromotionResType = z.infer<typeof GetPromotionResSchema>;

export type GetPromotionByValidFromResType = z.infer<
  typeof GetPromotionByValidFromResSchema
>;

export type GetPromotionsResType = z.infer<typeof GetPromotionsResSchema>;

export type GetPromotionsQueryType = z.infer<typeof GetPromotionsQuerySchema>;

export type CreatePromotionBodyType = z.infer<typeof CreatePromotionBodySchema>;
export type CreatePromotionResType = z.infer<typeof CreatePromotionResSchema>;

export type UpdatePromotionBodyType = z.infer<typeof UpdatePromotionBodySchema>;
export type UpdatePromotionResType = z.infer<typeof UpdatePromotionResSchema>;

export type DeletePromotionResType = z.infer<typeof DeletePromotionResSchema>;

export type CreateNotifyPromotionBodyType = z.infer<
  typeof CreateNotifyPromotionBodySchema
>;
export type CreateNotifyPromotionResType = z.infer<
  typeof CreateNotifyPromotionResSchema
>;
