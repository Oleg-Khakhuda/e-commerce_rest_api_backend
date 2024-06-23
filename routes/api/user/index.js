import { Router } from 'express';
import {
  uploadAvatar,
  verifyUser,
  repeatEmailForVerifyUser,
} from '../../../controllers/users/index.js';
import guard from '../../../middlewares/guard.js';
import { upload } from '../../../middlewares/upload.js';

const router = new Router();

router.patch('/avatar', guard, upload.single('avatarUrl'), uploadAvatar);
router.get('/verify/:verificationToken', verifyUser);
router.post('/verify', repeatEmailForVerifyUser);

export default router;
