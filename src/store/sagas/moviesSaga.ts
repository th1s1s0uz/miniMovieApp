import { call, put, takeLatest, all, select } from 'redux-saga/effects';
import { tmdbService, MoviesResponse } from '../../services/tmdbService';
import { 
  setLoading, 
  setRefreshing, 
  setError,
  setPopularMovies,
  setTrendingMovies,
  setNowPlayingMovies,
  setUpcomingMovies,
  setTopRatedMovies,
  setDiscoverMovies,
} from '../moviesSlice';
import { handleSagaError } from '../../utils/errorUtils';

// Action types
export const MOVIES_ACTIONS = {
  FETCH_ALL_MOVIES: 'movies/fetchAllMovies' as const,
  FETCH_POPULAR_MOVIES: 'movies/fetchPopularMovies' as const,
  FETCH_TRENDING_MOVIES: 'movies/fetchTrendingMovies' as const,
  FETCH_NOW_PLAYING_MOVIES: 'movies/fetchNowPlayingMovies' as const,
  FETCH_UPCOMING_MOVIES: 'movies/fetchUpcomingMovies' as const,
  FETCH_TOP_RATED_MOVIES: 'movies/fetchTopRatedMovies' as const,
  FETCH_DISCOVER_MOVIES: 'movies/fetchDiscoverMovies' as const,
} as const;

// Action creators
export const moviesActions = {
  fetchAllMovies: () => ({ type: MOVIES_ACTIONS.FETCH_ALL_MOVIES }),
  fetchPopularMovies: (page: number = 1) => ({ 
    type: MOVIES_ACTIONS.FETCH_POPULAR_MOVIES, 
    payload: { page } 
  }),
  fetchTrendingMovies: (page: number = 1) => ({ 
    type: MOVIES_ACTIONS.FETCH_TRENDING_MOVIES, 
    payload: { page } 
  }),
  fetchNowPlayingMovies: (page: number = 1) => ({ 
    type: MOVIES_ACTIONS.FETCH_NOW_PLAYING_MOVIES, 
    payload: { page } 
  }),
  fetchUpcomingMovies: (page: number = 1) => ({ 
    type: MOVIES_ACTIONS.FETCH_UPCOMING_MOVIES, 
    payload: { page } 
  }),
  fetchTopRatedMovies: (page: number = 1) => ({ 
    type: MOVIES_ACTIONS.FETCH_TOP_RATED_MOVIES, 
    payload: { page } 
  }),
  fetchDiscoverMovies: (page: number = 1, sortBy: string = 'popularity.desc') => ({ 
    type: MOVIES_ACTIONS.FETCH_DISCOVER_MOVIES, 
    payload: { page, sortBy } 
  }),
};

// Cache duration (5 minutes)
const CACHE_DURATION = 5 * 60 * 1000;

// Simple cache for movies
const moviesCache = new Map<string, { data: any; timestamp: number }>();

// Cache helper functions
const getCacheKey = (type: string, page: number = 1, sortBy?: string) => {
  return sortBy ? `${type}_${page}_${sortBy}` : `${type}_${page}`;
};

const isCacheValid = (key: string) => {
  const cached = moviesCache.get(key);
  if (!cached) return false;
  return Date.now() - cached.timestamp < CACHE_DURATION;
};

const getCachedData = (key: string) => {
  const cached = moviesCache.get(key);
  return cached ? cached.data : null;
};

const setCachedData = (key: string, data: any) => {
  moviesCache.set(key, { data, timestamp: Date.now() });
};

// Saga functions
function* fetchAllMoviesSaga(): Generator<any, void, any> {
  try {
    // Check if this is a refresh operation by checking current state
    const currentState = yield select((state) => state.movies);
    const isRefresh = !currentState.loading && currentState.popularMovies.length > 0;
    
    if (isRefresh) {
      yield put(setRefreshing(true));
    } else {
      yield put(setLoading(true));
    }
    
    // Check cache first
    const cacheKey = 'all_movies';
    const cachedData = getCachedData(cacheKey);
    
    if (cachedData && isCacheValid(cacheKey) && !isRefresh) {
      // Use cached data only if not refreshing
      yield put(setPopularMovies(cachedData.popular));
      yield put(setTrendingMovies(cachedData.trending));
      yield put(setNowPlayingMovies(cachedData.nowPlaying));
      yield put(setUpcomingMovies(cachedData.upcoming));
      yield put(setTopRatedMovies(cachedData.topRated));
      yield put(setDiscoverMovies(cachedData.discover));
      yield put(setLoading(false));
      yield put(setError(null));
      return;
    }
    
    // Fetch fresh data
    const [popular, trending, nowPlaying, upcoming, topRated, discover] = yield all([
      call(tmdbService.getPopularMovies, 1),
      call(tmdbService.getTrendingMovies, 1),
      call(tmdbService.getNowPlayingMovies, 1),
      call(tmdbService.getUpcomingMovies, 1),
      call(tmdbService.getTopRatedMovies, 1),
      call(tmdbService.getDiscoverMovies, 1, 'vote_average.desc'),
    ]);

    // Cache the results
    setCachedData(cacheKey, {
      popular: popular.results,
      trending: trending.results,
      nowPlaying: nowPlaying.results,
      upcoming: upcoming.results,
      topRated: topRated.results,
      discover: discover.results,
    });

    // Dispatch results
    yield put(setPopularMovies(popular.results));
    yield put(setTrendingMovies(trending.results));
    yield put(setNowPlayingMovies(nowPlaying.results));
    yield put(setUpcomingMovies(upcoming.results));
    yield put(setTopRatedMovies(topRated.results));
    yield put(setDiscoverMovies(discover.results));
    
    if (isRefresh) {
      yield put(setRefreshing(false));
    } else {
      yield put(setLoading(false));
    }
    yield put(setError(null));
    
  } catch (error) {
    yield* handleSagaError(error, 'MOVIES_LOAD');
    yield put(setLoading(false));
    yield put(setRefreshing(false));
  }
}

