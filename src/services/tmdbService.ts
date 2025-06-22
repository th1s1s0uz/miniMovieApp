const API_KEY = '11d209aeff612e28d4e0758c52485b0e';
const BASE_URL = 'https://api.themoviedb.org/3';

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
      const response = await fetch(
        `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=tr-TR&page=${page}`
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching popular movies:', error);
      throw error;
    }
  },

  // Get now playing movies
  getNowPlayingMovies: async (page: number = 1): Promise<MoviesResponse> => {
    try {
      const response = await fetch(
        `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=tr-TR&page=${page}`
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching now playing movies:', error);
      throw error;
    }
  },

  // Get top rated movies
  getTopRatedMovies: async (page: number = 1): Promise<MoviesResponse> => {
    try {
      const response = await fetch(
        `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=tr-TR&page=${page}`
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching top rated movies:', error);
      throw error;
    }
  },

  // Get upcoming movies
  getUpcomingMovies: async (page: number = 1): Promise<MoviesResponse> => {
    try {
      const response = await fetch(
        `${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=tr-TR&page=${page}`
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching upcoming movies:', error);
      throw error;
    }
  },

  // Get trending movies (daily)
  getTrendingMovies: async (page: number = 1): Promise<MoviesResponse> => {
    try {
      const response = await fetch(
        `${BASE_URL}/trending/movie/day?api_key=${API_KEY}&language=tr-TR&page=${page}`
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching trending movies:', error);
      throw error;
    }
  },

  // Get discover movies (with filters)
  getDiscoverMovies: async (page: number = 1, sortBy: string = 'popularity.desc'): Promise<MoviesResponse> => {
    try {
      const response = await fetch(
        `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=tr-TR&sort_by=${sortBy}&page=${page}&include_adult=false&include_video=false`
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching discover movies:', error);
      throw error;
    }
  },

  // Search movies
  searchMovies: async (query: string, page: number = 1): Promise<MoviesResponse> => {
    try {
      const response = await fetch(
        `${BASE_URL}/search/movie?api_key=${API_KEY}&language=tr-TR&query=${encodeURIComponent(query)}&page=${page}`
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error searching movies:', error);
      throw error;
    }
  },

  // Get movie details
  getMovieDetails: async (movieId: number): Promise<Movie> => {
    try {
      const response = await fetch(
        `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=tr-TR`
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
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