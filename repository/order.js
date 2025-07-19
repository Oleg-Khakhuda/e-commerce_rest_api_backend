import Order from '../model/orders.js';
import User from '../model/user.js';

const addOrder = async body => {
  // console.log('body', body);

  const product = await Order.create(body);
  console.log('product', product);
  return product;
};

const bindOrderByUserId = async (guestOrders, userId) => {
  await Order.updateMany(
    { _id: { $in: guestOrders.map(order => order._id) } },
    { $set: { userId: userId, isGuest: false } },
  );
};

const getAllOrders = async () => {
  const orders = await Order.find({}).sort({ createdAt: -1 });

  return orders;
};

// const getAllOrders = async () => {
//   const orders = await Order.find({}).populate(
//     'products.productId', // Заміна productId на products.productId
//     'name color price image',
//   );
//   return orders;
// };

const getOrderById = async id => {
  const order = await Order.findById(id).populate(
    'userId',
    'email name phone avatarUrl idAvatarCloud',
  );
  return order;
};

const updateOrder = async (id, body) => {
  const order = await Order.findByIdAndUpdate(id, body, {
    new: true,
  }).populate('userId', 'email name phone avatarUrl idAvatarCloud');
  return order;
};

const deleteOrder = async id => {
  const order = await Order.findByIdAndDelete(id).populate(
    'userId',
    'email name phone avatarUrl idAvatarCloud',
  );
  return order;
};

const getOrdersByUserId = async userId => {
  console.log('userId', userId);
  const orders = await Order.find({ userId }).sort({ createdAt: -1 });
  return orders;
};

export default {
  addOrder,
  bindOrderByUserId,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
  getOrdersByUserId,
};
