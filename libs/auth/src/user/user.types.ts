import { User, Prisma } from '@prisma/client';

export type UserFindByUsernameParam = Required<
  Pick<Prisma.UserWhereUniqueInput, 'username'>
>;
export type UserFindByUsernameResult = User | null;

export type UserCreateParam = Pick<
  Prisma.UserCreateInput,
  'username' | 'password'
>;
export type UserCreateResult = User;
