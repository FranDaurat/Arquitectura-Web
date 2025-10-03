const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

app.use('/api/v1/ebooks', require('./routes/ebooks'));
app.use('/api/v1/cart', require('./routes/cart'));
app.use('/api/v1/checkout', require('./routes/checkout'));
app.use('/api/v1/orders', require('./routes/orders'));
app.use('/api/v1/library', require('./routes/library'));
app.use('/api/v1/reviews', require('./routes/reviews'));


app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});