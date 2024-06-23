import { Router } from 'express';
import {
  getGenderCategories,
  addGenderCategory,
  removeGenderCategory,
  getGenderCategoryById,
  updateGenderCategory,
} from '../../../controllers/genderCategories/index.js';
import { upload } from '../../../middlewares/upload.js';
import roleAccess from '../../../middlewares/role-access.js';
import { Role } from '../../../lib/constants.js';
import guard from '../../../middlewares/guard.js';

const router = new Router();

router.get('/', getGenderCategories);
router.get('/:id', getGenderCategoryById);
router.delete('/delete/:id', [guard, roleAccess(Role.ADMIN)], removeGenderCategory);
router.post('/', [guard, roleAccess(Role.ADMIN)], upload.single('image'), addGenderCategory);
router.put(
  '/update/:id',
  [guard, roleAccess(Role.ADMIN)],
  upload.single('image'),
  updateGenderCategory,
);

export default router;
