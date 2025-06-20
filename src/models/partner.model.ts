import { ERROR_AUTH_MESSAGES, ERROR_PARTNER_MESSAGES } from '@/constants';
import { HotelSchema } from '@/models/hotel.model';
import { z } from 'zod';

export const PartnerSchema = z.object({
  id: z.number().int().positive(),
  userId: z.number().int().positive(),
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
    .max(255, { message: ERROR_AUTH_MESSAGES.email.maxLength }),
  phoneNumber: z
    .string()
    .nonempty({ message: ERROR_AUTH_MESSAGES.phoneNumber.required })
    .min(9, { message: ERROR_AUTH_MESSAGES.phoneNumber.minLength })
    .max(20, { message: ERROR_AUTH_MESSAGES.phoneNumber.maxLength })
    .nullable(),
  idCard: z
    .string()
    .nonempty({ message: ERROR_PARTNER_MESSAGES.idCard.required })
    .max(50, { message: ERROR_PARTNER_MESSAGES.idCard.maxLength }),
  birth: z.coerce.date(),
  gender: z
    .string()
    .nonempty({ message: ERROR_PARTNER_MESSAGES.gender.required })
    .max(10),
  address: z
    .string()
    .nonempty({ message: ERROR_PARTNER_MESSAGES.address.required }),
  provinceCode: z.number({
    message: ERROR_PARTNER_MESSAGES.provinceCode.required,
  }),
  districtCode: z.number({
    message: ERROR_PARTNER_MESSAGES.districtCode.required,
  }),
  wardCode: z.number({ message: ERROR_PARTNER_MESSAGES.wardCode.required }),
  companyName: z
    .string()
    .max(255, { message: ERROR_PARTNER_MESSAGES.companyName.maxLength }),
  accountNumber: z
    .string()
    .nonempty({ message: ERROR_AUTH_MESSAGES.accountNumber.required })
    .max(100, { message: ERROR_AUTH_MESSAGES.accountNumber.maxLength }),
  bankAccount: z
    .string()
    .nonempty({ message: ERROR_AUTH_MESSAGES.bankAccount.required })
    .max(100, { message: ERROR_AUTH_MESSAGES.bankAccount.maxLength }),
  bankName: z
    .string()
    .trim()
    .nonempty({ message: ERROR_AUTH_MESSAGES.bankName.required })
    .regex(/^[A-Za-zÀ-ỹ\s]+$/, {
      message: ERROR_PARTNER_MESSAGES.bankName.invalidCharacters,
    })
    .max(255, { message: ERROR_AUTH_MESSAGES.bankName.maxLength }),
  commissionRate: z.number(),
  status: z.string(),
  createdById: z.number().nullable(),
  createdAt: z.date().nullable(),
  updatedAt: z.date().nullable(),
});

export const GetPartnerByUserIdResSchema = PartnerSchema.extend({
  hotel: HotelSchema,
});

export const GetPartnerByIdResSchema = GetPartnerByUserIdResSchema;

export const GetPartnersResSchema = z.object({
  data: z.array(PartnerSchema),
  totalItems: z.number(),
  page: z.number(),
  limit: z.number(),
  totalPages: z.number(),
});
export const GetPartnersQuerySchema = z
  .object({
    page: z.coerce.number().int().positive().default(1),
    limit: z.coerce.number().int().positive().default(10),
    search: z.string().optional(),
  })
  .strict();

export const CreatePartnerBodySchema = PartnerSchema.pick({
  fullName: true,
  email: true,
  phoneNumber: true,
  idCard: true,
  birth: true,
  gender: true,
  address: true,
  provinceCode: true,
  districtCode: true,
  wardCode: true,
  companyName: true,
  accountNumber: true,
  bankAccount: true,
  bankName: true,
})
  .extend({
    code: z
      .string()
      .nonempty({ message: ERROR_AUTH_MESSAGES.code.required })
      .length(6, { message: ERROR_AUTH_MESSAGES.code.length }),
  })
  .strict();
export const CreatePartnerResSchema = PartnerSchema;

export const UpdatePartnerBodySchema = CreatePartnerBodySchema;

export const UpdatePartnerResSchema = PartnerSchema;

export const UpdatePartnerStatusBodySchema = PartnerSchema.pick({
  status: true,
  userId: true,
});

export const UpdatePartnerStatusResSchema = PartnerSchema;

export type GetPartnerByUserIdResType = z.infer<
  typeof GetPartnerByUserIdResSchema
>;
export type GetPartnersResType = z.infer<typeof GetPartnersResSchema>;
export type GetPartnersQueryType = z.infer<typeof GetPartnersQuerySchema>;
export type CreatePartnerBodyType = z.infer<typeof CreatePartnerBodySchema>;
export type UpdatePartnerBodyType = z.infer<typeof UpdatePartnerBodySchema>;
export type CreatePartnerResType = z.infer<typeof CreatePartnerResSchema>;
export type UpdatePartnerResType = z.infer<typeof UpdatePartnerResSchema>;
export type PartnerType = z.infer<typeof PartnerSchema>;
export type GetPartnerByIdResType = z.infer<typeof GetPartnerByIdResSchema>;
export type UpdatePartnerStatusBodyType = z.infer<
  typeof UpdatePartnerStatusBodySchema
>;
export type UpdatePartnerStatusResType = z.infer<
  typeof UpdatePartnerStatusResSchema
>;
