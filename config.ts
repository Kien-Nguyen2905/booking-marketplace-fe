import { z } from 'zod';
const configSchema = z.object({
  NEXT_PUBLIC_API_ENDPOINT: z.string(),
  NEXT_PUBLIC_URL: z.string().optional(), // Cho phép undefined
  NEXT_PUBLIC_SECRET_API_KEY: z.string(),
  NEXT_PUBLIC_GOOGLE_SERVICE_PRIVATE_KEY: z.string().optional(),
  NEXT_PUBLIC_GOOGLE_SERVICE_CLIENT_EMAIL: z.string().optional(),
});
const configProject = configSchema.safeParse({
  NEXT_PUBLIC_API_ENDPOINT: process.env.NEXT_PUBLIC_API_ENDPOINT,
  NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL,
  NEXT_PUBLIC_SECRET_API_KEY: process.env.NEXT_PUBLIC_SECRET_API_KEY,
  NEXT_PUBLIC_GOOGLE_SERVICE_PRIVATE_KEY:
    process.env.NEXT_PUBLIC_GOOGLE_SERVICE_PRIVATE_KEY,
  NEXT_PUBLIC_GOOGLE_SERVICE_CLIENT_EMAIL:
    process.env.NEXT_PUBLIC_GOOGLE_SERVICE_CLIENT_EMAIL,
});
if (!configProject.success) {
  console.error(configProject.error.errors);
  throw new Error('Env variables invalid');
}
const envConfig = configProject.data;
export default envConfig;
