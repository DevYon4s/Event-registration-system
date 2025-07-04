import { Router } from 'express';
import {
  createRegistration,
  getUserRegistrations,
  cancelRegistration,
} from '../controllers/registrationController.js';
import { protect } from '../middleware/auth.js';

const router = Router();

router.post('/', protect, createRegistration);
router.get('/user/:userId', protect, getUserRegistrations);
router.delete('/:id', protect, cancelRegistration);

export default router;
