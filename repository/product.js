import Category from "../model/category.js";
import Product from "../model/product.js";

const addProduct = async (categoryId, genderCategoryId, body) => {
    const product = await Product.create({ 
        ...body, 
        category: categoryId, 
        genderCategory: genderCategoryId
    });
    return product;
};

const getProductById = async (productId) => {
    const product = await Product.findOne({_id: productId});
    return product;
}

const updateFile =  async (id, url, idFileCloud = null) => {
    return await Product.findByIdAndUpdate(
        { _id: id }, 
        { $push: {image: {url, idFileCloud}}
    })
};

const removeProduct = async (productId) => {
    const result = await Product.findOneAndDelete({ _id: productId });
    return result;
};

export default {
    addProduct,
    getProductById,
    updateFile,
    removeProduct,
};