/* eslint-disable no-param-reassign */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ProductsApiResponse } from '../services/api';
import { Product } from '../models/product';

interface ProductsState {
  isLoading: boolean;
  isError: boolean;
  total: number;
  query: string;
  page: number;
  products: Product[];
  selectedProductsId: string[];
}

const initialState: ProductsState = {
  isLoading: false,
  isError: false,
  products: [],
  selectedProductsId: [],
  query: '',
  page: 1,
  total: 0,
};

const ProductsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProductsData(
      state,
      { payload }: PayloadAction<ProductsApiResponse | null>
    ) {
      if (payload === null) {
        state.total = 0;
        state.products = [];
        state.selectedProductsId = [];
        return state;
      }
      state.total = payload.total;
      state.products = payload.products;
      state.selectedProductsId = [];
      return state;
    },
    selectProduct(state, { payload }: PayloadAction<string>) {
      state.selectedProductsId.push(payload);
      return state;
    },
    unselectProduct(state, { payload }: PayloadAction<string>) {
      state.selectedProductsId = state.selectedProductsId.filter(
        (value: string) => value !== payload
      );
      return state;
    },
    unselectAllProducts(state) {
      state.selectedProductsId = [];
      return state;
    },
  },
});

export const { reducer: productsReducer, actions: productsActions } =
  ProductsSlice;
