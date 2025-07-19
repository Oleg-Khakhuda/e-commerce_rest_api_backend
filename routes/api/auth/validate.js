import Joi from 'joi';
import { HttpCode } from '../../../lib/constants.js';

const authSchema = Joi.object({
  firstName: Joi.string().min(2).max(20),
  lastName: Joi.string().min(2).max(20),
  phone: Joi.string().min(10).max(20),
  email: Joi.string().email(),
  password: Joi.string().min(8).max(30).required(),
});

export const validateAuth = async (req, res, next) => {
  try {
    await authSchema.validateAsync(req.body);
  } catch (err) {
    console.log('err', err);
    return res.status(HttpCode.BAD_REQUEST).json({ message: err.message.replace(/"/g, '') });
  }
  next();
};
