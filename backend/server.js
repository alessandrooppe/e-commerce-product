const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(cors()); // Permette le chiamate CORS dal frontend

// Endpoint per ottenere tutti i prodotti
app.get('/api/products', async (req, res) => {
  try {
    const { limit = 10, skip = 0 } = req.query;
    console.log(limit, skip);
    const response = await axios.get(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Errore nel recupero dei prodotti' });
  }
});

// Endpoint per ottenere i dettagli di un singolo prodotto
app.get('/api/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axios.get(`https://dummyjson.com/products/${id}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Errore nel recupero del prodotto' });
  }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server avviato su http://localhost:${PORT}`);
});