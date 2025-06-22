import { tmdbService } from '../services/tmdbService';

/**
 * Film puanını formatlar (örn: 7.5 -> "7.5")
 */
export const formatRating = (rating: number): string => {
  return rating.toFixed(1);
};

/**
 * Film tarihini yıl olarak formatlar (örn: "2024-01-15" -> "2024")
 */
export const formatDate = (dateString: string): string => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.getFullYear().toString();
};

/**
 * Poster URL'ini güvenli şekilde oluşturur
 * @param posterPath - Film poster path'i
 * @param size - Resim boyutu (w92, w154, w185, w342, w500, w780, original)
 * @param fallbackSize - Fallback boyutu (placeholder için)
 */
export const getPosterUrl = (
  posterPath: string | null, 
  size: 'w92' | 'w154' | 'w185' | 'w342' | 'w500' | 'w780' | 'original' = 'w500',
  fallbackSize: string = '500x750'
): string => {
  if (!posterPath) {
    return `https://via.placeholder.com/${fallbackSize}/333/666?text=No+Image`;
  }
  return tmdbService.getImageUrl(posterPath, size);
};

/**
 * Backdrop URL'ini güvenli şekilde oluşturur
 * @param backdropPath - Film backdrop path'i
 * @param size - Resim boyutu
 * @param fallbackSize - Fallback boyutu (placeholder için)
 */
export const getBackdropUrl = (
  backdropPath: string | null,
  size: 'w92' | 'w154' | 'w185' | 'w342' | 'w500' | 'w780' | 'original' = 'w780',
  fallbackSize: string = '780x439'
): string => {
  if (!backdropPath) {
    return `https://via.placeholder.com/${fallbackSize}/333/666?text=No+Image`;
  }
  return tmdbService.getImageUrl(backdropPath, size);
};

/**
 * Film süresini dakika cinsinden formatlar (örn: 120 -> "2h 0m")
 */
export const formatRuntime = (minutes: number): string => {
  if (!minutes) return '';
  
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  
  if (hours > 0) {
    return `${hours}h ${remainingMinutes}m`;
  }
  return `${remainingMinutes}m`;
};

