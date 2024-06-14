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
    console.log(id, url, idFileCloud);
    return await Product.findByIdAndUpdate(
        { _id: id }, 
        { $push: {image: {url, idFileCloud}}
    })
};

const removeProduct = async (productId) => {
    const result = await Product.findOneAndDelete({ _id: productId });
    return result;
};

const updateProduct = async (productId ,body) => {
    const result = await Product.findByIdAndUpdate(
        productId,
        { ...body },
        { new: true } 
    );
    return result;
};

export default {
    addProduct,
    getProductById,
    updateFile,
    removeProduct,
    updateProduct,
};