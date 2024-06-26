import Product from "../model/product.js";

const getAllProducts = async () => {
    const total = await Product.find().countDocuments();
    const data = await Product.find().sort({createdAt: -1});
    return {total, data};
};

const listProducts = async ({
    sortBy, 
    sortByDesc, 
    filter, 
    limit = 10, 
    skip = 0
}) => {    
    const total = await Product.find().countDocuments();
    let result = Product.find();

    const sortCriteria = sort(sortBy, sortByDesc);
   
    if (filter) {
        result = result.select(filter.split('|').join(' '))
    }

    result = await result.sort(sortCriteria || {createdAt: -1}).limit(Number(limit)).skip(Number(skip))
      
    return {total, limit, products: result}
};

const listProductsByCategory = async (id, {
    sortBy, 
    sortByDesc, 
    filter, 
    limit = 10, 
    skip = 0
}) => {
    const total = await Product.find({category: id}).countDocuments();
    let result = Product.find({category: id});

    const sortCriteria = sort(sortBy, sortByDesc);
   
    if (filter) {
        result = result.select(filter.split('|').join(' '))
    }

    result = await result.sort(sortCriteria || {createdAt: -1}).limit(Number(limit)).skip(Number(skip));
      
    return {total, limit, products: result};
};

const listProductsByGenderCategory = async (id, {
    sortBy, 
    sortByDesc, 
    filter, 
    limit = 10, 
    skip = 0
}) => {
    const total = await Product.find({genderCategory: id}).countDocuments();
    let result = Product.find({genderCategory: id});

    const sortCriteria = sort(sortBy, sortByDesc);
   
    if (filter) {
        result = result.select(filter.split('|').join(' '))
    }

    result = await result.sort(sortCriteria || {createdAt: -1}).limit(Number(limit)).skip(Number(skip));
      
    return {total, limit, products: result};
};

const sort = (sortBy, sortByDesc) => {
    // const sortCriteria = sortBy ? { [sortBy]: sortByDesc ? -1 : 1 } : null;
    let sortCriteria = null;
    if (sortBy) {
        sortCriteria = { [`${sortBy}`]: 1 }
    }
    if (sortByDesc) {
        sortCriteria = { [`${sortByDesc}`]: -1 }
    }
    return sortCriteria;
}

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
};


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

const updateProduct = async (productId ,body) => {
    const result = await Product.findByIdAndUpdate(
        productId,
        { ...body },
        { new: true } 
    );
    return result;
};

export default {
    listProducts,
    listProductsByCategory,
    listProductsByGenderCategory,
    getAllProducts,
    addProduct,
    getProductById,
    updateFile,
    removeProduct,
    updateProduct,
};