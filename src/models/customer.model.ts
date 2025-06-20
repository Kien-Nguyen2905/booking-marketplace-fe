import { ERROR_AUTH_MESSAGES } from '@/constants';
import { z } from 'zod';

export const CustomerSchema = z.object({
  id: z.number().int().positive(),
  fullName: z
    .string({ required_error: ERROR_AUTH_MESSAGES.fullName.required })
    .nonempty({ message: ERROR_AUTH_MESSAGES.fullName.required })
    .trim()
    .max(255, { message: ERROR_AUTH_MESSAGES.fullName.maxLength })
    .regex(/^[A-Za-zÀ-ỹ\s]+$/, {
      message: ERROR_AUTH_MESSAGES.fullName.invalidCharacters,
    }),
  email: z
    .string({ required_error: ERROR_AUTH_MESSAGES.email.required })
    .nonempty({ message: ERROR_AUTH_MESSAGES.email.required })
    .email({ message: ERROR_AUTH_MESSAGES.email.invalid })
    .max(100, { message: ERROR_AUTH_MESSAGES.email.maxLength }),
  phoneNumber: z
    .string()
    .nonempty({ message: ERROR_AUTH_MESSAGES.phoneNumber.required })
    .min(9, { message: ERROR_AUTH_MESSAGES.phoneNumber.minLength })
    .max(20, { message: ERROR_AUTH_MESSAGES.phoneNumber.maxLength }),
  createdAt: z.date().nullable(),
});

export type CustomerType = z.infer<typeof CustomerSchema>;

export const GetCustomersQuerySchema = z
  .object({
    page: z.coerce.number().int().positive().default(1),
    limit: z.coerce.number().int().positive().default(8),
    search: z.string().optional(),
  })
  .strict();

export const GetCustomersResSchema = z.object({
  data: z.array(CustomerSchema),
  totalItems: z.number(),
  page: z.number(),
  limit: z.number(),
  totalPages: z.number(),
});

export const GetCustomerResSchema = CustomerSchema;

export const CreateCustomerBodySchema = CustomerSchema.omit({
  id: true,
  createdAt: true,
}).strict();

export const CreateCustomerResSchema = CustomerSchema;

export type GetCustomersQueryType = z.infer<typeof GetCustomersQuerySchema>;
export type GetCustomersResType = z.infer<typeof GetCustomersResSchema>;

export type GetCustomerResType = z.infer<typeof GetCustomerResSchema>;

export type CreateCustomerBodyType = z.infer<typeof CreateCustomerBodySchema>;
export type CreateCustomerResType = z.infer<typeof CreateCustomerResSchema>;
