import repositoryCategories from '../../repository/category.js'
import { HttpCode } from "../../lib/constants.js";
import convert from "../../convert.json" assert { type: "json" };
import cloudStorage from "../../service/file-storage/cloud-storage.js";
import { CLOUD_CATEGORY_FOLDER } from "../../lib/constants.js";

const addCategory = async (req, res) => {
    try {
        const file = req.file;
        const title = req.body.title;
        const genderCategoryId = req.body.genderCategory;
        const str = title.replace(/[\s-]/g, '_').toLowerCase();
        const newName = str.split('').map(char => convert[char] || char).join('');

      const newCategory = await repositoryCategories.addCategory(genderCategoryId, {
        ...req.body,
        slug: newName,
        image: file.path
      });
      if (newCategory) {
        const {fileUrl, returnedIdFileCloud} = await cloudStorage.save(CLOUD_CATEGORY_FOLDER, file.path, newCategory.id)
        await repositoryCategories.updateFile(newCategory.id, fileUrl, returnedIdFileCloud)
        const result = await repositoryCategories.getCategoryById(newCategory.id);
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

export {
    addCategory,
}