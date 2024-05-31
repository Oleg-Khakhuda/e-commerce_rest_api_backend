import { Router } from "express";
import { getGenderCategories, addGenderCategory } from "../../../controllers/genderCategories/index.js";
import { upload } from "../../../middlewares/upload.js";

const router = new Router();

router.get('/', getGenderCategories);
router.post('/', upload.single("image"),
addGenderCategory)

export default router;