import { ERROR_AUTH_MESSAGES, PartnerStatus } from '@/constants';
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
})
  .strict()
  .superRefine((value, ctx) => {
    if (value.phoneNumber && !/^[0-9]+$/.test(value.phoneNumber)) {
      ctx.addIssue({
        code: 'custom',
        message: ERROR_AUTH_MESSAGES.phoneNumber.invalidCharacters,
        path: ['phoneNumber'],
      });
    }
    if (value.phoneNumber && value.phoneNumber.length < 9) {
      ctx.addIssue({
        code: 'custom',
        message: ERROR_AUTH_MESSAGES.phoneNumber.minLength,
        path: ['phoneNumber'],
      });
    }
    if (value.phoneNumber && value.phoneNumber.length > 20) {
      ctx.addIssue({
        code: 'custom',
        message: ERROR_AUTH_MESSAGES.phoneNumber.maxLength,
        path: ['phoneNumber'],
      });
    }
  });

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
  partnerStatus: z
    .enum([
      PartnerStatus.PENDING,
      PartnerStatus.ACCEPTED,
      PartnerStatus.REJECTED,
    ])
    .nullable()
    .default(PartnerStatus.PENDING),
});
export type GetUserProfileResType = z.infer<typeof GetUserProfileResSchema>;
export type UpdateMeBodyType = z.infer<typeof UpdateMeBodySchema>;
export type ChangePasswordBodyType = z.infer<typeof ChangePasswordBodySchema>;
