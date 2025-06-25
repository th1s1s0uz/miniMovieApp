import { configureStore } from '@reduxjs/toolkit';
import favoritesReducer from './favoritesSlice';
import moviesReducer from './moviesSlice';
import searchReducer from './searchSlice';
import movieDetailsReducer from './movieDetailsSlice';
import popupReducer from './popupSlice';
import { rootSaga } from './sagas';

// Create saga middleware
const createSagaMiddleware = require('redux-saga').default;
const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
    movies: moviesReducer,
    search: searchReducer,
    movieDetails: movieDetailsReducer,
    popup: popupReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }).concat(sagaMiddleware),
});

// Run saga
sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 