import { IsEmail, IsString, MinLength } from 'class-validator';
import { z } from 'zod';

export const ReqUser = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
});

export type ReqUser = z.infer<typeof ReqUser>;

export const JwtPayload = z.object({
  username: z.string(),
  sub: z.string(),
});

export type JwtPayload = z.infer<typeof JwtPayload>;

export class RegisterDto {
  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(1)
  password!: string;
}
