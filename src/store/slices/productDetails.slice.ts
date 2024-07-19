/* eslint-disable no-param-reassign */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../models/product';

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

export const productDetailsSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProduct(state, { payload }: PayloadAction<Product | undefined>) {
      state.product = payload;
    },
  },
});
