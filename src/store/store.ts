import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { productApi } from '@/services/api';
import { createWrapper } from 'next-redux-wrapper';
import { productsSlice } from './slices/products.slice';
import { productDetailsSlice } from './slices/productDetails.slice';

export function setupStore(initialState = {}) {
  return configureStore({
    reducer: {
      [productsSlice.name]: productsSlice.reducer,
      [productDetailsSlice.name]: productsSlice.reducer,
      [productApi.reducerPath]: productApi.reducer,
    },
    preloadedState: initialState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(productApi.middleware),
  });
}

export type RootState = ReturnType<typeof setupStore>;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const wrapper = createWrapper<RootState>(setupStore);
