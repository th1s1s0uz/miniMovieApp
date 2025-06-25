import { call, put, takeLatest, delay, cancelled, select } from 'redux-saga/effects';
import { tmdbService, MoviesResponse } from '../../services/tmdbService';
import { 
  setSearchResults,
  setSearchLoading,
  setSearchError,
  setSearchQuery,
  clearSearch,
  setHasSearched,
} from '../searchSlice';
import { handleSagaError } from '../../utils/errorUtils';

// Action types
export const SEARCH_ACTIONS = {
  SEARCH_MOVIES: 'search/searchMovies',
  CLEAR_SEARCH: 'search/clearSearch',
} as const;

// Action creators
export const searchActions = {
  searchMovies: (query: string) => ({ 
    type: SEARCH_ACTIONS.SEARCH_MOVIES, 
    payload: { query } 
  }),
  clearSearch: () => ({ type: SEARCH_ACTIONS.CLEAR_SEARCH }),
};

// Debounce delay
const SEARCH_DEBOUNCE_DELAY = 300;

// Saga functions
function* searchMoviesSaga(action: { payload: { query: string } }) {
  const { query } = action.payload;
  
  // Query boşsa aramayı temizle ve saga'yı sonlandır
  if (!query || !query.trim()) {
    yield put(setSearchQuery(''));
    yield put(setSearchResults([]));
    yield put(setSearchLoading(false));
    yield put(setSearchError(null));
    yield put(setHasSearched(false));
    return;
  }

  // Mevcut query'yi kontrol et - aynıysa tekrar API çağrısı yapma
  const currentQuery: string = yield select((state) => state.search.query);
  if (currentQuery === query) {
    return;
  }

  try {
    // Search query'yi güncelle
    yield put(setSearchQuery(query));
    yield put(setSearchLoading(true));
    yield put(setSearchError(null));

    // Debounce: 300ms bekle (daha kısa süre)
    yield delay(SEARCH_DEBOUNCE_DELAY);

    // Eğer saga iptal edildiyse çık
    if (yield cancelled()) {
      return;
    }

    // API çağrısı yap
    const result: MoviesResponse = yield call(tmdbService.searchMovies, query, 1);
    
    // Sonuçları güncelle
    yield put(setSearchResults(result.results));
    yield put(setSearchLoading(false));
    yield put(setHasSearched(true));
    
  } catch (error) {
    // Centralized error handling
    yield* handleSagaError(error, 'SEARCH');
    yield put(setSearchLoading(false));
  } finally {
    // Eğer saga iptal edildiyse (yeni arama başladıysa)
    if (yield cancelled()) {
      // Loading state'ini temizle
      yield put(setSearchLoading(false));
    }
  }
}

function* clearSearchSaga() {
  // Tüm search state'ini temizle
  yield put(setSearchQuery(''));
  yield put(setSearchResults([]));
  yield put(setSearchLoading(false));
  yield put(setSearchError(null));
  yield put(setHasSearched(false));
}

// Watcher saga
export function* searchSaga() {
  yield takeLatest(SEARCH_ACTIONS.SEARCH_MOVIES, searchMoviesSaga);
  yield takeLatest(SEARCH_ACTIONS.CLEAR_SEARCH, clearSearchSaga);
} 