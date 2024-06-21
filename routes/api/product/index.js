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
  getProductsByGenderCategory,
} from "../../../controllers/products/index.js";
import { upload } from "../../../middlewares/upload.js";

const router = new Router();

router.get("/all", getAllProducts);
router.get("/list/", getProducts);
router.get("/category/:id", getProductsByCategory);
router.get("/genderCategory/:id", getProductsByGenderCategory);
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