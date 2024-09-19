const request = require('supertest');
const axios = require('axios');
const app = require('../server');

jest.mock('axios');

describe('Test API /api/products', () => {
  it('should return products with limit and skip parameters', async () => {
    const mockResponse = {
      data: {
        products: [
          { id: 1, title: 'Product 1', price: 100 },
          { id: 2, title: 'Product 2', price: 200 },
        ],
        total: 2,
      },
    };

    axios.get.mockResolvedValueOnce(mockResponse);

    const res = await request(app)
      .get('/api/products')
      .query({ limit: 2, skip: 0 });

    expect(res.statusCode).toBe(200);
    expect(res.body.products.length).toBe(2);
    expect(res.body.total).toBe(2);
    expect(res.body.products[0].title).toBe('Product 1');
  });

  it('should filter products by price range', async () => {
    const mockResponse = {
      data: {
        products: [
          { id: 1, title: 'Product 1', price: 100 },
          { id: 2, title: 'Product 2', price: 200 },
          { id: 3, title: 'Product 3', price: 300 },
        ],
        total: 3,
      },
    };

    axios.get.mockResolvedValueOnce(mockResponse);

    const res = await request(app)
      .get('/api/products')
      .query({ minPrice: 150, maxPrice: 250 });

    expect(res.statusCode).toBe(200);
    expect(res.body.products.length).toBe(1);
    expect(res.body.products[0].price).toBe(200);
  });

  it('should search products by name', async () => {
    const mockResponse = {
      data: {
        products: [
          { id: 1, title: 'Product 1', price: 100 },
          { id: 2, title: 'Product 2', price: 200 },
        ],
        total: 2,
      },
    };

    axios.get.mockResolvedValueOnce(mockResponse);

    const res = await request(app)
      .get('/api/products')
      .query({ search: 'Product 1' });

    expect(res.statusCode).toBe(200);
    expect(res.body.products.length).toBe(2);
    expect(res.body.products[0].title).toContain('Product 1');
  });

  it('should handle API errors', async () => {
    axios.get.mockRejectedValueOnce(new Error('API Error'));

    const res = await request(app).get('/api/products');

    expect(res.statusCode).toBe(500);
    expect(res.body.error).toBe('Errore nel recupero dei prodotti');
  });
});

describe('Test API /api/products/:id', () => {
  it('should return a single product by ID', async () => {
    const mockResponse = {
      data: { id: 1, title: 'Product 1', price: 100 },
    };

    axios.get.mockResolvedValueOnce(mockResponse);

    const res = await request(app).get('/api/products/1');

    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe('Product 1');
    expect(res.body.price).toBe(100);
  });

  it('should handle product not found errors', async () => {
    axios.get.mockRejectedValueOnce(new Error('Product not found'));

    const res = await request(app).get('/api/products/999');

    expect(res.statusCode).toBe(500);
    expect(res.body.error).toBe('Errore nel recupero del prodotto');
  });
});