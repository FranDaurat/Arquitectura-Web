const path = require('path');
const fs = require('fs');
const generateId = require('../utils/generateId');

const libraryPath = path.join(__dirname, '../data/library.json');

function getLibrary() {
  const data = fs.readFileSync(libraryPath, 'utf8');
  return JSON.parse(data);
}

function saveLibrary(library) {
  fs.writeFileSync(libraryPath, JSON.stringify(library, null, 2));
}

exports.getLibrary = (req, res) => {
  try {
    const library = getLibrary();
    res.json(library);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener la biblioteca' });
  }
};

exports.addLibraryItem = (req, res) => {
  try {
    const { ebookId, tags, notes, favorite } = req.body;

    if (!ebookId) {
      return res.status(400).json({ error: 'Falta el ID del ebook' });
    }

    const library = getLibrary();
    const newItem = {
      id: generateId(10),
      ebookId,
      tags: tags || [],
      notes: notes || '',
      favorite: favorite || false
    };

    library.push(newItem);
    saveLibrary(library);

    res.status(201).json({ message: 'Item agregado a la biblioteca', item: newItem });

  } catch (err) {
    res.status(500).json({ error: 'Error al agregar el item a la biblioteca' });
  }
};

exports.updateLibraryItem = (req, res) => {
  try {
    const { itemId } = req.params;
    const updates = req.body;

    const library = getLibrary();
    const itemIndex = library.findIndex(i => i.id === itemId);

    if (itemIndex === -1) {
      return res.status(404).json({ error: 'Item no encontrado en la biblioteca' });
    }

    const updatedItem = { ...library[itemIndex], ...updates };
    library[itemIndex] = updatedItem;
    saveLibrary(library);

    res.json({ message: 'Item de la biblioteca actualizado', item: updatedItem });

  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar el item de la biblioteca' });
  }
};

exports.removeLibraryItem = (req, res) => {
  try {
    const { itemId } = req.params;
    const library = getLibrary();
    const newLibrary = library.filter(i => i.id !== itemId);

    if (library.length === newLibrary.length) {
      return res.status(404).json({ error: 'Item no encontrado en la biblioteca' });
    }

    saveLibrary(newLibrary);
    res.json({ message: 'Item eliminado de la biblioteca' });

  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar el item de la biblioteca' });
  }
};

exports.getLibraryTags = (req, res) => {
  try {
    const library = getLibrary();
    const allTags = library.flatMap(item => item.tags);
    const uniqueTags = [...new Set(allTags)];
    res.json(uniqueTags);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener los tags de la biblioteca' });
  }
};

exports.getLibraryFavorites = (req, res) => {
  try {
    const library = getLibrary();
    const favorites = library.filter(item => item.favorite);
    res.json(favorites);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener los favoritos de la biblioteca' });
  }
};
