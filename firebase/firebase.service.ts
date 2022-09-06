import { admin } from './config';
import { User } from '@prisma/client';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getUser = async (uid: string): Promise<User> => {
  const user = await prisma.user.findUnique({
    where: {
      uid
    }
  });
  prisma.$disconnect();
  return user;
};
