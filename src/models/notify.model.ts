import { NOTIFY_TYPE } from '@/constants';
import { z } from 'zod';

export const NotifySchema = z.object({
  id: z.number().int().positive(),
  recipientId: z.number().int().positive().nullable(),
  title: z.string().max(100).nonempty(),
  type: z.enum([NOTIFY_TYPE.INFORM, NOTIFY_TYPE.REFUND]),
  message: z.string().nonempty(),
  createdById: z.number().int().positive().nullable(),
  readAt: z.date().nullable(),
  createdAt: z.date().nullable(),
});

export type NotifyType = z.infer<typeof NotifySchema>;

export const GetNotifiesByRecipientIdResSchema = z.object({
  data: z.array(NotifySchema),
  totalItems: z.number(),
  page: z.number().optional(),
  limit: z.number().optional(),
  totalPages: z.number().optional(),
});

export const GetNotifiesByRecipientIdQuerySchema = z
  .object({
    limit: z.coerce.number().int().positive().default(8),
    page: z.coerce.number().int().positive().default(1),
  })
  .strict();

export const CreateNotifyBodySchema = NotifySchema.omit({
  id: true,
  createdAt: true,
  createdById: true,
  readAt: true,
}).strict();

export const CreateNotifyResSchema = NotifySchema;

export const CreateMultipleNotifyBodySchema = NotifySchema.omit({
  id: true,
  createdAt: true,
  createdById: true,
  readAt: true,
}).strict();

export const DeleteNotifyResSchema = NotifySchema;

export const UpdateNotifyReadAtResSchema = NotifySchema;

export type GetNotifiesByRecipientIdResType = z.infer<
  typeof GetNotifiesByRecipientIdResSchema
>;
export type GetNotifiesByRecipientIdQueryType = z.infer<
  typeof GetNotifiesByRecipientIdQuerySchema
>;

export type CreateNotifyBodyType = z.infer<typeof CreateNotifyBodySchema>;
export type CreateNotifyResType = z.infer<typeof CreateNotifyResSchema>;

export type CreateMultipleNotifyBodyType = z.infer<
  typeof CreateMultipleNotifyBodySchema
>;

export type DeleteNotifyResType = z.infer<typeof DeleteNotifyResSchema>;

export type UpdateNotifyReadAtResType = z.infer<
  typeof UpdateNotifyReadAtResSchema
>;
