const fs = require('fs');
const path = require('path');
const generateId = require('../utils/generateId');

const cartPath = path.join(__dirname, '../data/cart.json');

function getCart() {
  const data = fs.readFileSync(cartPath, 'utf8');
  return JSON.parse(data);
}

function getEbooks() {
  const ebooksPath = path.join(__dirname, '../data/ebooks.json');
  const data = fs.readFileSync(ebooksPath, 'utf8');
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
    const { ebookId, quantity } = req.body;

    if (!ebookId || !quantity) {
      return res.status(400).json({ error: 'Faltan ebookId o quantity' });
    }

    const ebooks = getEbooks();
    const ebookToAdd = ebooks.find(e => e.id === ebookId);

    if (!ebookToAdd) {
      return res.status(404).json({ error: 'El ebook no existe' });
    }

    const cart = getCart();
    const existingItemIndex = cart.items.findIndex(item => item.ebookId === ebookId);

    if (existingItemIndex > -1) {
      cart.items[existingItemIndex].qty += quantity;
    } else {
      const newItem = {
        id: generateId(8),
        ebookId: ebookToAdd.id,
        title: ebookToAdd.title,
        price: ebookToAdd.price,
        qty: quantity
      };
      cart.items.push(newItem);
    }

    saveCart(cart);

    res.status(201).json({ message: 'Producto agregado al carrito', cart });

  } catch (err) {
    console.error('Error al agregar producto al carrito:', err);
    res.status(500).json({ error: 'Error interno al agregar producto al carrito' });
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