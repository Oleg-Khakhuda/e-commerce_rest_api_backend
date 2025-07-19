import axios from 'axios';

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

// Функція для відправки повідомлення в Telegram
export const sendTelegramNotification = async order => {
  try {
    // Формуємо текст повідомлення
    let message = `🛒 *Вітаю! Нове замовлення* 🛒\n\n`;
    message += `📋 *Номер замовлення:* ${order.orderNumber}\n\n`;

    message += `📦 *Товари:*\n\n`;
    order.products.forEach(item => {
      message += `🖼️ [Фото](${item.image})\n`;
      message += `*Назва:* ${item.name}\n`;
      message += `*ID:* ${item.productId}\n`;
      message += `*Розмір:* ${item.size}\n`;
      message += `*Колір:* ${item.color}\n`;
      message += `*Кількість:* ${item.quantity} шт.\n`;
      message += `*Ціна:* ${item.price} грн.\n\n`;
    });

    message += `*Клієнт:* \n`;
    message += `👤 *Ім'я:* ${order.user.firstName}\n`;
    message += `👤 *Призвище:* ${order.user.lastName}\n`;
    message += `📞 *Телефон:* ${order.user.phone}\n`;

    message += `\n🏠 *Адреса доставки:* \n`;
    message += `🚚 *Постачальник:* ${order.address.provider}\n`;
    message += `🏙️ *Місто:* ${order.address.city}\n`;
    message += `🌍 *Область:* ${order.address.region}\n`;
    message += `📦 *Відділення:* ${order.address.department}\n`;

    message += `\n💰 *Сума:* ${order.totalPrice} грн.\n`;

    // Відправляємо повідомлення через Telegram Bot API
    await axios.post(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      chat_id: TELEGRAM_CHAT_ID,
      text: message,
      parse_mode: 'Markdown',
    });

    console.log('Повідомлення успішно відправлено в Telegram');
  } catch (error) {
    console.error('Помилка при відправці повідомлення в Telegram:', error.message);
  }
};
