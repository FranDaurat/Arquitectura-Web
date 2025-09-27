# 📚 eBook Market

Plataforma web para la **compra y venta de eBooks**, desarrollada como proyecto académico.
El objetivo es simular un marketplace donde los usuarios puedan navegar sobre el catálogo de libros digitales, adquirirlos de manera segura y, a su vez, ofrecer sus propios eBooks a la comunidad.

---

## 🚀 Funcionalidades

- 📖 **Catálogo de eBooks**
  Navegación y búsqueda de libros por título, autor o categoría.

- 🛒 **Compra de eBooks**
  Carrito de compras y proceso de checkout (simulado).

- 💾 **Biblioteca personal**
  Acceso a los eBooks adquiridos por cada usuario.

- ⭐ **Reseñas y valoraciones**
  Los usuarios pueden puntuar y dejar comentarios sobre los eBooks.

---

## 🛠️ Tecnologías utilizadas

- **Frontend**: HTML5, CSS3, JavaScript
- **Backend**:  Node.js con Express
- **Base de datos**: MySQL / PostgreSQL / SQLite
- **Control de versiones**: Git + GitHub

---

## 📂 Estructura del proyecto

### 📖 Catálogo de eBooks
- GET  /api/v1/ebooks
- GET  /api/v1/ebooks/:id
- GET  /api/v1/categories
- GET  /api/v1/ebooks/:id/related

### 🛒 Compra de eBooks (carrito + checkout simulado)
- GET    /api/v1/cart
- POST   /api/v1/cart
- PATCH  /api/v1/cart/items/:itemId
- DELETE /api/v1/cart/items/:itemId

- POST   /api/v1/checkout
- POST   /api/v1/checkout/confirm
- GET    /api/v1/orders/:orderId

### 💾 Biblioteca personal (sin descargas)
- GET    /api/v1/library
- POST   /api/v1/library/items
- PATCH  /api/v1/library/items/:itemId
- DELETE /api/v1/library/items/:itemId

- GET    /api/v1/library/tags
- GET    /api/v1/library/favorites


#### ⭐ Reseñas y valoraciones (anónimo)
- GET    /api/v1/ebooks/:id/reviews
- POST   /api/v1/ebooks/:id/reviews
- PATCH  /api/v1/reviews/:reviewId
- DELETE /api/v1/reviews/:reviewId

---