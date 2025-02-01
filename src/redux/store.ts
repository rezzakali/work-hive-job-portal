import usersReducer from '@/src/redux/user/userSlice';
import { configureStore } from '@reduxjs/toolkit';
import api from './api';

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    users: usersReducer,
  },
  devTools: process.env.NEXT_PUBLIC_NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(api.middleware);
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
