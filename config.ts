import { z } from 'zod';
const configSchema = z.object({
  NEXT_PUBLIC_API_ENDPOINT: z.string(),
  NEXT_PUBLIC_URL: z.string().optional(), // Cho phép undefined
  NEXT_PUBLIC_SECRET_API_KEY: z.string(),
});
const configProject = configSchema.safeParse({
  NEXT_PUBLIC_API_ENDPOINT: process.env.NEXT_PUBLIC_API_ENDPOINT,
  NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL,
  NEXT_PUBLIC_SECRET_API_KEY: process.env.NEXT_PUBLIC_SECRET_API_KEY,
});
if (!configProject.success) {
  console.error(configProject.error.errors);
  throw new Error('Env variables invalid');
}
const envConfig = configProject.data;
export default envConfig;
