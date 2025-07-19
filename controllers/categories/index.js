import repositoryCategories from '../../repository/category.js';
import { HttpCode } from '../../lib/constants.js';
import convert from '../../convert.json' assert { type: 'json' };
import cloudStorage from '../../service/file-storage/cloud-storage.js';
import { CLOUD_CATEGORY_FOLDER } from '../../lib/constants.js';

const addCategory = async (req, res) => {
  try {
    const file = req.file;
    const title = req.body.title;
    const genderCategoryId = req.body.genderCategory;
    const str = title.replace(/[\s-]/g, '_').toLowerCase();
    const newName = str
      .split('')
      .map(char => convert[char] || char)
      .join('');

    const newCategory = await repositoryCategories.addCategory(genderCategoryId, {
      ...req.body,
      slug: newName,
      image: file.path,
    });
    if (newCategory) {
      const { fileUrl, returnedIdFileCloud } = await cloudStorage.save(
        CLOUD_CATEGORY_FOLDER,
        file.path,
        newCategory.id,
      );
      await repositoryCategories.updateFile(newCategory.id, fileUrl, returnedIdFileCloud);
      const result = await repositoryCategories.getCategoryById(newCategory.id);
      if (fileUrl && result) {
        return res.status(HttpCode.CREATED).json({
          status: 'success',
          code: HttpCode.OK,
          message: 'Категорію успішно додано',
          result,
        });
      }
    }
  } catch (error) {
    res.status(HttpCode.NOT_FOUND).json({
      status: 'error',
      code: HttpCode.NOT_FOUND,
      message: 'Щось пішло не так',
    });
  }
};

const getCategoryById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const category = await repositoryCategories.getCategoryById(id);
    if (category) {
      return res.status(HttpCode.OK).json({ status: 'success', code: HttpCode.OK, category });
    }
  } catch (error) {
    res.status(HttpCode.NOT_FOUND).json({
      status: 'error',
      code: HttpCode.NOT_FOUND,
      message: 'Щось пішло не так',
    });
  }
};

const removeCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const category = await repositoryCategories.removeCategory(id);
    if (category) {
      const removeFiles = await cloudStorage.removeFiles(category.idFileCloud);
      if (removeFiles) {
        await cloudStorage.removeFolder(CLOUD_CATEGORY_FOLDER, category.id);
      }
      return res.status(HttpCode.OK).json({
        status: 'success',
        code: HttpCode.OK,
        message: 'Категорію успішно видалено',
        category,
      });
    }
  } catch (error) {
    res.status(HttpCode.NOT_FOUND).json({
      status: 'error',
      code: HttpCode.NOT_FOUND,
      message: 'Щось пішло не так',
    });
  }
};

const updateCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const file = req.file;
    const text = req.body.title;
    const genderCategoryId = req.body.genderCategory;
    const str = text.replace(/[\s-]/g, '_').toLowerCase();
    const newName = str
      .split('')
      .map(char => convert[char] || char)
      .join('');

    const category = await repositoryCategories.getCategoryById(id);

    if (file && category) {
      await cloudStorage.removeFiles(category[0].idFileCloud);
      const { fileUrl, returnedIdFileCloud } = await cloudStorage.save(
        CLOUD_CATEGORY_FOLDER,
        file.path,
        category[0].id,
      );
      await repositoryCategories.updateFile(category[0].id, fileUrl, returnedIdFileCloud);
      const updateCategory = await repositoryCategories.updateCategory(id, {
        ...req.body,
        slug: newName,
        image: fileUrl,
        genderCategory: genderCategoryId,
      });
      if (updateCategory) {
        return res.status(HttpCode.OK).json({
          status: 'success',
          code: HttpCode.OK,
          message: 'Категорію успішно оновлено',
          updateCategory,
        });
      }
    }

    const updateCategory = await repositoryCategories.updateCategory(id, {
      ...req.body,
      slug: newName,
      genderCategory: genderCategoryId,
    });
    if (updateCategory) {
      return res.status(HttpCode.OK).json({
        status: 'success',
        code: HttpCode.OK,
        message: 'Категорію успішно оновлено',
        updateCategory,
      });
    }
  } catch (error) {
    res.status(HttpCode.NOT_FOUND).json({
      status: 'error',
      code: HttpCode.NOT_FOUND,
      message: 'Щось пішло не так',
    });
  }
};

const getCategories = async (req, res, next) => {
  try {
    const categories = await repositoryCategories.getCategories();
    if (categories) {
      return res.status(HttpCode.OK).json({
        status: 'success',
        code: HttpCode.OK,
        categories,
      });
    }
  } catch (error) {
    res.status(HttpCode.NOT_FOUND).json({
      status: 'error',
      code: HttpCode.NOT_FOUND,
      message: 'Щось пішло не так',
    });
  }
};

const getCategoryBySlugGenderCat = async (req, res, next) => {
  try {
    const { slug: slug } = req.params;

    const result = await repositoryCategories.getCategoryBySlugGenderCat(slug);
    if (result) {
      return res.status(HttpCode.OK).json({ status: 'success', code: HttpCode.OK, result });
    }
  } catch (error) {
    res.status(HttpCode.NOT_FOUND).json({
      status: 'error',
      code: HttpCode.NOT_FOUND,
      message: 'Щось пішло не так',
    });
  }
};

export {
  addCategory,
  getCategoryById,
  removeCategory,
  updateCategory,
  getCategories,
  getCategoryBySlugGenderCat,
};
