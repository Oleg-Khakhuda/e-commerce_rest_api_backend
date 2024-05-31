import GenderCategories from "../model/genderCategory.js";

const getGenderCategories = async () => {
    const result = await GenderCategories.find();
    return result;
};

export default {
    getGenderCategories,
};