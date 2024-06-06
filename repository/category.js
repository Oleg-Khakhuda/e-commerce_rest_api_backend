import Category from '../model/category.js';

const addCategory = async (categoryId, body) => {
    const category = await Category.create({
        ...body,
        genderCategory: categoryId,
    });
    return category;
};


const getCategoryById = async (id) => {
    const result = await Category.find({_id: id});
    return result;
  };

const updateFile =  async (id, image, idFileCloud = null) => {
    return await Category.updateOne(
        { _id: id }, 
        {image, idFileCloud}
    )
  };

export default {
    addCategory,
    getCategoryById,
    updateFile
};