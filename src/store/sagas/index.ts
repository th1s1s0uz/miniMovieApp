import { all } from 'redux-saga/effects';
import { favoritesSaga } from './favoritesSaga';
import { moviesSaga } from './moviesSaga';
import { searchSaga } from './searchSaga';
import { movieDetailsSaga } from './movieDetailsSaga';

export function* rootSaga() {
  yield all([
    favoritesSaga(),
    moviesSaga(),
    searchSaga(),
    movieDetailsSaga(),
  ]);
} 