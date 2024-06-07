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

const removeCategory = async (categoryId) => {
    const result = await Category.findOneAndDelete({ _id: categoryId });
    return result;
};

const updateCategory = async (categoryId, body) => {
    const result = await Category.findByIdAndUpdate(
      categoryId,
      { ...body },
      { new: true }
    );
    return result;
};

const getCategories = async () => {
    const result = await Category.find();
    return result;
};

export default {
    addCategory,
    getCategoryById,
    removeCategory,
    updateCategory,
    getCategories,
    updateFile
};