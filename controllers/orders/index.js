import repositoryOrder from '../../repository/order.js';
import { HttpCode } from '../../lib/constants.js';
import { sendTelegramNotification } from '../../service/telegram/index.js';

const addOrder = async (req, res) => {
  try {
    // console.log(req.body);

    const userId = req.body.userId || null;
    const { user, products, totalPrice, totalQuantity, address } = req.body;

    const isGuest = !userId;

    const order = await repositoryOrder.addOrder({
      products: products.map(product => ({
        productId: product.productId,
        size: product.size,
        name: product.name,
        color: product.color,
        image: product.image,
        quantity: product.quantity,
        price: product.price,
      })),
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
      },
      address: {
        department: address.department,
        city: address.city,
        region: address.region,
        provider: address.provider,
      },
      // paymentMethod,
      // subtotal,
      // tax,
      // shippingCost,
      totalPrice,
      totalQuantity,
      isGuest,
      userId,
    });

    if (order) {
      await sendTelegramNotification(order);
    }

    // console.log('order', order);
    res.status(HttpCode.CREATED).json({
      status: 'success',
      code: HttpCode.CREATED,
      message: 'Замовлення успішно відправлено',
      order,
    });
  } catch (error) {
    res.status(HttpCode.NOT_FOUND).json({
      status: 'error',
      code: HttpCode.NOT_FOUND,
      message: error.message,
    });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await repositoryOrder.getAllOrders();
    res.status(HttpCode.OK).json({
      status: 'success',
      code: HttpCode.OK,
      orders,
    });
  } catch (error) {
    res.status(HttpCode.NOT_FOUND).json({
      status: 'error',
      code: HttpCode.NOT_FOUND,
      message: error.message,
    });
  }
};

const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await repositoryOrder.getOrderById(id);
    if (!order) {
      return res.status(HttpCode.NOT_FOUND).json({
        status: 'error',
        code: HttpCode.NOT_FOUND,
        message: 'Not found',
      });
    }
    res.status(HttpCode.OK).json({
      status: 'success',
      code: HttpCode.OK,
      order,
    });
  } catch (error) {
    res.status(HttpCode.NOT_FOUND).json({
      status: 'error',
      code: HttpCode.NOT_FOUND,
      message: error.message,
    });
  }
};

const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await repositoryOrder.updateOrder(id, req.body);
    if (!order) {
      return res.status(HttpCode.NOT_FOUND).json({
        status: 'error',
        code: HttpCode.NOT_FOUND,
        message: 'Not found',
      });
    }
    res.status(HttpCode.OK).json({
      status: 'success',
      code: HttpCode.OK,
      order,
    });
  } catch (error) {
    res.status(HttpCode.NOT_FOUND).json({
      status: 'error',
      code: HttpCode.NOT_FOUND,
      message: error.message,
    });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await repositoryOrder.deleteOrder(id);
    if (!order) {
      return res.status(HttpCode.NOT_FOUND).json({
        status: 'error',
        code: HttpCode.NOT_FOUND,
        message: 'Not found',
      });
    }
    res.status(HttpCode.OK).json({
      status: 'success',
      code: HttpCode.OK,
      order,
    });
  } catch (error) {
    res.status(HttpCode.NOT_FOUND).json({
      status: 'error',
      code: HttpCode.NOT_FOUND,
      message: error.message,
    });
  }
};

const getOrdersByUserId = async (req, res) => {
  try {
    const { id } = req.params;

    const orders = await repositoryOrder.getOrdersByUserId(id);
    if (!orders) {
      return res.status(HttpCode.NOT_FOUND).json({
        status: 'error',
        code: HttpCode.NOT_FOUND,
        message: 'Not found',
      });
    }
    res.status(HttpCode.OK).json({
      status: 'success',
      code: HttpCode.OK,
      orders,
    });
  } catch (error) {
    res.status(HttpCode.NOT_FOUND).json({
      status: 'error',
      code: HttpCode.NOT_FOUND,
      message: error.message,
    });
  }
};

const getOrdersByPhone = async (req, res) => {
  try {
    const { phone } = req.params;
    const orders = await repositoryOrder.getOrdersByPhone(phone);
    if (!orders) {
      return res.status(HttpCode.NOT_FOUND).json({
        status: 'error',
        code: HttpCode.NOT_FOUND,
        message: 'Not found',
      });
    }
    res.status(HttpCode.OK).json({
      status: 'success',
      code: HttpCode.OK,
      data: {
        orders,
      },
    });
  } catch (error) {
    res.status(HttpCode.NOT_FOUND).json({
      status: 'error',
      code: HttpCode.NOT_FOUND,
      message: error.message,
    });
  }
};

export {
  addOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
  getOrdersByUserId,
  getOrdersByPhone,
};
