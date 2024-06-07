import { Router } from "express";
import { 
    addCategory,
    getCategoryById,
    removeCategory,
    getCategories,
    updateCategory
} from "../../../controllers/categories/index.js";
import { upload } from "../../../middlewares/upload.js";

const router = new Router();

router.post('/', upload.single("image"),
addCategory);
router.get('/:id', getCategoryById);
router.get('/', getCategories);
router.delete('/delete/:id', removeCategory);
router.put('/update/:id', upload.single("image"), 
updateCategory)

export default router;