import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Product } from '../models/product';

export interface ProductResponse {
  limit: number;
  products: Product[];
  skip: number;
  total: number;
}


export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5001/api' }), 
  endpoints: (builder) => ({
    getProducts: builder.query<ProductResponse, { 
      limit: number; 
      skip: number; 
      search?: string; 
      category?: string; 
      minPrice?: number; 
      maxPrice?: number; 
      sort?: string }
      >({
      query: ({ limit, skip, search, category, minPrice, maxPrice, sort }) => {
        const params = new URLSearchParams();

        params.append('limit', String(limit));
        params.append('skip', String(skip));
    
        if (search) {
          params.append('search', search);
        }
        if (category) {
          params.append('category', category);
        }
        if (minPrice !== undefined && minPrice !== null) {
          params.append('minPrice', String(minPrice));
        }
        if (maxPrice !== undefined && maxPrice !== null) {
          params.append('maxPrice', String(maxPrice));
        }
        if (sort) {
          params.append('sort', sort);
        }
    
        return `/products?${params.toString()}`;
      },
    }),
    getProductById: builder.query<Product, number>({
      query: (id) => `/products/${id}`,
    }),
  }),
});

export const { useGetProductsQuery, useGetProductByIdQuery } = productsApi;