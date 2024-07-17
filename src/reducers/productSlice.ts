/* eslint-disable no-param-reassign */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../models/product';

interface ProductState {
  isLoading: boolean;
  isError: boolean;
  product: Product | undefined;
}

const initialState: ProductState = {
  isLoading: false,
  isError: false,
  product: undefined,
};

const ProductSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProduct(state, { payload }: PayloadAction<Product | undefined>) {
      state.product = payload;
    },
  },
});

export const { reducer: productReducer, actions: productActions } =
  ProductSlice;
