import { Router } from "express";
import { 
    getGenderCategories, 
    addGenderCategory,
    removeGenderCategory, 
    getGenderCategoryById,
    updateGenderCategory 
} from "../../../controllers/genderCategories/index.js";
import { upload } from "../../../middlewares/upload.js";

const router = new Router();

router.get('/', getGenderCategories);
router.get("/:id", getGenderCategoryById);
router.delete("/delete/:id", removeGenderCategory);
router.post('/', upload.single("image"),
addGenderCategory);
router.put("/update/:id",
    upload.single("image"),
    updateGenderCategory
  );

export default router;