import GenderCategories from "../model/genderCategory.js";

const addGenderCategory = async (body) => {
    const category = await GenderCategories.create(body);
    return category;
  };

const getGenderCategories = async () => {
    const result = await GenderCategories.find();
    return result;
};

const getGenderCategoryById = async (id) => {
  const result = await GenderCategories.find({_id: id});
  return result;
};

const updateFile =  async (id, image, idFileCloud = null) => {
    return await GenderCategories.updateOne({ _id: id }, { image, idFileCloud })
  };
  

export default {
    addGenderCategory,
    getGenderCategories,
    getGenderCategoryById,
    updateFile,
};