import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { productApi } from '@/services/api';
import { createWrapper } from 'next-redux-wrapper';
import { selectedProductsSlice } from './slices/selectedProducts.slice';

export function setupStore(initialState = {}) {
  return configureStore({
    reducer: {
      [selectedProductsSlice.name]: selectedProductsSlice.reducer,
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
