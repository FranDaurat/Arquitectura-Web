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

📖 Catálogo de eBooks
GET  /api/v1/ebooks                       # Listar (q, author, category, priceMin, priceMax, ratingMin, page, limit, sort)
GET  /api/v1/ebooks/:id                   # Detalle
GET  /api/v1/categories                   # Listar categorías
GET  /api/v1/ebooks/:id/related           # Recomendados (limit)

🛒 Compra de eBooks (carrito + checkout simulado)
GET    /api/v1/cart                       # Ver carrito (sesión anónima o cartId)
POST   /api/v1/cart                       # Agregar ítem        { ebookId, qty }
PATCH  /api/v1/cart/items/:itemId         # Cambiar cantidad    { qty }
DELETE /api/v1/cart/items/:itemId         # Quitar ítem

POST   /api/v1/checkout                   # Iniciar checkout  → { orderDraftId, total, items[] }
POST   /api/v1/checkout/confirm           # Confirmar pago    { orderDraftId }
GET    /api/v1/orders/:orderId            # Ver orden         → incluye tokens de descarga

💾 Biblioteca personal (sin descargas)
GET    /api/v1/library                    # Ver biblioteca de la sesión  → { items[] }
POST   /api/v1/library/items              # Agregar manualmente un eBook comprado  { ebookId, orderId }
PATCH  /api/v1/library/items/:itemId      # Actualizar metadatos          { favorite?, tags?, notes? }
DELETE /api/v1/library/items/:itemId      # Eliminar de la biblioteca

# Utilidades opcionales
GET    /api/v1/library/tags               # Listar tags usados en la biblioteca
GET    /api/v1/library/favorites          # Listar marcados como favoritos


⭐ Reseñas y valoraciones (anónimo)
GET    /api/v1/ebooks/:id/reviews         # Listar reseñas
POST   /api/v1/ebooks/:id/reviews         # Crear reseña        { rating: 1..5, comment, nickname? }
PATCH  /api/v1/reviews/:reviewId          # (Opcional) Editar   { rating?, comment? }
DELETE /api/v1/reviews/:reviewId          # (Opcional) Borrar
