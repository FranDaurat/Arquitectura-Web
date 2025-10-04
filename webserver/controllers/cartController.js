const fs = require('fs');
const path = require('path');
const generateId = require('../utils/generateId');

const cartPath = path.join(__dirname, '../data/cart.json');

function getCart() {
  const data = fs.readFileSync(cartPath, 'utf8');
  return JSON.parse(data);
}

function saveCart(cart) {
  fs.writeFileSync(cartPath, JSON.stringify(cart, null, 2));
}

exports.getCart = (req, res) => {
  try {
    const cart = getCart();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener el carrito' });
  }
};

exports.addToCart = (req, res) => {
  try {
    const { title, price } = req.body;

    if (!title || !price) {
      return res.status(400).json({ error: 'Faltan datos del producto' });
    }

    const cart = getCart();
    const newItem = {
      id: generateId(8),
      title,
      price
    };

    cart.items.push(newItem);
    saveCart(cart);

    res.status(201).json({ message: 'Producto agregado al carrito', item: newItem });
  } catch (err) {
    res.status(500).json({ error: 'Error al agregar producto al carrito' });
  }
};


exports.deleteItem = (req, res) => {
  try {
    const { itemId } = req.params;

    let cart = getCart();
    const initialLength = cart.items.length;
    cart.items = cart.items.filter(i => i.id !== itemId);

    if (cart.items.length === initialLength) {
      return res.status(404).json({ error: 'Ítem no encontrado' });
    }

    saveCart(cart);
    res.json({ message: 'Ítem eliminado correctamente' });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar el ítem del carrito' });
  }
};
