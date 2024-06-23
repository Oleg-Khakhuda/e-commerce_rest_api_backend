import { Router } from 'express';
import { registration, login, logout, currentUser } from '../../../controllers/auth/index.js';
import guard from '../../../middlewares/guard.js';
import { validateAuth } from './validate.js';
import limiter from '../../../middlewares/rate-limit.js';

const router = new Router();

router.post('/signup', validateAuth, limiter(15 * 60 * 1000, 2), registration);
router.post('/login', validateAuth, login);
router.post('/logout', guard, logout);
router.get('/current', guard, currentUser);

export default router;
