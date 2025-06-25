import React, { useEffect, useCallback, useMemo } from 'react';
import { 
  View, 
  Text, 
  Image, 
  TouchableOpacity, 
  Animated,
  FlatList,
  Dimensions
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAppNavigation } from '../../navigation/AppNavigatorPaths';
import { Movie, MovieCredits } from '../../services/tmdbService';
import { formatRating, formatDate, getPosterUrl, getBackdropUrl, formatRuntime, formatBudget, formatRevenue, formatGenres, formatProductionCompanies, formatSpokenLanguages, formatProductionCountries } from '../../utils/movieUtils';
import { colors } from '../../constants/colors';
import { CustomHeader } from '../../components/CustomHeader/CustomHeader';
import { CustomLoader } from '../../components/CustomLoader/CustomLoader';
import { styles } from './MovieDetail.style';
import { useFavorites } from '../../hooks/useFavorites';
import { useMovieDetails } from '../../hooks/useMovieDetails';
import { Button } from '../../components/Button/Button';
import { CastMember } from '../../services/tmdbService';
import CastBottomSheet from '../../components/CastBottomSheet/CastBottomSheet';
import { MovieCard } from '../../components/MovieCard/MovieCard';
import { CastCard } from '../../components/CastCard/CastCard';
import { LinearGradient } from 'expo-linear-gradient';

const { width: screenWidth } = Dimensions.get('window');

// Cast card dimensions
const CAST_CARD_WIDTH = 80;
const CAST_CARD_MARGIN = 16;
const CAST_ITEM_WIDTH = CAST_CARD_WIDTH + CAST_CARD_MARGIN;

// Similar movie card dimensions (same as MovieCard)
const SIMILAR_CARD_WIDTH = (screenWidth - 32) / 2;
const SIMILAR_CARD_MARGIN = 8;
const SIMILAR_ITEM_WIDTH = SIMILAR_CARD_WIDTH + SIMILAR_CARD_MARGIN * 2;

export function MovieDetail() {
  const navigation = useAppNavigation<'MovieDetail'>();
  const movieId = (navigation.getState().routes.find(route => route.name === 'MovieDetail')?.params as any)?.movieId;
  const { toggleFavorite, isFavorite } = useFavorites();
  
  const {
    movie,
    credits,
    similarMovies,
    isLoading,
    error,
    fetchAllMovieData,
    clearMovieData,
  } = useMovieDetails();

  const [isCastBottomSheetVisible, setIsCastBottomSheetVisible] = React.useState(false);
  const [selectedCastMember, setSelectedCastMember] = React.useState<CastMember | null>(null);
  const scrollY = new Animated.Value(0);

  useEffect(() => {
    if (movieId) {
      fetchAllMovieData(movieId);
    }

    // Cleanup when component unmounts
    return () => {
      clearMovieData();
    };
  }, [movieId, fetchAllMovieData, clearMovieData]);

  const handleFavoritePress = () => {
    if (movie) {
      toggleFavorite(movie);
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

  // Memoized render functions for FlatLists
  const renderCastItem = useCallback(({ item }: { item: CastMember }) => (
    <CastCard
      actor={item}
      onPress={handleCastPress}
    />
  ), [handleCastPress]);

  const renderSimilarMovieItem = useCallback(({ item }: { item: Movie }) => (
    <View style={styles.similarMovieItem}>
      <MovieCard
        movie={item}
        onPress={handleSimilarMoviePress}
      />
    </View>
  ), [handleSimilarMoviePress]);

  // Memoized key extractors
  const castKeyExtractor = useCallback((item: CastMember) => `cast-${item.id}`, []);
  const similarMovieKeyExtractor = useCallback((item: Movie) => `similar-${item.id}`, []);

  // Memoized getItemLayout functions
  const getCastItemLayout = useCallback((data: any, index: number) => ({
    length: CAST_ITEM_WIDTH,
    offset: CAST_ITEM_WIDTH * index,
    index,
  }), []);

  const getSimilarMovieItemLayout = useCallback((data: any, index: number) => ({
    length: SIMILAR_ITEM_WIDTH,
    offset: SIMILAR_ITEM_WIDTH * index,
    index,
  }), []);

  // Calculate initial number to render
  const castInitialNumToRender = useMemo(() => {
    const visibleItems = Math.ceil(screenWidth / CAST_ITEM_WIDTH) + 1;
    return Math.min(visibleItems, credits?.cast?.length || 0);
  }, [credits?.cast?.length]);

  const similarMoviesInitialNumToRender = useMemo(() => {
    const visibleItems = Math.ceil(screenWidth / SIMILAR_ITEM_WIDTH) + 1;
    return Math.min(visibleItems, similarMovies?.length || 0);
  }, [similarMovies?.length]);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <CustomLoader
          size="large"
          text="Film detayları yükleniyor..."
          showText={true}
        />
      </View>
    );
  }

  if (error || !movie) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>
          {error || 'Film bulunamadı'}
        </Text>
        <TouchableOpacity style={styles.retryButton} onPress={() => movieId && fetchAllMovieData(movieId)}>
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
              <View style={styles.posterContainer}>
                <Image 
                  source={{ 
                    uri: movie.poster_path 
                      ? getPosterUrl(movie.poster_path, 'w342', '342x513')
                      : 'https://via.placeholder.com/342x513/666666/ffffff?text=Poster+Yok'
                  }}
                  style={styles.posterImage}
                  resizeMode="cover"
                />
                <TouchableOpacity 
                  style={styles.favoriteButton}
                  onPress={handleFavoritePress}
                  activeOpacity={0.8}
                >
                  <Ionicons 
                    name={isMovieFavorite ? "heart" : "heart-outline"} 
                    size={28} 
                    color={isMovieFavorite ? colors.blue : colors.white} 
                  />
                </TouchableOpacity>
              </View>
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
              </View>
              <Text style={styles.overviewText}>{movie.overview}</Text>
            </View>
          )}

          {(!movie.overview || movie.overview.trim() === '') && (
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Özet</Text>
              </View>
              <Text style={styles.overviewText}>Bu film için henüz özet bulunmuyor.</Text>
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
                renderItem={renderCastItem}
                keyExtractor={castKeyExtractor}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.castListContainer}
                getItemLayout={getCastItemLayout}
                initialNumToRender={castInitialNumToRender}
                removeClippedSubviews={true}
                maxToRenderPerBatch={4}
                windowSize={5}
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
                renderItem={renderSimilarMovieItem}
                keyExtractor={similarMovieKeyExtractor}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.similarMoviesContainer}
                getItemLayout={getSimilarMovieItemLayout}
                initialNumToRender={similarMoviesInitialNumToRender}
                removeClippedSubviews={true}
                maxToRenderPerBatch={3}
                windowSize={5}
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