import {
  ERROR_HOTEL_MESSAGES,
  ERROR_PARTNER_MESSAGES,
  HOTEL_STATUS,
  HOTEL_TYPE,
} from '@/constants';
import { z } from 'zod';
export const HotelSchema = z.object({
  id: z.number(),
  partnerId: z.number(),
  name: z
    .string()
    .max(255, { message: ERROR_HOTEL_MESSAGES.name.maxLength })
    .nonempty({ message: ERROR_HOTEL_MESSAGES.name.required }),
  hotelPhoneNumber: z
    .string()
    .max(20, { message: ERROR_HOTEL_MESSAGES.hotelPhoneNumber.maxLength })
    .nonempty({ message: ERROR_HOTEL_MESSAGES.hotelPhoneNumber.required }),
  type: z.enum(
    [
      HOTEL_TYPE.HOTEL,
      HOTEL_TYPE.HOSTEL,
      HOTEL_TYPE.APARTMENT,
      HOTEL_TYPE.GUESTHOUSE,
      HOTEL_TYPE.HOMESTAY,
      HOTEL_TYPE.VILLA,
      HOTEL_TYPE.RESORT,
    ],
    {
      message: ERROR_HOTEL_MESSAGES.type.required,
    },
  ),
  reputationScore: z.number().default(100),
  rating: z.number().default(0),
  vat: z
    .number({ message: ERROR_HOTEL_MESSAGES.vat.required })
    .min(0, { message: ERROR_HOTEL_MESSAGES.vat.min })
    .max(100, { message: ERROR_HOTEL_MESSAGES.vat.max }),
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
  description: z
    .string()
    .nonempty({ message: ERROR_HOTEL_MESSAGES.description.required }),
  images: z.array(z.string()),
  status: z
    .enum([HOTEL_STATUS.PENDING, HOTEL_STATUS.ACTIVE, HOTEL_STATUS.INACTIVE])
    .default(HOTEL_STATUS.PENDING),
  createdAt: z.date().nullable(),
  updatedAt: z.date().nullable(),
});

export type HotelType = z.infer<typeof HotelSchema>;

export const GetHotelsResSchema = z.object({
  data: z.array(HotelSchema),
  totalItems: z.number(),
  page: z.number(),
  limit: z.number(),
  totalPages: z.number(),
});

export const GetHotelResSchema = HotelSchema;

export const GetHotelsQuerySchema = z
  .object({
    page: z.coerce.number().int().positive().default(1),
    limit: z.coerce.number().int().positive().default(10),
    search: z.string().optional(),
    order: z.enum(['asc', 'desc']).optional().default('desc'),
    orderBy: z.string().optional().default('createdAt'),
    status: z.string().optional(),
  })
  .strict();

export const CreateHotelBodySchema = HotelSchema.omit({
  id: true,
  reputationScore: true,
  rating: true,
  createdAt: true,
  updatedAt: true,
  status: true,
})
  .strict()
  .superRefine(({ vat }, ctx) => {
    if (vat < 0 || vat > 100) {
      ctx.addIssue({
        code: 'custom',
        message: 'VAT must be between 0 and 100',
        path: ['vat'],
      });
    }
  });

export const CreateHotelResSchema = GetHotelResSchema;

export const UpdateHotelBodySchema = HotelSchema.omit({
  id: true,
  partnerId: true,
  createdAt: true,
  updatedAt: true,
})
  .strict()
  .superRefine(({ vat }, ctx) => {
    if (vat < 0 || vat > 100) {
      ctx.addIssue({
        code: 'custom',
        message: 'VAT must be between 0 and 100',
        path: ['vat'],
      });
    }
  });
export const UpdateHotelResSchema = HotelSchema;

export const HotelAmenitySchema = z.object({
  id: z.number(),
  hotelId: z.number(),
  amenityId: z.number(),
});

export const GetHotelAmenitiesResSchema = z.array(HotelAmenitySchema);

export const UpdateHotelAmenitiesBodySchema = HotelAmenitySchema.omit({
  id: true,
  amenityId: true,
})
  .extend({
    amenities: z.array(z.number()),
  })
  .strict();

export const UpdateHotelAmenitiesResSchema = GetHotelAmenitiesResSchema;

export type GetHotelsQueryType = z.infer<typeof GetHotelsQuerySchema>;
export type GetHotelsResType = z.infer<typeof GetHotelsResSchema>;
export type CreateHotelBodyType = z.infer<typeof CreateHotelBodySchema>;
export type CreateHotelResType = z.infer<typeof CreateHotelResSchema>;
export type GetHotelResType = z.infer<typeof GetHotelResSchema>;
export type UpdateHotelBodyType = z.infer<typeof UpdateHotelBodySchema>;
export type UpdateHotelResType = z.infer<typeof UpdateHotelResSchema>;
export type HotelAmenityType = z.infer<typeof HotelAmenitySchema>;
export type GetHotelAmenitiesResType = z.infer<
  typeof GetHotelAmenitiesResSchema
>;
export type UpdateHotelAmenitiesBodyType = z.infer<
  typeof UpdateHotelAmenitiesBodySchema
>;
export type UpdateHotelAmenitiesResType = z.infer<
  typeof UpdateHotelAmenitiesResSchema
>;
