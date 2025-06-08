import { ERROR_ROOM_TYPE_MESSAGES, ROOM_BED_TYPE } from '@/constants';
import { AmenitySchema } from '@/models/amenity.model';
import { RoomSchema } from '@/models/room.model';
import { z } from 'zod';

export const RoomTypeSchema = z.object({
  id: z.number().int().positive(),
  hotelId: z.number().int().positive(),
  type: z
    .string()
    .max(100, { message: ERROR_ROOM_TYPE_MESSAGES.type.maxLength })
    .nonempty({ message: ERROR_ROOM_TYPE_MESSAGES.type.required }),
  adults: z
    .number({ message: ERROR_ROOM_TYPE_MESSAGES.adults.required })
    .min(1, { message: ERROR_ROOM_TYPE_MESSAGES.adults.min }),
  child: z
    .number({ message: ERROR_ROOM_TYPE_MESSAGES.child.required })
    .default(0)
    .optional(),
  area: z
    .number({ message: ERROR_ROOM_TYPE_MESSAGES.area.required })
    .min(10, { message: ERROR_ROOM_TYPE_MESSAGES.area.min }),
  serviceFeeRate: z
    .number({ message: ERROR_ROOM_TYPE_MESSAGES.serviceFeeRate.required })
    .min(0, { message: ERROR_ROOM_TYPE_MESSAGES.serviceFeeRate.min })
    .max(100, { message: ERROR_ROOM_TYPE_MESSAGES.serviceFeeRate.max }),
  description: z
    .string()
    .nonempty({ message: ERROR_ROOM_TYPE_MESSAGES.description.required }),
  images: z.array(z.string()),
  createdAt: z.date().nullable(),
  deletedAt: z.date().nullable(),
  updatedAt: z.date().nullable(),
});

export const RoomTypeAmenitySchema = z.object({
  id: z.number().int().positive(),
  roomTypeId: z.number().int().positive(),
  amenityId: z.number().int().positive(),
});

export const RoomBedSchema = z.object({
  id: z.number().int().positive(),
  roomTypeId: z.number().int().positive(),
  roomBedType: z.enum([
    ROOM_BED_TYPE.KING,
    ROOM_BED_TYPE.QUEEN,
    ROOM_BED_TYPE.DOUBLE,
    ROOM_BED_TYPE.TWIN,
    ROOM_BED_TYPE.SINGLE,
    ROOM_BED_TYPE.BUNK,
  ]),
  quantity: z.number().int().positive(),
});

export type RoomTypeType = z.infer<typeof RoomTypeSchema>;
export type RoomTypeAmenityType = z.infer<typeof RoomTypeAmenitySchema>;
export type RoomBedType = z.infer<typeof RoomBedSchema>;

export const GetRoomTypeByIdResSchema = RoomTypeSchema.extend({
  roomBed: z.array(RoomBedSchema),
  amenities: z.array(AmenitySchema),
});

export const GetRoomTypeByHotelIdResSchema = z.array(
  RoomTypeSchema.extend({
    roomBed: z.array(RoomBedSchema),
    amenities: z.array(AmenitySchema),
    room: z.array(RoomSchema),
  }),
);

export const RoomTypeByHotelIdSchema = RoomTypeSchema.extend({
  roomBed: z.array(RoomBedSchema),
  roomTypeAmenity: z.array(AmenitySchema),
  room: z.array(RoomSchema),
});

export const CreateRoomTypeBodySchema = RoomTypeSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  deletedAt: true,
}).strict();

export const CreateRoomTypeResSchema = RoomTypeSchema;

export const UpdateRoomTypeBodySchema = RoomTypeSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  deletedAt: true,
}).strict();

export const UpdateRoomTypeResSchema = RoomTypeSchema;

export const DeleteRoomTypeResSchema = RoomTypeSchema;

export const CreateRoomBedBodySchema = z
  .object({
    roomBeds: z.array(
      RoomBedSchema.omit({
        roomTypeId: true,
        id: true,
      }).strict(),
    ),
  })
  .strict();

export const CreateRoomBedResSchema = z.array(RoomBedSchema);

export const UpdateRoomBedBodySchema = z
  .object({
    roomBeds: z.array(
      RoomBedSchema.omit({
        roomTypeId: true,
        id: true,
      }).strict(),
    ),
  })
  .strict();

export const UpdateRoomBedResSchema = z.array(RoomBedSchema);

export const CreateRoomTypeAmenitiesBodySchema = z
  .object({
    amenities: z.array(z.number()),
  })
  .strict();

export const CreateRoomTypeAmenitiesResSchema = z.array(AmenitySchema);

export const UpdateRoomTypeAmenitiesBodySchema = z
  .object({
    amenities: z.array(z.number()),
  })
  .strict();

export const UpdateRoomTypeAmenitiesResSchema = z.array(AmenitySchema);

export type GetRoomTypeByIdResType = z.infer<typeof GetRoomTypeByIdResSchema>;

export type GetRoomTypeByHotelIdResType = z.infer<
  typeof GetRoomTypeByHotelIdResSchema
>;

export type RoomTypeByHotelIdType = z.infer<typeof RoomTypeByHotelIdSchema>;

export type CreateRoomTypeBodyType = z.infer<typeof CreateRoomTypeBodySchema>;
export type CreateRoomTypeResType = z.infer<typeof CreateRoomTypeResSchema>;

export type UpdateRoomTypeBodyType = z.infer<typeof UpdateRoomTypeBodySchema>;
export type UpdateRoomTypeResType = z.infer<typeof UpdateRoomTypeResSchema>;

export type DeleteRoomTypeResType = z.infer<typeof DeleteRoomTypeResSchema>;

export type CreateRoomBedBodyType = z.infer<typeof CreateRoomBedBodySchema>;
export type CreateRoomBedResType = z.infer<typeof CreateRoomBedResSchema>;

export type UpdateRoomBedBodyType = z.infer<typeof UpdateRoomBedBodySchema>;
export type UpdateRoomBedResType = z.infer<typeof UpdateRoomBedResSchema>;

export type CreateRoomTypeAmenitiesBodyType = z.infer<
  typeof CreateRoomTypeAmenitiesBodySchema
>;
export type CreateRoomTypeAmenitiesResType = z.infer<
  typeof CreateRoomTypeAmenitiesResSchema
>;

export type UpdateRoomTypeAmenitiesBodyType = z.infer<
  typeof UpdateRoomTypeAmenitiesBodySchema
>;
export type UpdateRoomTypeAmenitiesResType = z.infer<
  typeof UpdateRoomTypeAmenitiesResSchema
>;
