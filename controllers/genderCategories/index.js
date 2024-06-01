import repositoryGenderCategories from '../../repository/genderCategory.js'
import { HttpCode } from "../../lib/constants.js";
import convert from "../../convert.json" assert { type: "json" };
import cloudStorage from "../../service/file-storage/cloud-storage.js";
import { CLOUD_GENDER_FILES } from "../../lib/constants.js";

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
        await cloudStorage(CLOUD_GENDER_FILES, file.path, newCategory)
        const result = await repositoryGenderCategories.getGenderCategoriesById(newCategory.id);
        return res.status(HttpCode.CREATED).json(result);
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

export {
    addGenderCategory,
    getGenderCategories,
}