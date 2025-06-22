import axios from 'axios';

const API_KEY = '11d209aeff612e28d4e0758c52485b0e';
const BASE_URL = 'https://api.themoviedb.org/3';

// Axios instance oluştur
const tmdbApi = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: 'tr-TR',
  },
  timeout: 10000, // 10 saniye timeout
});

export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
  // Detaylı bilgiler
  adult?: boolean;
  belongs_to_collection?: {
    id: number;
    name: string;
    poster_path: string;
    backdrop_path: string;
  };
  budget?: number;
  genres?: Array<{
    id: number;
    name: string;
  }>;
  homepage?: string;
  imdb_id?: string;
  original_language?: string;
  original_title?: string;
  production_companies?: Array<{
    id: number;
    name: string;
    logo_path: string | null;
    origin_country: string;
  }>;
  production_countries?: Array<{
    iso_3166_1: string;
    name: string;
  }>;
  revenue?: number;
  runtime?: number;
  spoken_languages?: Array<{
    english_name: string;
    iso_639_1: string;
    name: string;
  }>;
  status?: string;
  tagline?: string;
  video?: boolean;
}

export interface MoviesResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export const tmdbService = {
  // Get popular movies
  getPopularMovies: async (page: number = 1): Promise<MoviesResponse> => {
    try {
      const response = await tmdbApi.get('/movie/popular', {
        params: { page }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching popular movies:', error);
      throw error;
    }
  },

  // Get now playing movies
  getNowPlayingMovies: async (page: number = 1): Promise<MoviesResponse> => {
    try {
      const response = await tmdbApi.get('/movie/now_playing', {
        params: { page }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching now playing movies:', error);
      throw error;
    }
  },

  // Get top rated movies
  getTopRatedMovies: async (page: number = 1): Promise<MoviesResponse> => {
    try {
      const response = await tmdbApi.get('/movie/top_rated', {
        params: { page }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching top rated movies:', error);
      throw error;
    }
  },

  // Get upcoming movies
  getUpcomingMovies: async (page: number = 1): Promise<MoviesResponse> => {
    try {
      const response = await tmdbApi.get('/movie/upcoming', {
        params: { page }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching upcoming movies:', error);
      throw error;
    }
  },

  // Get trending movies (daily)
  getTrendingMovies: async (page: number = 1): Promise<MoviesResponse> => {
    try {
      const response = await tmdbApi.get('/trending/movie/day', {
        params: { page }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching trending movies:', error);
      throw error;
    }
  },

  // Get discover movies (with filters)
  getDiscoverMovies: async (page: number = 1, sortBy: string = 'popularity.desc'): Promise<MoviesResponse> => {
    try {
      const response = await tmdbApi.get('/discover/movie', {
        params: { 
          page,
          sort_by: sortBy,
          include_adult: false,
          include_video: false
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching discover movies:', error);
      throw error;
    }
  },

  // Search movies
  searchMovies: async (query: string, page: number = 1): Promise<MoviesResponse> => {
    try {
      const response = await tmdbApi.get('/search/movie', {
        params: { 
          query,
          page
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error searching movies:', error);
      throw error;
    }
  },

  // Get movie details
  getMovieDetails: async (movieId: number): Promise<Movie> => {
    try {
      const response = await tmdbApi.get(`/movie/${movieId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching movie details:', error);
      throw error;
    }
  },

  // Get image URL
  getImageUrl: (path: string, size: 'w92' | 'w154' | 'w185' | 'w342' | 'w500' | 'w780' | 'original' = 'w500'): string => {
    if (!path) return '';
    return `https://image.tmdb.org/t/p/${size}${path}`;
  }
}; 