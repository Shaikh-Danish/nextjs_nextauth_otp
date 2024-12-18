import { config } from 'dotenv';
import { z } from 'zod';

config();

const clientEnvironmentSchema = z.object({
  NEXT_PUBLIC_SERVER_URL: z.string(),
});

const serverEnvironmentSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  PORT: z.string().default('3000'),
  LOG_LEVEL: z.enum(['error', 'warn', 'info', 'debug']).default('info'),
  MONGODB_URI: z.string(),
  ROOT_PATH: z.string(),
  WHATAPP_CLOUD_API_ACCESS_TOKEN: z.string(),
  WHATAPP_CLOUD_API_SENDER_PHONE_NUMBER_ID: z.string(),
  WHATAPP_CLOUD_API_WABA_ID: z.string(),
});

export const clientEnvironment = clientEnvironmentSchema.parse(process.env);
export const serverEnvironment = serverEnvironmentSchema.parse(process.env);