function* fetchPopularMoviesSaga(action: { payload: { page: number } }): Generator<any, void, any> {
  try {
    const { page } = action.payload;
    const cacheKey = getCacheKey('popular', page);
    
    // Check cache
    const cachedData = getCachedData(cacheKey);
    if (cachedData && isCacheValid(cacheKey)) {
      yield put(setPopularMovies(cachedData));
      return;
    }
    
    const result: MoviesResponse = yield call(tmdbService.getPopularMovies, page);
    setCachedData(cacheKey, result.results);
    yield put(setPopularMovies(result.results));
  } catch (error) {
    yield* handleSagaError(error, 'MOVIES_LOAD');
  }
}

function* fetchTrendingMoviesSaga(action: { payload: { page: number } }): Generator<any, void, any> {
  try {
    const { page } = action.payload;
    const cacheKey = getCacheKey('trending', page);
    
    const cachedData = getCachedData(cacheKey);
    if (cachedData && isCacheValid(cacheKey)) {
      yield put(setTrendingMovies(cachedData));
      return;
    }
    
    const result: MoviesResponse = yield call(tmdbService.getTrendingMovies, page);
    setCachedData(cacheKey, result.results);
    yield put(setTrendingMovies(result.results));
  } catch (error) {
    yield* handleSagaError(error, 'MOVIES_LOAD');
  }
}

function* fetchNowPlayingMoviesSaga(action: { payload: { page: number } }): Generator<any, void, any> {
  try {
    const { page } = action.payload;
    const cacheKey = getCacheKey('nowPlaying', page);
    
    const cachedData = getCachedData(cacheKey);
    if (cachedData && isCacheValid(cacheKey)) {
      yield put(setNowPlayingMovies(cachedData));
      return;
    }
    
    const result: MoviesResponse = yield call(tmdbService.getNowPlayingMovies, page);
    setCachedData(cacheKey, result.results);
    yield put(setNowPlayingMovies(result.results));
  } catch (error) {
    yield* handleSagaError(error, 'MOVIES_LOAD');
  }
}

function* fetchUpcomingMoviesSaga(action: { payload: { page: number } }): Generator<any, void, any> {
  try {
    const { page } = action.payload;
    const cacheKey = getCacheKey('upcoming', page);
    
    const cachedData = getCachedData(cacheKey);
    if (cachedData && isCacheValid(cacheKey)) {
      yield put(setUpcomingMovies(cachedData));
      return;
    }
    
    const result: MoviesResponse = yield call(tmdbService.getUpcomingMovies, page);
    setCachedData(cacheKey, result.results);
    yield put(setUpcomingMovies(result.results));
  } catch (error) {
    yield* handleSagaError(error, 'MOVIES_LOAD');
  }
}

function* fetchTopRatedMoviesSaga(action: { payload: { page: number } }): Generator<any, void, any> {
  try {
    const { page } = action.payload;
    const cacheKey = getCacheKey('topRated', page);
    
    const cachedData = getCachedData(cacheKey);
    if (cachedData && isCacheValid(cacheKey)) {
      yield put(setTopRatedMovies(cachedData));
      return;
    }
    
    const result: MoviesResponse = yield call(tmdbService.getTopRatedMovies, page);
    setCachedData(cacheKey, result.results);
    yield put(setTopRatedMovies(result.results));
  } catch (error) {
    yield* handleSagaError(error, 'MOVIES_LOAD');
  }
}

function* fetchDiscoverMoviesSaga(action: { payload: { page: number; sortBy: string } }): Generator<any, void, any> {
  try {
    const { page, sortBy } = action.payload;
    const cacheKey = getCacheKey('discover', page, sortBy);
    
    const cachedData = getCachedData(cacheKey);
    if (cachedData && isCacheValid(cacheKey)) {
      yield put(setDiscoverMovies(cachedData));
      return;
    }
    
    const result: MoviesResponse = yield call(tmdbService.getDiscoverMovies, page, sortBy);
    setCachedData(cacheKey, result.results);
    yield put(setDiscoverMovies(result.results));
  } catch (error) {
    yield* handleSagaError(error, 'MOVIES_LOAD');
  }
}

// Watcher saga
export function* moviesSaga() {
  yield takeLatest(MOVIES_ACTIONS.FETCH_ALL_MOVIES, fetchAllMoviesSaga);
  yield takeLatest(MOVIES_ACTIONS.FETCH_POPULAR_MOVIES, fetchPopularMoviesSaga);
  yield takeLatest(MOVIES_ACTIONS.FETCH_TRENDING_MOVIES, fetchTrendingMoviesSaga);
  yield takeLatest(MOVIES_ACTIONS.FETCH_NOW_PLAYING_MOVIES, fetchNowPlayingMoviesSaga);
  yield takeLatest(MOVIES_ACTIONS.FETCH_UPCOMING_MOVIES, fetchUpcomingMoviesSaga);
  yield takeLatest(MOVIES_ACTIONS.FETCH_TOP_RATED_MOVIES, fetchTopRatedMoviesSaga);
  yield takeLatest(MOVIES_ACTIONS.FETCH_DISCOVER_MOVIES, fetchDiscoverMoviesSaga);
} 