const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const products = [];

axios.get('https://example.com/api/products')
  .then(response => {
    products.push(...response.data);
  })
  .catch(error => {
    console.error(error);
  });

app.get('/api/products', (req, res) => {
  res.json(products);
});

app.get('/api/products/:id', (req, res) => {
  const productId = req.params.id;
  const product = products.find(product => product.id === productId);
  if (!product) {
    res.status(404).json({ message: 'Product not found' });
  } else {
    res.json(product);
  }
});

app.listen(3001, () => {
  console.log('Server listening on port 3001');
});