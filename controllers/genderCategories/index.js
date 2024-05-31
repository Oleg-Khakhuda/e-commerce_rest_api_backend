import repositoryGenderCategories from '../../repository/genderCategory.js'
import { HttpCode } from "../../lib/constants.js";

const getGenderCategories = async (req, res, next) => {
    try {
        const categories = await repositoryGenderCategories.getGenderCategories();
        if (categories) {
        return res.status(HttpCode.OK).json(categories);
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
    getGenderCategories,
}