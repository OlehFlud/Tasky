import { Router } from 'express';

import { userController } from '../controllers';

import { checkIsUserExistMiddleware, checkIsUserValidityMiddleware } from '../middleware';

const router = Router();

router.post('/register', checkIsUserValidityMiddleware, userController.createUser);

router.post('/login', checkIsUserExistMiddleware, userController.loginUser);

router.post('/logout', userController.logoutUser);

router.get('/:id', userController.findUserById);

export const userRouter = router;
