/* eslint-disable no-param-reassign */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Product } from '@/models/product';

interface ProductsState {
  selectedProducts: Record<number, Product | undefined>;
}

const initialState: ProductsState = {
  selectedProducts: {},
};

export const selectedProductsSlice = createSlice({
  name: 'selectedProducts',
  initialState,
  selectors: {
    selectSelectedProducts: (state) => state.selectedProducts,
  },
  reducers: {
    selectProduct(state, { payload }: PayloadAction<Product>) {
      state.selectedProducts[payload.id] = payload;
    },
    unselectProduct(state, { payload }: PayloadAction<number>) {
      state.selectedProducts[payload] = undefined;
    },
    unselectAllProducts(state) {
      state.selectedProducts = {};
    },
  },
});
