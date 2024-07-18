import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { productsSlice } from './reducers/productsSlice';
import { productApi } from './services/api';
import { productDetailsSlice } from './reducers/productDetailsSlice';

function setupStore(initialState = {}) {
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

export const store = setupStore();

export type RootState = ReturnType<typeof store.getState>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
