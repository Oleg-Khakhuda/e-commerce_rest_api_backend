import { Router } from "express";
import {
  addProduct,
  getAllProducts,
  getProducts,
  getProductById,
  removeProduct,
  updateProduct,
  removeProductImage,
  getProductsByCategory,
} from "../../../controllers/products/index.js";
import { upload } from "../../../middlewares/upload.js";

const router = new Router();

router.get("/all", getAllProducts);
router.get("/list/", getProducts);
router.get("/search/:id", getProductsByCategory);
router.post(
    "/",
    upload.array("image", 10),
    addProduct
);
router.get("/:id", getProductById);
router.delete("/delete/:id", removeProduct);
router.put("/deleteImage/:id", removeProductImage);
router.put("/update/:id",
  upload.array("image", 10),
  updateProduct
);

export default router;