import GenderCategories from '../model/genderCategory.js';

const addGenderCategory = async body => {
  const category = await GenderCategories.create(body);
  return category;
};

const getGenderCategories = async () => {
  const result = await GenderCategories.find().sort({ updatedAt: 1 });

  return result;
};

const getGenderCategoryById = async id => {
  const result = await GenderCategories.find({ _id: id });
  return result;
};

const removeGenderCategory = async categoryId => {
  const result = await GenderCategories.findOneAndDelete({ _id: categoryId });
  return result;
};

const updateGenderCategory = async (categoryId, body) => {
  const result = await GenderCategories.findByIdAndUpdate(categoryId, { ...body }, { new: true });
  return result;
};

const updateFile = async (id, image, idFileCloud = null) => {
  return await GenderCategories.findByIdAndUpdate({ _id: id }, { image, idFileCloud });
};

export default {
  addGenderCategory,
  getGenderCategories,
  getGenderCategoryById,
  removeGenderCategory,
  updateGenderCategory,
  updateFile,
};
