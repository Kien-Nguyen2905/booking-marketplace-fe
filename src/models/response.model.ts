import { z } from 'zod';

export const EmptyResSchema = z.object({});

export type EmptyDataResponse = z.infer<typeof EmptyResSchema>;
