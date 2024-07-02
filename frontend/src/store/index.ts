import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import productsReducer from './productsSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    products: productsReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(), 
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
