const path = require('path');
const fs = require('fs');

const ordersPath = path.join(__dirname, '../data/orders.json');

function getOrders() {
  const data = fs.readFileSync(ordersPath, 'utf8');
  return JSON.parse(data);
}

exports.getOrderById = (req, res) => {
  try {
    const orders = getOrders();
    const order = orders.find(o => o.orderId === req.params.orderId);

    if (!order) {
      return res.status(404).json({ error: 'Orden no encontrada' });
    }

    res.json(order);
  } catch (err) {
    res.status(500).json({ error: 'Error al buscar la orden' });
  }
};
