import { Router } from "express";
import { getGenderCategories } from "../../../controllers/genderCategories/index.js";

const router = new Router();

router.get("/", getGenderCategories);

export default router;