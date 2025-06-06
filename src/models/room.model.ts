import { ERROR_ROOM_MESSAGES, POLICY_TYPE } from '@/constants';
import { z } from 'zod';

export const RoomSchema = z.object({
  id: z.number().int().positive(),
  hotelId: z.number().int().positive(),
  roomTypeId: z.number().int().positive(),
  price: z
    .number({ message: ERROR_ROOM_MESSAGES.price.invalidNumber })
    .int({ message: ERROR_ROOM_MESSAGES.price.invalidNumber })
    .min(1, { message: ERROR_ROOM_MESSAGES.price.min }),
  quantity: z
    .number({ message: ERROR_ROOM_MESSAGES.quantity.invalidNumber })
    .int({ message: ERROR_ROOM_MESSAGES.quantity.invalidNumber })
    .min(1, { message: ERROR_ROOM_MESSAGES.quantity.min }),
  rangeLimitDate: z
    .number({ message: ERROR_ROOM_MESSAGES.rangeLimitDate.invalidNumber })
    .int({ message: ERROR_ROOM_MESSAGES.rangeLimitDate.invalidNumber })
    .min(0, { message: ERROR_ROOM_MESSAGES.rangeLimitDate.min })
    .max(7, { message: ERROR_ROOM_MESSAGES.rangeLimitDate.max })
    .optional(),
  policy: z.enum([
    POLICY_TYPE.NON_REFUNDABLE,
    POLICY_TYPE.FREE_CANCELLATION,
    POLICY_TYPE.PAY_AT_HOTEL,
  ]),
  notePolicy: z.string().max(255).optional(),
  createdAt: z.date().nullable(),
  deletedAt: z.date().nullable(),
  updatedAt: z.date().nullable(),
});

export type RoomType = z.infer<typeof RoomSchema>;

export const GetRoomByIdResSchema = RoomSchema;

export const GetRoomsByHotelIdResSchema = z.array(RoomSchema);

export const CreateRoomBodySchema = RoomSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  deletedAt: true,
}).strict();

export const CreateRoomResSchema = RoomSchema;

export const UpdateRoomBodySchema = RoomSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  deletedAt: true,
}).strict();

export const UpdateRoomResSchema = RoomSchema;

export const DeleteRoomResSchema = RoomSchema;

export const GetAvailableRoomsByRoomIdQuerySchema = z.object({
  start: z.string(),
  end: z.string(),
});
export const GetAvailableRoomsByRoomIdResSchema = RoomSchema.extend({
  availableRooms: z.number(),
});

export type GetRoomByIdResType = z.infer<typeof GetRoomByIdResSchema>;

export type GetRoomsByHotelIdResType = z.infer<
  typeof GetRoomsByHotelIdResSchema
>;

export type CreateRoomBodyType = z.infer<typeof CreateRoomBodySchema>;
export type CreateRoomResType = z.infer<typeof CreateRoomResSchema>;

export type UpdateRoomBodyType = z.infer<typeof UpdateRoomBodySchema>;
export type UpdateRoomResType = z.infer<typeof UpdateRoomResSchema>;

export type DeleteRoomResType = z.infer<typeof DeleteRoomResSchema>;

export type GetAvailableRoomsByRoomIdQueryType = z.infer<
  typeof GetAvailableRoomsByRoomIdQuerySchema
>;
export type GetAvailableRoomsByRoomIdResType = z.infer<
  typeof GetAvailableRoomsByRoomIdResSchema
>;
