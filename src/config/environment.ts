import { config } from 'dotenv';
import { z } from 'zod';

config();

const clientEnvironmentSchema = z.object({
  NEXT_PUBLIC_SERVER_URL: z.string().default('http://localhost:3000'),
});

const serverEnvironmentSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  PORT: z.string().default('3000'),
  LOG_LEVEL: z.enum(['error', 'warn', 'info', 'debug']).default('info'),
  MONGODB_URI: z.string().optional(),
  ROOT_PATH: z.string().optional(),
  WHATAPP_CLOUD_API_ACCESS_TOKEN: z.string().optional(),
  WHATAPP_CLOUD_API_SENDER_PHONE_NUMBER_ID: z.string().optional(),
  WHATAPP_CLOUD_API_WABA_ID: z.string().optional(),
});

export const clientEnvironment = clientEnvironmentSchema.parse(process.env);
export const serverEnvironment = serverEnvironmentSchema.parse(process.env);
