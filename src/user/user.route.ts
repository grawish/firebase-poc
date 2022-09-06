import { PrismaClient } from '@prisma/client';
import express, { Request, Response } from 'express';
import { createUser } from './user.service';
import { createGroup } from '../../service/createGroup.service';

const prisma = new PrismaClient();
const userRouter = express.Router();

userRouter.post('/users', async (req: Request, res: Response) => {
  const userFetched = {
    email: req.body.email,
    id: req.body.id,
    name: req.body.name
  };
  console.log(prisma.user);

  const userData = await prisma.user.findMany({
    where: {
      id: userFetched.id
    }
  });
  console.log('a', { userData });

  if (!userData) {
    const userGroup = await createGroup(userFetched.id, req.body.token);
    if (userGroup) {
      const userDetail = await createUser({ ...userFetched, token: userGroup });
      await res.json(userDetail);
    }
  } else {
    const existingUser = await prisma.user.findUnique({
      where: { id: userFetched.id }
    });
    console.log(existingUser);
    // addDeviceToGroupService(existingUser.token ,req.body.token, createdUser.id);
    res.json({ message: 'User already exists' });
  }
  return 0;
});

export { userRouter };
