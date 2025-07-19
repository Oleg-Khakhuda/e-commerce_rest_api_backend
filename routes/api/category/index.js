import { Router } from 'express';
import {
  addCategory,
  getCategoryById,
  getCategoryBySlugGenderCat,
  removeCategory,
  getCategories,
  updateCategory,
} from '../../../controllers/categories/index.js';
import { upload } from '../../../middlewares/upload.js';
import roleAccess from '../../../middlewares/role-access.js';
import { Role } from '../../../lib/constants.js';
import guard from '../../../middlewares/guard.js';

const router = new Router();

router.post('/', [guard, roleAccess(Role.ADMIN)], upload.single('image'), addCategory);
router.get('/:id', getCategoryById);
router.get('/slug/:slug', getCategoryBySlugGenderCat);
router.get('/', getCategories);
router.delete('/delete/:id', [guard, roleAccess(Role.ADMIN)], removeCategory);
router.put('/update/:id', [guard, roleAccess(Role.ADMIN)], upload.single('image'), updateCategory);

export default router;
