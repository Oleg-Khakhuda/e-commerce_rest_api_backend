import authService from '../../service/auth/index.js';
import { EmailService, SenderNodemailer } from '../../service/email/index.js';
import { HttpCode } from '../../lib/constants.js';

const registration = async (req, res, next) => {
  try {
    const { email } = req.body;
    const isUserExist = await authService.isUserExist(email);

    if (isUserExist) {
      res.status(HttpCode.CONFLICT).json({
        status: 'error',
        code: HttpCode.CONFLICT,
        message: 'Користувач з таким email вже існує',
      });
    }

    const userData = await authService.create(req.body);
    const emailService = new EmailService(process.env.NODE_ENV, new SenderNodemailer());

    const isSend = await emailService.sendVerifyEmail(
      email,
      userData.name,
      userData.verificationToken,
    );
    delete userData.verificationToken;

    res.status(HttpCode.CREATED).json({
      status: 'success',
      code: HttpCode.CREATED,
      data: { ...userData, isSendEmailVerify: isSend },
    });
  } catch (error) {
    res.status(HttpCode.NOT_FOUND).json({
      status: 'error',
      code: HttpCode.NOT_FOUND,
      message: error.message,
    });
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await authService.getUser(email, password);
  if (!user) {
    res.status(HttpCode.UNAUTHORIZED).json({
      message: 'Invalid credentials',
    });
  }
  const token = authService.getToken(user);
  await authService.setToken(user.id, token);
  res.status(HttpCode.OK).json({ status: 'success', code: HttpCode.OK, data: { token } });
};

const logout = async (req, res, next) => {
  await authService.setToken(req.user.id, null);
  res.status(HttpCode.NO_CONTENT).json({ status: 'success', code: HttpCode.OK, data: {} });
};

const currentUser = async (req, res, next) => {
  const { email } = req.user;
  res.status(HttpCode.OK).json({
    status: 'success',
    code: HttpCode.OK,
    data: { email },
  });
};

export { registration, login, logout, currentUser };
