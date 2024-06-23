import { HttpCode } from '../lib/constants.js';

const guard = role => async (req, res, next) => {
  const roleCurrentUser = req.user.role;
  if (roleCurrentUser !== role) {
    return res.status(HttpCode.FORBIDDEN).json({
      status: 'error',
      code: HttpCode.FORBIDDEN,
      message: 'Доступ заборонено!',
    });
  }
  next();
};

export default guard;
