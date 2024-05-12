import { z } from 'zod';

const Env = z.object({
  JWT_KEY: z.string().min(1),
});

export const env = Env.parse(process.env);
