import { ERROR_AUTH_MESSAGES } from '@/constants';
import { UserSchema } from '@/models/auth.model';
import { PermissionSchema } from '@/models/permission.model';
import { RoleSchema } from '@/models/role.model';
import { z } from 'zod';

export const UpdateMeBodySchema = UserSchema.pick({
  fullName: true,
  phoneNumber: true,
  avatar: true,
  address: true,
  gender: true,
  birthday: true,
  accountNumber: true,
  bankAccount: true,
  bankName: true,
}).strict();

export const ChangePasswordBodySchema = UserSchema.pick({
  password: true,
})
  .extend({
    newPassword: z
      .string({ required_error: ERROR_AUTH_MESSAGES.newPassword.required })
      .min(6, { message: ERROR_AUTH_MESSAGES.newPassword.minLength })
      .max(50, { message: ERROR_AUTH_MESSAGES.newPassword.maxLength }),
    confirmNewPassword: z
      .string({
        required_error: ERROR_AUTH_MESSAGES.confirmNewPassword.required,
      })
      .min(6, { message: ERROR_AUTH_MESSAGES.confirmNewPassword.minLength })
      .max(50, { message: ERROR_AUTH_MESSAGES.confirmNewPassword.maxLength }),
  })
  .strict()
  .superRefine(({ newPassword, confirmNewPassword }, ctx) => {
    if (newPassword !== confirmNewPassword) {
      ctx.addIssue({
        code: 'custom',
        message: 'Password and confirm password must match',
        path: ['confirmNewPassword'],
      });
    }
  });

export const GetUserProfileResSchema = UserSchema.omit({
  password: true,
}).extend({
  role: RoleSchema.pick({
    id: true,
    name: true,
  }).extend({
    permissions: z.array(
      PermissionSchema.pick({
        id: true,
        name: true,
        path: true,
        method: true,
      }),
    ),
  }),
});
export type GetUserProfileResType = z.infer<typeof GetUserProfileResSchema>;
export type UpdateMeBodyType = z.infer<typeof UpdateMeBodySchema>;
export type ChangePasswordBodyType = z.infer<typeof ChangePasswordBodySchema>;
