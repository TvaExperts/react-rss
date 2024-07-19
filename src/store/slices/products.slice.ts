/* eslint-disable no-param-reassign */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { productApi, ProductsApiResponse } from '../../services/api';
import { Product } from '../../models/product';

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

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  selectors: {
    selectTotalProducts: (state) => state.total,
    selectProducts: (state) => state.products,
    selectIsLoading: (state) => state.isLoading,
    selectSelectedProducts: (state) => state.selectedProductsId,
  },
  reducers: {
    setProductsData(
      state,
      { payload }: PayloadAction<ProductsApiResponse | undefined>
    ) {
      if (payload) {
        state.total = payload.total;
        state.products = payload.products;
      } else {
        state.total = 0;
        state.products = [];
        state.selectedProductsId = {};
      }
    },
    selectProduct(state, { payload }: PayloadAction<number>) {
      state.selectedProductsId[payload] = payload;
    },
    unselectProduct(state, { payload }: PayloadAction<number>) {
      state.selectedProductsId[payload] = undefined;
    },
    unselectAllProducts(state) {
      state.selectedProductsId = {};
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
