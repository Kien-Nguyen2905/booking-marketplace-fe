import { ROLE_NAME, UserStatus } from '@/constants';
import { UserSchema } from '@/models/auth.model';
import { GetUserProfileResType } from '@/models/profile.model';
import { RoleSchema } from '@/models/role.model';
import { z } from 'zod';

export const GetUsersResSchema = z.object({
  data: z.array(
    UserSchema.omit({
      password: true,
      totpSecret: true,
      uriSecret: true,
    }).extend({
      role: RoleSchema.pick({
        id: true,
        name: true,
      }),
    }),
  ),
  totalItems: z.number(),
  page: z.number(),
  limit: z.number(),
  totalPages: z.number(),
});

export const GetUsersQuerySchema = z
  .object({
    page: z.coerce.number().int().positive().default(1),
    limit: z.coerce.number().int().positive().default(10),
    search: z.string().optional(),
    role: z
      .enum([ROLE_NAME.ADMIN, ROLE_NAME.CUSTOMER, ROLE_NAME.PARTNER])
      .optional(),
    status: z
      .enum([UserStatus.ACTIVE, UserStatus.INACTIVE])
      .optional()
      .default(UserStatus.ACTIVE)
      .optional(),
  })
  .strict();

export const GetUserParamsSchema = z
  .object({
    userId: z.coerce.number().int().positive(),
  })
  .strict();

export const CreateUserBodySchema = UserSchema.pick({
  email: true,
  fullName: true,
  phoneNumber: true,
  avatar: true,
  status: true,
  password: true,
  roleId: true,
}).strict();

export const UpdateUserBodySchema = CreateUserBodySchema.omit({
  password: true,
});

export type GetUsersResType = z.infer<typeof GetUsersResSchema>;
export type GetUsersQueryType = z.infer<typeof GetUsersQuerySchema>;
export type GetUserResType = GetUserProfileResType;
export type CreateUserBodyType = z.infer<typeof CreateUserBodySchema>;
export type UpdateUserBodyType = z.infer<typeof UpdateUserBodySchema>;
