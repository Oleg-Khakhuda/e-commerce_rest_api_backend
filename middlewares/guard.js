import repositoryUsers from '../repository/user.js';
import jwt from 'jsonwebtoken';
import { HttpCode } from '../lib/constants.js';
const SECRET_KEY = process.env.JWT_SECRET_KEY;

const verifyToken = token => {
  try {
    const verify = jwt.verify(token, SECRET_KEY);
    return !!verify;
  } catch (error) {
    return false;
  }
};

const guard = async (req, res, next) => {
  const authorization = req?.body?.headers?.Authorization?.split(' ')[1];
  const token = authorization || req.get('authorization')?.split(' ')[1];
  // console.log('authorization', authorization);
  // console.log('token', token);

  const isValidToken = verifyToken(token);
  // console.log('isValidToken', isValidToken);
  if (!isValidToken) {
    return res.status(HttpCode.UNAUTHORIZED).json({
      status: 'error',
      code: HttpCode.UNAUTHORIZED,
      message: 'Not authorized',
    });
  }
  const payload = jwt.decode(token);
  const user = await repositoryUsers.findById(payload.id);

  if (!user || user.token !== token) {
    return res.status(HttpCode.UNAUTHORIZED).json({
      status: 'error',
      code: HttpCode.UNAUTHORIZED,
      message: 'Not authorized',
    });
  }
  req.user = user;
  next();
};

export default guard;
