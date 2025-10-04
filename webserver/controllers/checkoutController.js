const path = require('path');
const fs = require('fs');
const generateId = require('../utils/generateId');

const cartPath = path.join(__dirname, '../data/cart.json');
const ordersPath = path.join(__dirname, '../data/orders.json');

function getCart() {
  const data = fs.readFileSync(cartPath, 'utf8');
  return JSON.parse(data);
}

function saveCart(cart) {
  fs.writeFileSync(cartPath, JSON.stringify(cart, null, 2));
}

function getOrders() {
  const data = fs.readFileSync(ordersPath, 'utf8');
  return JSON.parse(data);
}

function saveOrders(orders) {
  fs.writeFileSync(ordersPath, JSON.stringify(orders, null, 2));
}

exports.checkout = (req, res) => {
  try {
    const cart = getCart();

    if (!cart.items || cart.items.length === 0) {
      return res.status(400).json({ error: 'El carrito está vacío' });
    }

    const total = cart.items.reduce((acc, item) => acc + item.price, 0);

    res.json({
      message: 'Revisá tu pedido antes de confirmar',
      items: cart.items,
      total
    });

  } catch (err) {
    console.error('Error al procesar el checkout:', err);
    res.status(500).json({ error: 'Error interno al procesar el checkout' });
  }
};

exports.confirmCheckout = (req, res) => {
  try {
    const cart = getCart();
    if (!cart.items || cart.items.length === 0) {
      return res.status(400).json({ error: 'El carrito está vacío' });
    }

    const newOrder = {
      id: generateId(10),
      items: cart.items,
      date: new Date().toISOString()
    };

    const orders = getOrders();
    orders.push(newOrder);
    saveOrders(orders);

    saveCart({ items: [] });

    res.status(201).json({
      message: 'Compra confirmada',
      order: newOrder
    });

  } catch (err) {
    console.error('Error al confirmar el checkout:', err);
    res.status(500).json({ error: 'Error interno al confirmar el checkout' });
  }
};
