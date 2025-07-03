import { Router } from 'express';
import { createUser } from '../controllers/user.controllers.js';
export const routerUser = Router();

routerUser.post('/register', createUser);
