const path = require('path');
const fs = require('fs');
const generateId = require('../utils/generateId');

const reviewsPath = path.join(__dirname, '../data/reviews.json');

function getReviews() {
  const data = fs.readFileSync(reviewsPath, 'utf8');
  return JSON.parse(data);
}

function saveReviews(reviews) {
  fs.writeFileSync(reviewsPath, JSON.stringify(reviews, null, 2));
}

exports.addReview = (req, res) => {
  try {
    const ebookId = req.params.id;
    const { user, comment, rating } = req.body;

    // Validaciones básicas
    if (!user || !comment || !rating) {
      return res.status(400).json({ error: 'Faltan datos obligatorios' });
    }

    if (typeof rating !== 'number' || rating < 1 || rating > 5) {
      return res.status(400).json({ error: 'El rating debe ser un número entre 1 y 5' });
    }

    const reviews = getReviews();

    const nuevaReview = {
      id: generateId(10),
      ebookId,
      user,
      comment,
      rating,
      date: new Date().toISOString()
    };

    reviews.push(nuevaReview);
    saveReviews(reviews);

    res.status(201).json({ message: 'Reseña agregada correctamente', review: nuevaReview });

  } catch (err) {
    console.error('Error al guardar la review:', err);
    res.status(500).json({ error: 'Error interno al guardar la reseña' });
  }
};

exports.getReviewsByEbook = (req, res) => {
  try {
    const ebookId = req.params.id;
    const reviews = getReviews();

    const filtered = reviews.filter(r => r.ebookId === ebookId);

    res.json(filtered);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener las reseñas' });
  }
};
