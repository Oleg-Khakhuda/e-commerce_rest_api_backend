import repositoryGenderCategories from '../../repository/genderCategory.js'
import { HttpCode } from "../../lib/constants.js";
import convert from "../../convert.json" assert { type: "json" };
import cloudStorage from "../../service/file-storage/cloud-storage.js";
import { CLOUD_GENDER_FOLDER } from "../../lib/constants.js";

const addGenderCategory = async (req, res) => {
    try {
        const file = req.file;
        const text = req.body.title;
        const str = text.replace(/[\s-]/g, '_').toLowerCase();
        const newName = str.split('').map(char => convert[char] || char).join('');

      const newCategory = await repositoryGenderCategories.addGenderCategory({
        ...req.body,
        slug: newName,
        image: file.path
      });
      if (newCategory) {
        const fileUrl = await cloudStorage.save(CLOUD_GENDER_FOLDER, file.path, newCategory)
        const result = await repositoryGenderCategories.getGenderCategoryById(newCategory.id);
        if (fileUrl && result) {
          return res.status(HttpCode.CREATED).json(result);
        }
      }
    } catch (error) {
      res.status(HttpCode.NOT_FOUND).json({
        status: "error",
        code: HttpCode.NOT_FOUND,
        message: "Щось пішло не так",
      });
    }
  };

const getGenderCategories = async (req, res, next) => {
    try {
        const categories = await repositoryGenderCategories.getGenderCategories();
        if (categories) {
        return res.status(HttpCode.OK).json(categories);
        }
    } catch (error) {
        res.status(HttpCode.NOT_FOUND).json({
        status: "error",
        code: HttpCode.NOT_FOUND,
        message: "Щось пішло не так",
        });
    }
};

const getGenderCategoryById = async (req, res, next) => {
    try {
      const { id } = req.params;
  
      const category = await repositoryGenderCategories.getGenderCategoryById(id);
      if (category) {
        return res.status(HttpCode.OK).json(category);
      }
    } catch (error) {
      res.status(HttpCode.NOT_FOUND).json({
        status: "error",
        code: HttpCode.NOT_FOUND,
        message: "Щось пішло не так",
      });
    }
  };

  const removeGenderCategory = async (req, res, next) => {
    try {
      const { id } = req.params;
      
      const category = await repositoryGenderCategories.removeGenderCategory(id);
      if (category) {
        const removeFiles = await cloudStorage.removeFiles(CLOUD_GENDER_FOLDER, category.idFileCloud);
        if (removeFiles) {
          await cloudStorage.removeFolder(CLOUD_GENDER_FOLDER, category.id);
        }
        return res
          .status(HttpCode.OK)
          .json({ status: "success", code: HttpCode.OK, category });
      }
    } catch (error) {
      res.status(HttpCode.NOT_FOUND).json({
        status: "error",
        code: HttpCode.NOT_FOUND,
        message: "Щось пішло не так",
      });
    }
  };

export {
    addGenderCategory,
    getGenderCategories,
    getGenderCategoryById,
    removeGenderCategory,
}