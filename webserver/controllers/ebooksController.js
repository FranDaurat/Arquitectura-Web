const path = require('path');
const fs = require('fs');

const ebooksPath = path.join(__dirname, '../data/ebooks.json');

function getEbooks() {
  const data = fs.readFileSync(ebooksPath, 'utf8');
  return JSON.parse(data);
}

exports.getAllEbooks = (req, res) => {
  try {
    const ebooks = getEbooks();
    res.json(ebooks);
  } catch (err) {
    res.status(500).json({ error: 'Error al leer los ebooks' });
  }
};

exports.getEbookById = (req, res) => {
  try {
    const ebooks = getEbooks();
    const ebook = ebooks.find(e => e.id === req.params.id);

    if (!ebook) {
      return res.status(404).json({ error: 'eBook no encontrado' });
    }

    res.json(ebook);
  } catch (err) {
    res.status(500).json({ error: 'Error al buscar el ebook' });
  }
};

exports.getCategories = (req, res) => {
  try {
    const ebooks = getEbooks();
    const categories = [...new Set(ebooks.map(e => e.category))];
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener las categorías' });
  }
};

exports.getRelatedEbooks = (req, res) => {
  try {
    const ebooks = getEbooks();
    const ebookActual = ebooks.find(e => e.id === req.params.id);

    if (!ebookActual) {
      return res.status(404).json({ error: 'eBook no encontrado' });
    }

    const relacionados = ebooks.filter(
      e => e.category === ebookActual.category && e.id !== ebookActual.id
    );

    res.json(relacionados);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener ebooks relacionados' });
  }
};
