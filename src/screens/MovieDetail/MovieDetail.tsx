import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  Image, 
  TouchableOpacity, 
  ActivityIndicator,
  Animated,
  FlatList
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAppNavigation } from '../../navigation/AppNavigatorPaths';
import { Movie, useTmdbApi, MovieCredits } from '../../services/tmdbService';
import { formatRating, formatDate, getPosterUrl, getBackdropUrl, formatRuntime, formatBudget, formatRevenue, formatGenres, formatProductionCompanies, formatSpokenLanguages, formatProductionCountries } from '../../utils/movieUtils';
import { colors } from '../../constants/colors';
import { CustomHeader } from '../../components/CustomHeader/CustomHeader';
import { styles } from './MovieDetail.style';
import { useFavorites } from '../../hooks/useFavorites';
import { Button } from '../../components/Button/Button';
import { CastMember } from '../../services/tmdbService';
import CastBottomSheet from '../../components/CastBottomSheet/CastBottomSheet';
import { MovieCard } from '../../components/MovieCard/MovieCard';
import { CastCard } from '../../components/CastCard/CastCard';

export function MovieDetail() {
  const navigation = useAppNavigation<'MovieDetail'>();
  const movieId = (navigation.getState().routes.find(route => route.name === 'MovieDetail')?.params as any)?.movieId;
  const { toggleFavoriteMovie, isFavorite } = useFavorites();
  
  const [movie, setMovie] = useState<Movie | null>(null);
  const [credits, setCredits] = useState<MovieCredits | null>(null);
  const [similarMovies, setSimilarMovies] = useState<Movie[]>([]);
  const [isCastBottomSheetVisible, setIsCastBottomSheetVisible] = useState(false);
  const [selectedCastMember, setSelectedCastMember] = useState<CastMember | null>(null);
  const scrollY = new Animated.Value(0);

  // API hooks
  const movieDetailsApi = useTmdbApi.useMovieDetails();
  const movieCreditsApi = useTmdbApi.useMovieCredits();
  const similarMoviesApi = useTmdbApi.useSimilarMovies();

  useEffect(() => {
    if (movieId) {
      fetchMovieDetails();
    }
  }, [movieId]);

  const fetchMovieDetails = async () => {
    if (!movieId) return;

    try {
      // Fetch all movie data in parallel
      const [movieData, creditsData, similarData] = await Promise.all([
        movieDetailsApi.execute(movieId),
        movieCreditsApi.execute(movieId),
        similarMoviesApi.execute(movieId)
      ]);

      if (movieData) setMovie(movieData);
      if (creditsData) setCredits(creditsData);
      if (similarData) setSimilarMovies(similarData.results);
    } catch (err) {
      // Error handling is managed by the useApi hook
      console.error('Error in fetchMovieDetails:', err);
    }
  };

  const handleFavoritePress = () => {
    if (movie) {
      toggleFavoriteMovie(movie);
    }
  };

  const handleCastBottomSheetClose = () => {
    setIsCastBottomSheetVisible(false);
    setSelectedCastMember(null);
  };

  const handleSimilarMoviePress = (similarMovie: Movie) => {
    navigation.replace('MovieDetail', { movieId: similarMovie.id });
  };

  const handleCastPress = (actor: CastMember) => {
    setSelectedCastMember(actor);
    setIsCastBottomSheetVisible(true);
  };

  // Combine loading states
  const isLoading = movieDetailsApi.loading || movieCreditsApi.loading || similarMoviesApi.loading;
  
  // Combine error states
  const error = movieDetailsApi.error || movieCreditsApi.error || similarMoviesApi.error;

  if (isLoading) {
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

  const isMovieFavorite = isFavorite(movie.id);

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
              <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Özet</Text>
                <Button
                  title=""
                  onPress={handleFavoritePress}
                  icon={isMovieFavorite ? "heart" : "heart-outline"}
                  iconSize={24}
                  iconColor={isMovieFavorite ? colors.blue : colors.white}
                  backgroundColor="rgba(0, 0, 0, 0.6)"
                  style={styles.overviewFavoriteButton}
                />
              </View>
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

          {credits && credits.cast && credits.cast.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Oyuncular</Text>
              <FlatList
                data={credits.cast.slice(0, 20)}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.castListContainer}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item: actor }) => (
                  <CastCard
                    actor={actor}
                    onPress={handleCastPress}
                  />
                )}
              />
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
          {similarMovies && similarMovies.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Benzer Filmler</Text>
              <FlatList
                data={similarMovies.slice(0, 10)}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.similarMoviesContainer}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item: similarMovie }) => (
                  <View style={styles.similarMovieItem}>
                    <MovieCard
                      movie={similarMovie}
                      onPress={handleSimilarMoviePress}
                    />
                  </View>
                )}
              />
            </View>
          )}
        </View>
      </Animated.ScrollView>
      {isCastBottomSheetVisible && selectedCastMember && (
        <CastBottomSheet
          isVisible={isCastBottomSheetVisible}
          onClose={handleCastBottomSheetClose}
          selectedCastMember={selectedCastMember}
          movieTitle={movie?.title || 'Film'}
        />
      )}
    </View>
  );
} 