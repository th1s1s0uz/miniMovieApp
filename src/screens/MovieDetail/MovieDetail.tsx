import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
  Animated
} from 'react-native';
import { useAppNavigation } from '../../navigation/AppNavigatorPaths';
import { Movie, tmdbService } from '../../services/tmdbService';
import { formatRating, formatDate, getPosterUrl, getBackdropUrl, formatRuntime, formatBudget, formatRevenue, formatGenres, formatProductionCompanies, formatSpokenLanguages, formatProductionCountries } from '../../utils/movieUtils';
import { colors } from '../../constants/colors';
import { CustomHeader } from '../../components/CustomHeader/CustomHeader';
import { styles } from './MovieDetail.style';

const { width, height } = Dimensions.get('window');

export function MovieDetail() {
  const navigation = useAppNavigation<'MovieDetail'>();
  const movieId = (navigation.getState().routes.find(route => route.name === 'MovieDetail')?.params as any)?.movieId;

  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const scrollY = new Animated.Value(0);

  useEffect(() => {
    if (movieId) {
      fetchMovieDetails();
    } else {
      setError('Film ID bulunamadı');
      setLoading(false);
    }
  }, [movieId]);

  const fetchMovieDetails = async () => {
    try {
      setLoading(true);
      setError(null);
      const movieData = await tmdbService.getMovieDetails(movieId);
      setMovie(movieData);
    } catch (err) {
      setError('Film detayları yüklenirken bir hata oluştu');
      console.error('Error fetching movie details:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.blue} />
        <Text style={styles.loadingText}>Film detayları yükleniyor...</Text>
      </View>
    );
  }

  if (error || !movie) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>
          {error || 'Film bulunamadı'}
        </Text>
        <TouchableOpacity style={styles.retryButton} onPress={fetchMovieDetails}>
          <Text style={styles.retryButtonText}>Tekrar Dene</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CustomHeader
        title={movie.title || 'Film Detayı'}
        showBackButton={true}
        onBackPress={() => navigation.goBack()}
        scrollY={scrollY}
      />

      <Animated.ScrollView
        style={styles.scrollView}
        bounces={false}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={8}
      >
        <View style={styles.heroSection}>
          <Image
            source={{
              uri: movie.backdrop_path
                ? getBackdropUrl(movie.backdrop_path, 'w780', '780x439')
                : 'https://via.placeholder.com/780x439/666666/ffffff?text=Resim+Yok'
            }}
            style={styles.backdropImage}
            resizeMode="cover"
          />
          <View style={styles.heroOverlay}>
            <View style={styles.heroContent}>
              <Image
                source={{
                  uri: movie.poster_path
                    ? getPosterUrl(movie.poster_path, 'w342', '342x513')
                    : 'https://via.placeholder.com/342x513/666666/ffffff?text=Poster+Yok'
                }}
                style={styles.posterImage}
                resizeMode="cover"
              />
              <View style={styles.heroInfo}>
                <Text style={styles.movieTitle}>{movie.title || 'İsimsiz Film'}</Text>
                <Text style={styles.movieYear}>{movie.release_date ? formatDate(movie.release_date) : 'Tarih Bilinmiyor'}</Text>
                <View style={styles.ratingContainer}>
                  <Text style={styles.ratingText}>⭐ {formatRating(movie.vote_average)}</Text>
                  <Text style={styles.voteCount}>({movie.vote_count ? movie.vote_count.toLocaleString() : '0'} oy)</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.contentSection}>
          {movie.tagline && movie.tagline.trim() !== '' && (
            <View style={styles.section}>
              <Text style={styles.taglineText}>"{movie.tagline}"</Text>
            </View>
          )}

          {movie.overview && movie.overview.trim() !== '' && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Özet</Text>
              <Text style={styles.overviewText}>{movie.overview}</Text>
            </View>
          )}

          {movie.genres && movie.genres.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Türler</Text>
              <View style={styles.genresContainer}>
                {movie.genres.map((genre, index) => (
                  <View key={index} style={styles.genreItem}>
                    <Text style={styles.genreText}>{genre.name}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          <View style={styles.statsSection}>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Puan</Text>
              <Text style={styles.statValue}>⭐ {formatRating(movie.vote_average)}</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Oy Sayısı</Text>
              <Text style={styles.statValue}>{movie.vote_count ? movie.vote_count.toLocaleString() : '0'}</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Popülerlik</Text>
              <Text style={styles.statValue}>{movie.popularity ? movie.popularity.toFixed(0) : '0'}</Text>
            </View>
          </View>

          <View style={styles.detailsSection}>
            {movie.runtime && movie.runtime > 0 && (
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Süre</Text>
                <Text style={styles.detailValue}>{formatRuntime(movie.runtime)}</Text>
              </View>
            )}

            {movie.budget && movie.budget > 0 && (
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Bütçe</Text>
                <Text style={styles.detailValue}>{formatBudget(movie.budget)}</Text>
              </View>
            )}

            {movie.revenue && movie.revenue > 0 && (
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Gelir</Text>
                <Text style={styles.detailValue}>{formatRevenue(movie.revenue)}</Text>
              </View>
            )}

            {movie.status && movie.status.trim() !== '' && (
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Durum</Text>
                <Text style={styles.detailValue}>{movie.status}</Text>
              </View>
            )}

            {movie.original_language && movie.original_language.trim() !== '' && (
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Orijinal Dil</Text>
                <Text style={styles.detailValue}>{movie.original_language.toUpperCase()}</Text>
              </View>
            )}

            {movie.spoken_languages && movie.spoken_languages.length > 0 && (
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Konuşulan Diller</Text>
                <Text style={styles.detailValue}>{formatSpokenLanguages(movie.spoken_languages)}</Text>
              </View>
            )}

            {movie.production_countries && movie.production_countries.length > 0 && (
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Üretim Ülkeleri</Text>
                <Text style={styles.detailValue}>{formatProductionCountries(movie.production_countries)}</Text>
              </View>
            )}

            {movie.production_companies && movie.production_companies.length > 0 && (
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Üretim Şirketleri</Text>
                <Text style={styles.detailValue}>{formatProductionCompanies(movie.production_companies)}</Text>
              </View>
            )}

            {movie.imdb_id && movie.imdb_id.trim() !== '' && (
              <View style={[styles.detailRow, styles.detailRowLast]}>
                <Text style={styles.detailLabel}>IMDB ID</Text>
                <Text style={styles.detailValue}>{movie.imdb_id}</Text>
              </View>
            )}
          </View>
        </View>
      </Animated.ScrollView>
    </View>
  );
} 