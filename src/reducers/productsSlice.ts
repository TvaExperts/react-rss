/* eslint-disable no-param-reassign */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { productApi, ProductsApiResponse } from '../services/api';
import { Product } from '../models/product';

interface ProductsState {
  isLoading: boolean;
  isError: boolean;
  total: number;
  products: Product[];
  selectedProductsId: Record<number, number | undefined>;
}

const initialState: ProductsState = {
  isLoading: false,
  isError: false,
  products: [],
  selectedProductsId: {},
  total: 0,
};

const ProductsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProductsData(
      state,
      { payload }: PayloadAction<ProductsApiResponse | undefined>
    ) {
      if (payload === undefined) {
        state.total = 0;
        state.products = [];
        state.selectedProductsId = {};
        return state;
      }
      state.total = payload.total;
      state.products = payload.products;
      return state;
    },
    selectProduct(state, { payload }: PayloadAction<number>) {
      state.selectedProductsId[payload] = payload;
      return state;
    },
    unselectProduct(state, { payload }: PayloadAction<number>) {
      state.selectedProductsId[payload] = undefined;
      return state;
    },
    unselectAllProducts(state) {
      state.selectedProductsId = {};
      return state;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        productApi.endpoints?.getProductsByParams.matchFulfilled,
        (state) => {
          state.isLoading = false;
          state.isError = false;
        }
      )
      .addMatcher(
        productApi.endpoints?.getProductsByParams.matchRejected,
        (state) => {
          state.products = [];
          state.total = 0;
          state.isLoading = false;
          state.isError = true;
        }
      )
      .addMatcher(
        productApi.endpoints?.getProductsByParams.matchPending,
        (state) => {
          state.products = [];
          state.total = 0;
          state.isLoading = true;
          state.isError = false;
        }
      );
  },
});

export const { reducer: productsReducer, actions: productsActions } =
  ProductsSlice;
