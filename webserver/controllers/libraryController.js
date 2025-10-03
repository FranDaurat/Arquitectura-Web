const path = require('path');
const fs = require('fs');

const libraryPath = path.join(__dirname, '../data/library.json');

function getLibrary() {
  const data = fs.readFileSync(libraryPath, 'utf8');
  return JSON.parse(data);
}

exports.getLibrary = (req, res) => {
  try {
    const library = getLibrary();
    res.json(library);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener la biblioteca' });
  }
};
