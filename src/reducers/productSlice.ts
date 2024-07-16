/* eslint-disable no-param-reassign */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../models/Product';

interface ProductState {
  isLoading: boolean;
  isError: boolean;
  product: Product | null;
}

const initialState: ProductState = {
  isLoading: false,
  isError: false,
  product: null,
};

const ProductSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProduct(state, { payload }: PayloadAction<Product | null>) {
      state.product = payload;
    },
  },
});

export const { reducer: productReducer, actions: productActions } =
  ProductSlice;
