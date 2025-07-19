import Category from '../model/category.js';
import GenderCategory from '../model/genderCategory.js';

const addCategory = async (categoryId, body) => {
  const category = await Category.create({
    ...body,
    genderCategory: categoryId,
  });
  return category;
};

const getCategoryById = async id => {
  const result = await Category.find({ _id: id });
  return result;
};

const updateFile = async (id, image, idFileCloud = null) => {
  return await Category.findByIdAndUpdate({ _id: id }, { image, idFileCloud });
};

const removeCategory = async categoryId => {
  const result = await Category.findOneAndDelete({ _id: categoryId });
  return result;
};

const updateCategory = async (categoryId, body) => {
  const result = await Category.findByIdAndUpdate(categoryId, { ...body }, { new: true });
  return result;
};

const getCategories = async () => {
  const result = await Category.find().sort({ updatedAt: 1 });
  return result;
};

const getCategoryBySlugGenderCat = async slug => {
  const category = await GenderCategory.find({ slug });
  // console.log(category);

  const categoryId = category[0].id;

  const total = await Category.countDocuments({ mainCategory: categoryId });

  let result = await Category.find({ genderCategory: categoryId }).populate({
    path: 'genderCategory',
    select: 'slug title',
  });
  return { total, items: result };
};

export default {
  addCategory,
  getCategoryById,
  removeCategory,
  updateCategory,
  getCategories,
  updateFile,
  getCategoryBySlugGenderCat,
};
