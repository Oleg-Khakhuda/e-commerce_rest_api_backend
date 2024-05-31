import GenderCategories from "../model/genderCategory.js";

const addGenderCategory = async (body) => {
    const category = await GenderCategories.create(body);
    return category;
  };

const getGenderCategories = async () => {
    const result = await GenderCategories.find();
    return result;
};


export default {
    addGenderCategory,
    getGenderCategories,
};