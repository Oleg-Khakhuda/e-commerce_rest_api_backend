import User from '../model/user.js';

const findById = async id => {
  return await User.findById(id);
};

const findByEmail = async email => {
  return await User.findOne({ email });
};

const findByVerifyToken = async verificationToken => {
  return await User.findOne({ verificationToken });
};

const create = async body => {
  const user = new User(body);
  return await user.save();
};

const updateToken = async (id, token) => {
  return await User.updateOne({ _id: id }, { token });
};

const updateVerify = async (id, status) => {
  return await User.updateOne({ _id: id }, { verify: status, verificationToken: null });
};

const updateAvatar = async (id, avatarUrl, idAvatarCloud = null) => {
  return await User.findByIdAndUpdate({ _id: id }, { avatarUrl, idAvatarCloud });
};

// const updateFile =  async (id, image, idFileCloud = null) => {
//   return await Category.findByIdAndUpdate(
//       { _id: id },
//       {image, idFileCloud}
//   )
// };

export default {
  findById,
  findByEmail,
  create,
  updateToken,
  updateAvatar,
  findByVerifyToken,
  updateVerify,
};
