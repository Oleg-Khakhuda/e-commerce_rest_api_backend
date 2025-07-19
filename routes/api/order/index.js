import { Router } from 'express';
import { addOrder, getAllOrders, getOrdersByUserId } from '../../../controllers/orders/index.js';
import roleAccess from '../../../middlewares/role-access.js';
import { Role } from '../../../lib/constants.js';
import guard from '../../../middlewares/guard.js';

const router = new Router();

router.post('/', addOrder);
router.get('/', [guard, roleAccess(Role.ADMIN)], getAllOrders);
router.get('/user/:id', guard, getOrdersByUserId);

export default router;
