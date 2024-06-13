import { Router } from "express";
import {
  addProduct,
  getProductById,
} from "../../../controllers/products/index.js";
import { upload } from "../../../middlewares/upload.js";

const router = new Router();

router.post(
    "/",
    upload.array("image", 10),
    addProduct
);
router.get("/:id", getProductById);

export default router;