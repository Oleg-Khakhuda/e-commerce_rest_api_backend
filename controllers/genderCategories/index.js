import repositoryGenderCategories from '../../repository/genderCategory.js'
import { HttpCode } from "../../lib/constants.js";
import convert from "../../convert.json" assert { type: "json" };

const addGenderCategory = async (req, res) => {
    try {
        const file = req.file;

        const text = req.body.title;
        const str = text.replace(/[\s-]/g, '_').toLowerCase();
        const newName = str.split('').map(char => convert[char] || char).join('');

      const newCategory = await repositoryGenderCategories.addGenderCategory({
        ...req.body,
        slug: newName,
        image: `http://localhost:7000/` + file.path,
      });
      if (newCategory) {
        return res.status(HttpCode.CREATED).json(newCategory);
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