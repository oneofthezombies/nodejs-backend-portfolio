import { z } from 'zod';

const Env = z.object({
  JWT_KEY: z.string().min(1),
});

export type Env = z.infer<typeof Env>;

export const env: Env = Env.parse(process.env);
