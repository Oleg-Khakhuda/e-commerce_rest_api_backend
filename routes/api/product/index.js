import { Router } from "express";
import {
  addProduct,
  getProductById,
  removeProduct,
  updateProduct,
} from "../../../controllers/products/index.js";
import { upload } from "../../../middlewares/upload.js";

const router = new Router();

router.post(
    "/",
    upload.array("image", 10),
    addProduct
);
router.get("/:id", getProductById);
router.delete("/delete/:id", removeProduct);
router.put("/update/:id",
  upload.array("image", 10),
  updateProduct
);

export default router;