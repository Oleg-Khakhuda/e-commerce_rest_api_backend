import { Router } from "express";
import { 
    getGenderCategories, 
    addGenderCategory,
    removeGenderCategory, 
    getGenderCategoryById 
} from "../../../controllers/genderCategories/index.js";
import { upload } from "../../../middlewares/upload.js";

const router = new Router();

router.get('/', getGenderCategories);
router.get("/:id", getGenderCategoryById);
router.delete("/:id", removeGenderCategory);
router.post('/', upload.single("image"),
addGenderCategory)

export default router;