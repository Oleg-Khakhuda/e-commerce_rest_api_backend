import { Router } from "express";
import { 
    addCategory
} from "../../../controllers/categories/index.js";
import { upload } from "../../../middlewares/upload.js";

const router = new Router();

router.post('/', upload.single("image"),
addCategory);

export default router;