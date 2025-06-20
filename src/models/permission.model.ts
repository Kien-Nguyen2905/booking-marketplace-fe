import { HTTPMethod } from '@/constants';
import { z } from 'zod';

export const PermissionSchema = z.object({
  id: z.number(),
  name: z.string().max(255),
  description: z.string().nullable(),
  path: z.string().max(255),
  method: z.enum([
    HTTPMethod.GET,
    HTTPMethod.POST,
    HTTPMethod.PUT,
    HTTPMethod.DELETE,
    HTTPMethod.PATCH,
    HTTPMethod.OPTIONS,
    HTTPMethod.HEAD,
  ]),
  createdById: z.number().nullable(),
  updatedById: z.number().nullable(),
  deletedById: z.number().nullable(),
  deletedAt: z.date().nullable(),
  createdAt: z.date().nullable(),
  updatedAt: z.date().nullable(),
});

export const GetPermissionsResSchema = z.object({
  data: z.array(PermissionSchema),
  totalItems: z.number(),
  page: z.number().optional(),
  limit: z.number().optional(),
  totalPages: z.number().optional(),
});

export const GetPermissionsQuerySchema = z
  .object({
    page: z.coerce.number().int().positive().optional(),
    limit: z.coerce.number().int().positive().optional(),
  })
  .strict();

export const GetPermissionParamsSchema = z
  .object({
    permissionId: z.coerce.number(),
  })
  .strict();

export const GetPermissionDetailResSchema = PermissionSchema;

export const CreatePermissionBodySchema = PermissionSchema.pick({
  name: true,
  path: true,
  method: true,
}).strict();

export const UpdatePermissionBodySchema = CreatePermissionBodySchema;

export type PermissionType = z.infer<typeof PermissionSchema>;
export type GetPermissionsResType = z.infer<typeof GetPermissionsResSchema>;
export type GetPermissionsQueryType = z.infer<typeof GetPermissionsQuerySchema>;
export type GetPermissionDetailResType = z.infer<
  typeof GetPermissionDetailResSchema
>;
export type CreatePermissionBodyType = z.infer<
  typeof CreatePermissionBodySchema
>;
export type GetPermissionParamsType = z.infer<typeof GetPermissionParamsSchema>;
export type UpdatePermissionBodyType = z.infer<
  typeof UpdatePermissionBodySchema
>;
