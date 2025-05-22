import { ERROR_AUTH_MESSAGES } from '@/constants';
import { TypeOfVerificationCode, UserStatus } from '@/constants/auth';
import { z } from 'zod';

export const UserSchema = z.object({
  id: z.number().int().positive(),
  email: z
    .string({ required_error: ERROR_AUTH_MESSAGES.email.required })
    .email({ message: ERROR_AUTH_MESSAGES.email.invalid })
    .max(100, { message: ERROR_AUTH_MESSAGES.email.maxLength }),
  password: z
    .string({ required_error: ERROR_AUTH_MESSAGES.password.required })
    .min(6, { message: ERROR_AUTH_MESSAGES.password.minLength })
    .max(50, { message: ERROR_AUTH_MESSAGES.password.maxLength }),
  fullName: z
    .string({ required_error: ERROR_AUTH_MESSAGES.fullName.required })
    .trim()
    .min(2, { message: ERROR_AUTH_MESSAGES.fullName.minLength })
    .max(100, { message: ERROR_AUTH_MESSAGES.fullName.maxLength })
    .regex(/^[A-Za-zÀ-ỹ\s]+$/, {
      message: ERROR_AUTH_MESSAGES.fullName.invalidCharacters,
    }),
  phoneNumber: z
    .string()
    .min(9, { message: ERROR_AUTH_MESSAGES.phoneNumber.minLength })
    .max(20, { message: ERROR_AUTH_MESSAGES.phoneNumber.maxLength })
    .nullable(),
  avatar: z.string().nullable(),
  totpSecret: z.string().max(255).nullable(),
  uriSecret: z.string().max(255).nullable(),
  address: z.string().nullable(),
  gender: z.string().max(20).nullable(),
  birthday: z.coerce.date().nullable(),
  earnPoint: z.number().nullable().default(0),
  accountNumber: z.string().max(100).nullable(),
  bankAccount: z.string().max(100).nullable(),
  bankName: z.string().max(255).nullable(),
  roleId: z.number().int().positive(),
  status: z
    .enum([UserStatus.ACTIVE, UserStatus.INACTIVE])
    .nullable()
    .default(UserStatus.ACTIVE),
  createdById: z.number().int().positive().nullable(),
  updatedById: z.number().int().positive().nullable(),
  deletedAt: z.date().nullable(),
  createdAt: z.date().nullable(),
  updatedAt: z.date().nullable(),
});

export type UserType = z.infer<typeof UserSchema>;

export const RegisterBodySchema = UserSchema.pick({
  email: true,
  password: true,
})
  .extend({
    confirmPassword: z
      .string({ required_error: ERROR_AUTH_MESSAGES.confirmPassword.required })
      .min(6, { message: ERROR_AUTH_MESSAGES.confirmPassword.minLength })
      .max(50, { message: ERROR_AUTH_MESSAGES.confirmPassword.maxLength }),
    code: z.string().length(6, { message: ERROR_AUTH_MESSAGES.code.length }),
  })
  .strict()
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: 'custom',
        message: 'Password and confirm password must match',
        path: ['confirmPassword'],
      });
    }
  });

export const VerificationCodeSchema = z.object({
  id: z.number().int().positive(),
  email: z.string().email().max(100),
  code: z.string().length(6),
  type: z.enum([
    TypeOfVerificationCode.REGISTER,
    TypeOfVerificationCode.FORGOT_PASSWORD,
    TypeOfVerificationCode.VERIFY,
  ]),
  expiresAt: z.date(),
  createdAt: z.date().nullable(),
});

export const SendOTPBodySchema = VerificationCodeSchema.pick({
  email: true,
  type: true,
}).strict();

export const LoginBodySchema = UserSchema.pick({
  email: true,
  password: true,
})
  .extend({
    totpCode: z
      .string()
      .length(6, { message: ERROR_AUTH_MESSAGES.totpCode.length })
      .optional(),
  })
  .strict();

