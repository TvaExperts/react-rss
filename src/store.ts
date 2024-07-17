import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { productsReducer } from './reducers/productsSlice';
import { productApi } from './services/api';
import { productReducer } from './reducers/productSlice';

const rootReducer = combineReducers({
  productsReducer,
  productReducer,
  [productApi.reducerPath]: productApi.reducer,
});

export function setupStore(initialState = {}) {
  return configureStore({
    reducer: rootReducer,
    preloadedState: initialState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(productApi.middleware),
  });
}

export const selectProducts = (state: RootState) => {
  return state.productsReducer.products;
};

export const selectTotalProducts = (state: RootState) => {
  return state.productsReducer.total;
};

export const selectSelectedProducts = (state: RootState) => {
  return state.productsReducer.selectedProductsId;
};

export const selectIsLoadingProducts = (state: RootState) => {
  return state.productsReducer.isLoading;
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
