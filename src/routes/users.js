import { Router } from 'express';
import { createUser, loginUser } from '../controllers/userController.js';

const router = Router();

router.post('/', createUser);
router.post('/login', loginUser);

export default router;
