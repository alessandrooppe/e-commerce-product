import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Product } from '../models/product';
import { ProductResponse } from '../models/product-response';


export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5001/api' }), 
  endpoints: (builder) => ({
    getProducts: builder.query<ProductResponse, { 
      limit: number; 
      skip: number; 
      search?: string; 
      sort?: string }>({
      query: ({ limit, skip, search, sort }) => {
        const params = new URLSearchParams();

        params.append('limit', String(limit));
        params.append('skip', String(skip));
    
        if (search) {
          params.append('search', search);
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
    getCategories: builder.query<string[], void>({
      query: () => '/categoriesList',
    }),
    getProductsByCategory: builder.query<ProductResponse, { 
      limit: number; 
      skip: number; 
      category: string; 
    }
      >({
      query: ({ limit, skip, category }) => {
        const params = new URLSearchParams();
        params.append('limit', String(limit));
        params.append('skip', String(skip));
        params.append('category', category);
    
        return `/byCategory?${params.toString()}`;
      },
    }),
  }),
});

export const { 
  useGetProductsQuery, 
  useGetProductByIdQuery, 
  useGetCategoriesQuery, 
  useGetProductsByCategoryQuery 
} = productsApi;