import { configureStore } from '@reduxjs/toolkit';
import favoritesReducer from './favoritesSlice';
import popupReducer from './popupSlice';

export const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
    popup: popupReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 