import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Product } from '../models/product';

export const BASE_URL = 'https://dummyjson.com/products';

export const PRODUCTS_PER_PAGE = 15;

export interface ProductsApiResponse {
  total: number;
  products: Product[];
}

export const SEARCH_PARAMETERS = {
  page: 'page',
  query: 'query',
} as const;

export interface AppSearchParams {
  page: number;
  query: string;
}

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getProductsByParams: builder.query<ProductsApiResponse, AppSearchParams>({
      query: (appSearchParams) => ({
        url: `/search`,
        params: {
          q: appSearchParams.query,
          limit: PRODUCTS_PER_PAGE,
          skip: (appSearchParams.page - 1) * PRODUCTS_PER_PAGE,
        },
      }),
    }),

    getProductById: builder.query<Product, string>({
      query: (id) => ({ url: `/${id}` }),
    }),
  }),
});

export const { useGetProductByIdQuery, useGetProductsByParamsQuery } =
  productApi;
