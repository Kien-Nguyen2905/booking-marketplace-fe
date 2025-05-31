import { AMENITY_CATEGORY } from '@/constants';
import { z } from 'zod';
export const AmenitySchema = z.object({
  id: z.number(),
  name: z.string().max(100),
  category: z.enum([
    AMENITY_CATEGORY.ROOM,
    AMENITY_CATEGORY.PUBLIC,
    AMENITY_CATEGORY.SERVICE,
  ]),
  createdAt: z.date().nullable(),
});

export const GetAmenitiesResSchema = z.array(AmenitySchema);

export const GetAmenityResSchema = AmenitySchema;

export const CreateAmenityBodySchema = AmenitySchema.omit({
  id: true,
  createdAt: true,
}).strict();

export const CreateAmenityResSchema = GetAmenityResSchema;

export type CreateAmenityBodyType = z.infer<typeof CreateAmenityBodySchema>;
export type CreateAmenityResType = z.infer<typeof CreateAmenityResSchema>;

export type GetAmenityResType = z.infer<typeof GetAmenityResSchema>;

export type GetAmenitiesResType = z.infer<typeof GetAmenitiesResSchema>;
