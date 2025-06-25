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

// Request interceptor
tmdbApi.interceptors.request.use(
  (config) => {
    // Request gönderilmeden önce yapılacak işlemler
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
tmdbApi.interceptors.response.use(
  (response) => {
    // Başarılı response
    return response;
  },
  (error) => {
    // Error handling
    if (error.response) {
      // Server error (4xx, 5xx)
      const status = error.response.status;
      const message = error.response.data?.status_message || `HTTP ${status} hatası`;
      
      // Error objesini zenginleştir
      error.statusCode = status;
      error.errorMessage = message;
      
      // 401 hatası için özel handling
      if (status === 401) {
        error.errorMessage = 'API anahtarı geçersiz veya süresi dolmuş.';
      }
      
      // 429 rate limit hatası için özel handling
      if (status === 429) {
        error.errorMessage = 'API istek limiti aşıldı. Lütfen biraz bekleyin.';
      }
    } else if (error.request) {
      // Network error
      error.errorMessage = 'Sunucuya bağlanılamıyor. İnternet bağlantınızı kontrol edin.';
    } else {
      // Diğer error'lar
      error.errorMessage = error.message || 'Bilinmeyen bir hata oluştu.';
    }
    
    return Promise.reject(error);
  }
);

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

export interface CastMember {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
}

export interface CrewMember {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
  credit_id: string;
  department: string;
  job: string;
}

export interface MovieCredits {
  id: number;
  cast: CastMember[];
  crew: CrewMember[];
}

export interface Person {
  adult: boolean;
  also_known_as: string[];
  biography: string;
  birthday: string | null;
  deathday: string | null;
  gender: number;
  homepage: string | null;
  id: number;
  imdb_id: string | null;
  known_for_department: string;
  name: string;
  place_of_birth: string | null;
  popularity: number;
  profile_path: string | null;
  combined_credits?: {
    cast: Array<{
      id: number;
      title: string;
      character: string;
      poster_path: string | null;
      release_date: string;
      vote_average: number;
      media_type: string;
    }>;
    crew: Array<{
      id: number;
      title: string;
      job: string;
      department: string;
      poster_path: string | null;
      release_date: string;
      vote_average: number;
      media_type: string;
    }>;
  };
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

  // Get movie credits (cast and crew)
  getMovieCredits: async (movieId: number): Promise<MovieCredits> => {
    try {
      const response = await tmdbApi.get(`/movie/${movieId}/credits`);
      return response.data;
    } catch (error) {
      console.error('Error fetching movie credits:', error);
      throw error;
    }
  },

  // Get similar movies
  getSimilarMovies: async (movieId: number, page: number = 1): Promise<MoviesResponse> => {
    try {
      const response = await tmdbApi.get(`/movie/${movieId}/similar`, {
        params: { page }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching similar movies:', error);
      throw error;
    }
  },

  // Get person details (actor/actress information)
  getPersonDetails: async (personId: number): Promise<Person> => {
    try {
      const response = await tmdbApi.get(`/person/${personId}`, {
        params: {
          append_to_response: 'combined_credits'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching person details:', error);
      throw error;
    }
  },

  // Get image URL
  getImageUrl: (path: string, size: 'w92' | 'w154' | 'w185' | 'w342' | 'w500' | 'w780' | 'original' = 'w500'): string => {
    if (!path) return '';
    return `https://image.tmdb.org/t/p/${size}${path}`;
  }
}; 