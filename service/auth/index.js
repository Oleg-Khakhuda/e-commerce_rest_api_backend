import Users from '../../repository/user.js';
import jwt from 'jsonwebtoken';
const SECRET_KEY = process.env.JWT_SECRET_KEY;

class AuthService {
  async isUserExist(email, phone) {
    const userEmail = await Users.findByEmail(email);
    // console.log('userEmail', userEmail);
    const userPhone = await Users.findByPhone(phone);
    // console.log('userPhone', userPhone);

    return !!userEmail || !!userPhone;
  }

  async create(body) {
    const { id, firstName, lastName, phone, email, token, role, avatarUrl, verificationToken } =
      await Users.create(body);
    return { id, firstName, lastName, phone, email, token, role, avatarUrl, verificationToken };
  }

  async getUser(email, password) {
    const user = await Users.findByEmail(email);

    const isValidPassword = await user?.isValidPassword(password);

    if (!isValidPassword || !user?.verify) {
      return null;
    }
    return user;
  }

  getToken(user) {
    const { id, email } = user;
    const payload = { id, email };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '8h' });
    return token;
  }

  async setToken(id, token) {
    await Users.updateToken(id, token);
  }

  async setSubscription(id, subscription) {
    await Users.setSubscription(id, subscription);
  }

  async removeUser(id) {
    const user = await Users.findOneAndDelete(id);
    return user;
  }
}

export default new AuthService();
