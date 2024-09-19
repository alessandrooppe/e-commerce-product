const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(cors());

app.get('/api/products', async (req, res) => {
  try {
    const { limit = 10, skip = 0, search = '', category = '', minPrice = 0, maxPrice = 10000, sort = '' } = req.query;

    let apiUrl = `https://dummyjson.com/products/search?limit=${limit}&skip=${skip}`;

    if (search) {
      apiUrl += `&q=${encodeURIComponent(search)}`;
    }

    if (category) {
      apiUrl += `&category=${encodeURIComponent(category)}`;
    }
    
    if(sort) {
      if(sort.startsWith('-')) {
        apiUrl += `&sortBy=${sort.substring(1)}&order=desc`;
      }
      else {
        apiUrl += `&sortBy=${sort}&order=asc`;
      }
    }

    const response = await axios.get(apiUrl);
    let products = response.data.products;

    products = products.filter(
      (product) => product.price >= minPrice && product.price <= maxPrice
    );

    res.json({
      products,
      total: response.data.total,
    });
  } catch (error) {
    res.status(500).json({ error: 'Errore nel recupero dei prodotti' });
  }
});

app.get('/api/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axios.get(`https://dummyjson.com/products/${id}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Errore nel recupero del prodotto' });
  }
});

module.exports = app;