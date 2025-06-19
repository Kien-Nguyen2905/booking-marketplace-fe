import {
  ERROR_HOTEL_MESSAGES,
  ERROR_PARTNER_MESSAGES,
  HOTEL_STATUS,
  HOTEL_TYPE,
} from '@/constants';
import { AmenitySchema } from '@/models/amenity.model';
import { RoomBedSchema, RoomTypeSchema } from '@/models/room-type.model';
import { RoomSchema } from '@/models/room.model';
import { z } from 'zod';
export const HotelSchema = z.object({
  id: z.number().int().positive(),
  partnerId: z.number().int().positive(),
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
      HOTEL_TYPE.HOME_STAY,
      HOTEL_TYPE.VILLA,
      HOTEL_TYPE.RESORT,
    ],
    {
      message: ERROR_HOTEL_MESSAGES.type.required,
    },
  ),
  reputationScore: z.number().int().default(100),
  rating: z.number().default(0),
  vat: z
    .number({ message: ERROR_HOTEL_MESSAGES.vat.required })
    .min(0, { message: ERROR_HOTEL_MESSAGES.vat.min })
    .max(100, { message: ERROR_HOTEL_MESSAGES.vat.max }),
  address: z
    .string()
    .nonempty({ message: ERROR_PARTNER_MESSAGES.address.required }),
  provinceCode: z
    .number({
      message: ERROR_PARTNER_MESSAGES.provinceCode.required,
    })
    .int({ message: ERROR_PARTNER_MESSAGES.provinceCode.invalidNumber }),
  districtCode: z
    .number({
      message: ERROR_PARTNER_MESSAGES.districtCode.required,
    })
    .int({ message: ERROR_PARTNER_MESSAGES.districtCode.invalidNumber }),
  wardCode: z
    .number({ message: ERROR_PARTNER_MESSAGES.wardCode.required })
    .int({ message: ERROR_PARTNER_MESSAGES.wardCode.invalidNumber }),
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

export const GetHotelResSchema = HotelSchema.extend({
  hotelAmenity: z.array(z.object({ amenity: AmenitySchema })),
  roomType: z.array(
    RoomTypeSchema.extend({
      room: z.array(RoomSchema),
      roomBed: z.array(RoomBedSchema),
      roomTypeAmenity: z.array(z.object({ amenity: AmenitySchema })),
    }),
  ),
});

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

export const GetFindHotelsQuerySchema = z
  .object({
    province: z.coerce.number().int().positive(),
    start: z.string(),
    end: z.string(),
    adult: z.coerce.number().int().positive(),
    child: z.coerce.number().int().min(0),
    available: z.coerce.number().int().positive(),
    page: z.coerce.number().int().positive().default(1),
    limit: z.coerce.number().int().positive().default(10),
  })
  .strict();

export const GetFindHotelsResSchema = z.object({
  data: z.array(
    HotelSchema.extend({
      hotelAmenity: z.array(z.object({ amenity: AmenitySchema })),
      roomType: z.array(
        RoomTypeSchema.extend({
          room: z.array(RoomSchema),
        }),
      ),
      room: z.array(RoomSchema),
      price: z.number(),
    }),
  ),
  totalItems: z.number(),
  page: z.number(),
  limit: z.number(),
  totalPages: z.number(),
});

export const FindHotelResSchema = HotelSchema.extend({
  hotelAmenity: z.array(z.object({ amenity: AmenitySchema })),
  roomType: z.array(
    RoomTypeSchema.extend({
      room: z.array(RoomSchema),
    }),
  ),
  room: z.array(RoomSchema),
  price: z.number(),
});

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

export const GetHotelAmenitiesResSchema = z.array(AmenitySchema);

export const CreateHotelAmenitiesBodySchema = z
  .object({
    amenities: z.array(z.number()),
    hotelId: z.number(),
  })
  .strict();

export const UpdateHotelAmenitiesBodySchema = z
  .object({
    amenities: z.array(z.number()),
  })
  .strict();

export const UpdateHotelAmenitiesResSchema = GetHotelAmenitiesResSchema;

export const GetHotelsByProvinceCodeResSchema = z.array(
  HotelSchema.extend({
    room: z.array(
      RoomSchema.extend({
        roomType: RoomTypeSchema,
      }),
    ),
  }),
);

export const HotelByIdProvinceCodeResSchema = HotelSchema.extend({
  room: z.array(
    RoomSchema.extend({
      roomType: RoomTypeSchema,
    }),
  ),
});

export const GetQuantityHotelsByProvinceCodeBodySchema = z.object({
  provinceCodes: z.array(z.number()),
});
export const GetQuantityHotelsByProvinceCodeResSchema = z.array(
  z.object({
    provinceCode: z.number(),
    quantity: z.number(),
  }),
);
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
export type CreateHotelAmenitiesBodyType = z.infer<
  typeof CreateHotelAmenitiesBodySchema
>;
export type CreateHotelAmenitiesResType = z.infer<
  typeof GetHotelAmenitiesResSchema
>;
export type UpdateHotelAmenitiesBodyType = z.infer<
  typeof UpdateHotelAmenitiesBodySchema
>;
export type UpdateHotelAmenitiesResType = z.infer<
  typeof UpdateHotelAmenitiesResSchema
>;
export type GetHotelsByProvinceCodeResType = z.infer<
  typeof GetHotelsByProvinceCodeResSchema
>;

export type HotelByIdProvinceCodeResType = z.infer<
  typeof HotelByIdProvinceCodeResSchema
>;
export type GetQuantityHotelsByProvinceCodeBodyType = z.infer<
  typeof GetQuantityHotelsByProvinceCodeBodySchema
>;
export type GetQuantityHotelsByProvinceCodeResType = z.infer<
  typeof GetQuantityHotelsByProvinceCodeResSchema
>;

export type GetFindHotelsQueryType = z.infer<typeof GetFindHotelsQuerySchema>;
export type GetFindHotelsResType = z.infer<typeof GetFindHotelsResSchema>;

export type FindHotelResType = z.infer<typeof FindHotelResSchema>;
