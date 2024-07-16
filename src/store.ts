import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { productsReducer } from './reducers/productsSlice';
import { productApi } from './services/api';

const rootReducer = combineReducers({
  productsReducer,
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

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
