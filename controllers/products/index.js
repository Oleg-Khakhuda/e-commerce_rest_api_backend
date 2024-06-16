import repositoryProducts from "../../repository/product.js";
import { HttpCode } from "../../lib/constants.js";
import convert from "../../convert.json" assert { type: "json" };
import { CLOUD_PRODUCT_FOLDER } from "../../lib/constants.js";
import cloudStorage from '../../service/file-storage/cloud-storage.js';

const getAllProducts = async (req, res) => {
  try {
    const products = await repositoryProducts.getAllProducts();
        if (products) {
        return res.status(HttpCode.OK).json({
            status: "success", 
            code: HttpCode.OK, 
            products
        });
        }
  } catch (error) {
    res.status(HttpCode.NOT_FOUND).json({
      status: "error",
      code: HttpCode.NOT_FOUND,
      message: "Щось пішло не так",
      });
  }
};

const getProducts = async (req, res) => {
  try {
    // const {category: categoryId} = req.query;
    // const {genderCategory: genderCategoryId} = req.query;
    // console.log(req.query);
    const products = await repositoryProducts.listProducts(req.query)
    res.status(HttpCode.OK).json({ 
      status: 'success', 
      code: HttpCode.OK, 
      data: products 
    })

  } catch (error) {
    res.status(HttpCode.NOT_FOUND).json({
      status: "error",
      code: HttpCode.NOT_FOUND,
      message: error.message,
      });
  }
} 

const addProduct = async (req, res) => {
    try {
        const categoryId = req.body.category;
        const genderCategoryId = req.body.genderCategory;
        const files = req.files;
        const sizes = req.body.size;
        
        const text = req.body.name;
        const str = text.replace(/[\s-]/g, '_').toLowerCase();
        const newName = str.split('').map(char => convert[char] || char).join('');

        const moreSize = sizes.map((size) => size);
   
        const newProduct = await repositoryProducts.addProduct(
            categoryId, genderCategoryId, {
            ...req.body,
            size: moreSize,
            slug: newName
        });
        if (newProduct) {
            for(const file of files) {
              const path = file.path;
              const { fileUrl, returnedIdFileCloud } = await cloudStorage.save(CLOUD_PRODUCT_FOLDER, path, newProduct.id);
              await repositoryProducts.updateFile(newProduct.id, fileUrl, returnedIdFileCloud);
            }
            const result = await repositoryProducts.getProductById(newProduct.id);
            if (result) {
                return res.status(HttpCode.CREATED).json({
                    status: 'success',
                    code: HttpCode.OK,
                    result
                });
            };
      };
    } catch (error) {
      res.status(HttpCode.NOT_FOUND).json({
        status: "error",
        code: HttpCode.NOT_FOUND,
        message: "Щось пішло не так",
      });
    }
  };

  const getProductById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const product = await repositoryProducts.getProductById(id);
      if (product) {
        return res.status(HttpCode.OK).json({
          status: 'success',
          code: HttpCode.OK,
          product
      });
      };
    } catch (error) {
      res.status(HttpCode.NOT_FOUND).json({
        status: "error",
        code: HttpCode.NOT_FOUND,
        message: "Щось пішло не так",
      });
    }
};

const removeProduct = async (req, res, next) => {
  try {
      const { id } = req.params;
      const product = await repositoryProducts.removeProduct(id);
      if (product) {
        const images = product.image;
        for(let image of images) {
          await cloudStorage.removeFiles(image.idFileCloud);
          }
        await cloudStorage.removeFolder(CLOUD_PRODUCT_FOLDER, product.id);
        return res
            .status(HttpCode.OK)
            .json({ 
              status: "success", 
              code: HttpCode.OK,
              message: "Продукт успішно видалено" 
            });
      }
  } catch (error) {
      res.status(HttpCode.NOT_FOUND).json({
      status: "error",
      code: HttpCode.NOT_FOUND,
      message: "Щось пішло не так",
      });
    }
};

const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const files = req.files;
    const text = req.body.name;
    const str = text.replace(/[\s-]/g, '_').toLowerCase();
    const newName = str.split('').map(char => convert[char] || char).join('');

    const product = await repositoryProducts.getProductById(id);

    if (files && product) {     
          const updateProduct = await repositoryProducts.updateProduct(id, {
          ...req.body,
          slug: newName,
          });
          if (updateProduct) {
            for (const file of files) {
              const path = file.path;
              const {fileUrl, returnedIdFileCloud} = await cloudStorage.save(CLOUD_PRODUCT_FOLDER, path, product.id);
              await repositoryProducts.updateFile(product.id, fileUrl, returnedIdFileCloud)
            };
            const updateProduct = await repositoryProducts.getProductById(id) 
            return res.status(HttpCode.OK).json({
                status: "success", 
                code: HttpCode.OK, 
                updateProduct
            });
      }  
    }

    const updateProduct = await repositoryProducts.updateProduct(
      id, {...req.body, slug: newName}   
    );
    if (updateProduct) {
      return res.status(HttpCode.OK).json({
          status: "success", 
          code: HttpCode.OK, 
          updateProduct
      });
    }
  } catch (error) {
    res.status(HttpCode.NOT_FOUND).json({
      status: "error",
      code: HttpCode.NOT_FOUND,
      message: "Щось пішло не так",
    });
  }
};

export {
  getProducts,
  getAllProducts,
  addProduct,
  getProductById,
  removeProduct,
  updateProduct,
};