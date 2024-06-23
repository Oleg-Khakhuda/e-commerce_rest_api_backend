import repositoryUsers from '../../repository/user.js';
import { HttpCode } from '../../lib/constants.js';
import cloudStorage from '../../service/file-storage/cloud-storage.js';
import { EmailService, SenderNodemailer } from '../../service/email/index.js';
import { CLOUD_AVATAR_FOLDER } from '../../lib/constants.js';

const uploadAvatar = async (req, res, next) => {
  const file = req.file;
  const { id: id } = req.user;

  await cloudStorage.removeFiles(req.user.idAvatarCloud);
  const { fileUrl, returnedIdFileCloud } = await cloudStorage.save(
    CLOUD_AVATAR_FOLDER,
    file.path,
    id,
  );
  const result = await repositoryUsers.updateAvatar(id, fileUrl, returnedIdFileCloud);
  res.status(HttpCode.OK).json({ status: 'success', code: HttpCode.OK, data: result });
};

const verifyUser = async (req, res, next) => {
  try {
    const verifyToken = req.params.verificationToken;
    const userFromToken = await repositoryUsers.findByVerifyToken(verifyToken);
    if (userFromToken) {
      await repositoryUsers.updateVerify(userFromToken.id, true);
      return res.status(HttpCode.OK).json({
        status: 'success',
        code: HttpCode.OK,
        data: { message: 'Verification email sent' },
      });
    }
  } catch (error) {
    res.status(HttpCode.BAD_REQUEST).json({
      status: 'error',
      code: HttpCode.BAD_REQUEST,
      message: error.message,
    });
  }
};

const repeatEmailForVerifyUser = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await repositoryUsers.findByEmail(email);
    if (user) {
      const { email, name, verificationToken } = user;
      const emailService = new EmailService(process.env.NODE_ENV, new SenderNodemailer());

      const isSend = await emailService.sendVerifyEmail(email, name, verificationToken);
      if (isSend) {
        return res.status(HttpCode.OK).json({
          status: 'success',
          code: HttpCode.OK,
          data: { message: 'Success' },
        });
      }
      res.status(HttpCode.SE).json({
        status: 'error',
        code: HttpCode.SE,
        message: 'missing required field email',
      });
    }
  } catch (error) {
    res.status(HttpCode.NOT_FOUND).json({
      status: 'error',
      code: HttpCode.NOT_FOUND,
      message: 'User with email not found',
    });
  }
};

export { uploadAvatar, verifyUser, repeatEmailForVerifyUser };
