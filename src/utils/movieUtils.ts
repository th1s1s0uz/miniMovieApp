import { tmdbService } from '../services/tmdbService';


export const formatRating = (rating: number): string => {
  return rating.toFixed(1);
};

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


export const formatRevenue = (revenue: number): string => {
  if (!revenue || revenue <= 0) return 'Bilinmiyor';
  
  if (revenue >= 1000000) {
    return `$${(revenue / 1000000).toFixed(0)}M`;
  } else if (revenue >= 1000) {
    return `$${(revenue / 1000).toFixed(0)}K`;
  }
  return `$${revenue}`;
};


export const formatBudget = (budget: number): string => {
  if (!budget || budget <= 0) return 'Bilinmiyor';
  
  if (budget >= 1000000) {
    return `$${(budget / 1000000).toFixed(0)}M`;
  } else if (budget >= 1000) {
    return `$${(budget / 1000).toFixed(0)}K`;
  }
  return `$${budget}`;
};


export const formatRuntime = (minutes: number): string => {
  if (!minutes || minutes <= 0) return 'Bilinmiyor';
  
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  
  if (hours > 0) {
    return `${hours}h ${remainingMinutes}m`;
  }
  return `${remainingMinutes}m`;
};


export const formatGenres = (genres: Array<{id: number, name: string}>): string => {
  if (!genres || genres.length === 0) return 'Bilinmiyor';
  return genres.map(genre => genre.name).join(', ');
};


export const formatProductionCompanies = (companies: Array<{name: string}>): string => {
  if (!companies || companies.length === 0) return 'Bilinmiyor';
  return companies.map(company => company.name).join(', ');
};


export const formatSpokenLanguages = (languages: Array<{name: string}>): string => {
  if (!languages || languages.length === 0) return 'Bilinmiyor';
  return languages.map(lang => lang.name).join(', ');
};

export const formatProductionCountries = (countries: Array<{name: string}>): string => {
  if (!countries || countries.length === 0) return 'Bilinmiyor';
  return countries.map(country => country.name).join(', ');
};

