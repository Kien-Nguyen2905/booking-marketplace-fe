import { TRANSACTION_TYPE } from '@/constants';
import { z } from 'zod';

export const TransactionSchema = z.object({
  id: z.number().int().positive(),
  gateway: z.string(),
  transactionDate: z.date(),
  accountNumber: z.string(),
  subAccount: z.string(),
  amount: z.number().int().positive(),
  type: z.enum([TRANSACTION_TYPE.IN, TRANSACTION_TYPE.OUT]),
  accumulated: z.number().int(),
  code: z.string(),
  transactionContent: z.string(),
  referenceNumber: z.string(),
  body: z.string(),
  createdAt: z.date(),
});

export type TransactionType = z.infer<typeof TransactionSchema>;

export const GetTransactionsResSchema = z.object({
  data: z.array(TransactionSchema),
  totalItems: z.number(),
  page: z.number(),
  limit: z.number(),
  totalPages: z.number(),
});

export const GetTransactionResSchema = TransactionSchema;

export type GetTransactionsResType = z.infer<typeof GetTransactionsResSchema>;

export type GetTransactionResType = z.infer<typeof GetTransactionResSchema>;
