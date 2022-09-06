import { PrismaClient, User } from '@prisma/client';
const prisma = new PrismaClient();
export const createUser = async (user: {
  id: number;
  name: string;
  email: string;
  token: string;
}): Promise<User> => {
  const insertResult = await prisma.user.create({
    data: user
  });
  prisma.$disconnect();
  return insertResult;
};