export const LoginResSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
});

export const RefreshTokenResSchema = LoginResSchema;

export const DeviceSchema = z.object({
  id: z.number(),
  userId: z.number(),
  userAgent: z.string(),
  browser: z.string().nullable(),
  os: z.string().nullable(),
  deviceType: z.string().nullable(),
  deviceVendor: z.string().nullable(),
  deviceModel: z.string().nullable(),
  ip: z.string(),
  lastActive: z.date().nullable(),
  createdAt: z.date().nullable(),
  isActive: z.boolean().nullable().default(true),
});

export const RefreshTokenSchema = z.object({
  token: z.string(),
  userId: z.number(),
  deviceId: z.number(),
  expiresAt: z.date(),
  createdAt: z.date().nullable(),
});
export const RefreshTokenBodySchema = z
  .object({
    refreshToken: z.string(),
  })
  .strict();

export const LogoutBodySchema = RefreshTokenBodySchema;
export const RegisterResSchema = LoginResSchema;

export const GetAuthorizationUrlResSchema = z.object({
  url: z.string().url(),
});

export const ForgotPasswordBodySchema = z
  .object({
    email: z
      .string({ required_error: ERROR_AUTH_MESSAGES.email.required })
      .email({ message: ERROR_AUTH_MESSAGES.email.invalid })
      .max(100, { message: ERROR_AUTH_MESSAGES.email.maxLength }),
    code: z
      .string({ required_error: ERROR_AUTH_MESSAGES.code.required })
      .length(6, { message: ERROR_AUTH_MESSAGES.code.length }),
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
  .superRefine(({ confirmNewPassword, newPassword }, ctx) => {
    if (confirmNewPassword !== newPassword) {
      ctx.addIssue({
        code: 'custom',
        message: ERROR_AUTH_MESSAGES.confirmNewPassword.mismatch,
        path: ['confirmNewPassword'],
      });
    }
  });

export const DisableTwoFactorBodySchema = z
  .object({
    totpCode: z.string().length(6).optional(),
  })
  .strict();

export const TwoFactorSetupResSchema = z.object({
  secret: z.string(),
  uri: z.string(),
});

export const ForgotTwoFactorAuthSchema = z
  .object({
    email: z.string().email(),
  })
  .strict();

export const GetAllDevicesSchema = DeviceSchema.extend({
  isMe: z.boolean(),
});
export type VerificationCodeType = z.infer<typeof VerificationCodeSchema>;
export type SendOTPBodyType = z.infer<typeof SendOTPBodySchema>;
export type RegisterBodyType = z.infer<typeof RegisterBodySchema>;
export type RegisterResType = z.infer<typeof RegisterResSchema>;
export type LoginBodyType = z.infer<typeof LoginBodySchema>;
export type LoginResType = z.infer<typeof LoginResSchema>;
export type LogoutBodyType = z.infer<typeof LogoutBodySchema>;
export type DeviceType = z.infer<typeof DeviceSchema>;
export type RefreshTokenType = z.infer<typeof RefreshTokenSchema>;
export type RefreshTokenBodyType = z.infer<typeof RefreshTokenBodySchema>;
export type RefreshTokenResType = z.infer<typeof RefreshTokenResSchema>;
export type GetAuthorizationUrlResType = z.infer<
  typeof GetAuthorizationUrlResSchema
>;
export type ForgotPasswordBodyType = z.infer<typeof ForgotPasswordBodySchema>;

export type DisableTwoFactorBodyType = z.infer<
  typeof DisableTwoFactorBodySchema
>;
export type TwoFactorSetupResType = z.infer<typeof TwoFactorSetupResSchema>;
export type GetAllDevicesResType = z.infer<typeof GetAllDevicesSchema>;
export type ForgotTwoFactorAuthBodyType = z.infer<
  typeof ForgotTwoFactorAuthSchema
>;
