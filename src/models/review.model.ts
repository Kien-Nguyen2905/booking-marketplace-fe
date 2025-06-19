import { UserSchema } from '@/models/auth.model';
import { ERROR_REVIEW_MESSAGES } from './../constants/error';
import { z } from 'zod';

export const ReviewSchema = z.object({
  id: z.number().int().positive(),
  orderId: z.number().int().positive(),
  hotelId: z.number().int().positive(),
  userId: z.number().int().positive(),
  title: z
    .string()
    .max(100, { message: ERROR_REVIEW_MESSAGES.title.maxLength })
    .nonempty({ message: ERROR_REVIEW_MESSAGES.title.required }),
  content: z
    .string()
    .max(255, { message: ERROR_REVIEW_MESSAGES.content.maxLength })
    .nonempty({ message: ERROR_REVIEW_MESSAGES.content.required }),
  rating: z
    .number()
    .int()
    .min(1, { message: ERROR_REVIEW_MESSAGES.rating.min })
    .max(5, { message: ERROR_REVIEW_MESSAGES.rating.max }),
  createdAt: z.date().nullable(),
  updatedAt: z.date().nullable(),
});

export type ReviewType = z.infer<typeof ReviewSchema>;

export const GetReviewsResSchema = z.object({
  data: z.array(
    ReviewSchema.extend({
      user: UserSchema,
    }),
  ),
  totalItems: z.number(),
  page: z.number(),
  limit: z.number(),
  totalPages: z.number(),
});

export const GetReviewResSchema = ReviewSchema;

export const CreateReviewBodySchema = ReviewSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  userId: true,
}).strict();

export const CreateReviewResSchema = ReviewSchema;

export type GetReviewsResType = z.infer<typeof GetReviewsResSchema>;
export type GetReviewResType = z.infer<typeof GetReviewResSchema>;
export type CreateReviewBodyType = z.infer<typeof CreateReviewBodySchema>;
export type CreateReviewResType = z.infer<typeof CreateReviewResSchema>;
