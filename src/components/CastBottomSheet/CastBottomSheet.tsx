import React, { useCallback, useMemo } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import CustomBottomSheet from '../BottomSheet/BottomSheet';
import { colors } from '../../constants/colors';
import { CastMember } from '../../services/tmdbService';
import { styles } from './CastBottomSheet.style';
import { LinearGradient } from 'expo-linear-gradient';
import { useAppNavigation } from '../../navigation/AppNavigatorPaths';
import { usePersonDetails } from '../../hooks/useMovieDetails';

const { width: screenWidth } = Dimensions.get('window');

const MOVIE_ITEM_WIDTH = 120;
const MOVIE_ITEM_MARGIN = 12;
const MOVIE_ITEM_TOTAL_WIDTH = MOVIE_ITEM_WIDTH + MOVIE_ITEM_MARGIN;

interface CastBottomSheetProps {
  isVisible: boolean;
  onClose: () => void;
  selectedCastMember: CastMember;
  movieTitle: string;
}

const CastBottomSheet: React.FC<CastBottomSheetProps> = ({
  isVisible,
  onClose,
  selectedCastMember,
  movieTitle,
}) => {
  const navigation = useAppNavigation<'MovieDetail'>();
  const {
    personDetails,
    personLoading,
    personError,
    fetchPersonDetails,
    clearPersonData,
  } = usePersonDetails();

  const getImageUrl = (path?: string) => {
    if (!path) return null;
    return `https://image.tmdb.org/t/p/w200${path}`;
  };

  React.useEffect(() => {
    if (selectedCastMember && isVisible) {
      fetchPersonDetails(selectedCastMember.id);
    }

    return () => {
      clearPersonData();
    };
  }, [selectedCastMember?.id, isVisible, fetchPersonDetails, clearPersonData]);

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Bilinmiyor';
    return new Date(dateString).toLocaleDateString('tr-TR');
  };

  const handleMoviePress = useCallback((movie: any) => {
    onClose();
    setTimeout(() => {
      navigation.navigate('MovieDetail', { movieId: movie.id });
    }, 300);
  }, [onClose, navigation]);

  const renderMovieItem = useCallback(({ item: movie }: { item: any }) => (
    <TouchableOpacity 
      style={styles.movieItem}
      onPress={() => handleMoviePress(movie)}
      activeOpacity={0.7}
    >
      {movie.poster_path ? (
        <Image
          source={{ uri: `https://image.tmdb.org/t/p/w154${movie.poster_path}` }}
          style={styles.moviePoster}
          resizeMode="cover"
        />
      ) : (
        <View style={styles.moviePosterPlaceholder}>
          <Text style={styles.moviePosterPlaceholderText}>
            {movie.title.charAt(0).toUpperCase()}
          </Text>
        </View>
      )}
      <View style={styles.movieInfo}>
        <Text style={styles.movieTitle} numberOfLines={2}>
          {movie.title}
        </Text>
        <Text style={styles.movieCharacter} numberOfLines={1}>
          {movie.character}
        </Text>
        <Text style={styles.movieYear}>
          {movie.release_date ? new Date(movie.release_date).getFullYear() : 'Tarih yok'}
        </Text>
      </View>
    </TouchableOpacity>
  ), [handleMoviePress]);

  const movieKeyExtractor = useCallback((item: any) => `movie-${item.id}`, []);

  const getMovieItemLayout = useCallback((data: any, index: number) => ({
    length: MOVIE_ITEM_TOTAL_WIDTH,
    offset: MOVIE_ITEM_TOTAL_WIDTH * index,
    index,
  }), []);

  const movieInitialNumToRender = useMemo(() => {
    const visibleItems = Math.ceil(screenWidth / MOVIE_ITEM_TOTAL_WIDTH) + 1;
    return Math.min(visibleItems, personDetails?.combined_credits?.cast?.length || 0);
  }, [personDetails?.combined_credits?.cast?.length]);

  const renderCastMemberDetails = useCallback(() => (
    <View style={styles.container}>
      {personLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.blue} />
          <Text style={styles.loadingText}>Oyuncu bilgileri yükleniyor...</Text>
        </View>
      ) : personError ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{personError}</Text>
        </View>
      ) : personDetails ? (
        <>
          <View style={styles.castHeader}>
            <LinearGradient
              colors={colors.bottomSheetGradient}
              style={styles.castHeaderGradient}
            >
              <View style={styles.avatarContainer}>
                {personDetails.profile_path ? (
                  <Image
                    source={{ uri: getImageUrl(personDetails.profile_path)! }}
                    style={styles.avatar}
                    resizeMode="cover"
                  />
                ) : (
                  <View style={styles.placeholderAvatar}>
                    <Text style={styles.placeholderText}>
                      {personDetails.name.charAt(0).toUpperCase()}
                    </Text>
                  </View>
                )}
              </View>
              <View style={styles.castInfo}>
                <Text style={styles.castName}>{personDetails.name}</Text>
                <Text style={styles.castCharacter}>{selectedCastMember.character}</Text>
                {personDetails.known_for_department && (
                  <Text style={styles.castDepartment}>
                    {personDetails.known_for_department}
                  </Text>
                )}
              </View>
            </LinearGradient>
          </View>
          
          <View style={styles.detailsContainer}>
            <LinearGradient
              colors={colors.bottomSheetGradient}
              style={styles.detailsGradient}
            >
              {personDetails.biography && (
                <View style={styles.biographySection}>
                  <Text style={styles.sectionTitle}>Biyografi</Text>
                  <Text style={styles.biographyText}>
                    {personDetails.biography}
                  </Text>
                </View>
              )}

              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Rol</Text>
                <Text style={styles.detailValue}>{selectedCastMember.character}</Text>
              </View>
              
              {personDetails.birthday && (
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Doğum Tarihi</Text>
                  <Text style={styles.detailValue}>{formatDate(personDetails.birthday)}</Text>
                </View>
              )}

              {personDetails.place_of_birth && (
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Doğum Yeri</Text>
                  <Text style={styles.detailValue}>{personDetails.place_of_birth}</Text>
                </View>
              )}

              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Popülerlik</Text>
                <Text style={styles.detailValue}>{personDetails.popularity.toFixed(1)}</Text>
              </View>

              {personDetails.combined_credits && personDetails.combined_credits.cast.length > 0 && (
                <View style={styles.filmographySection}>
                  <Text style={styles.sectionTitle}>Filmografi</Text>
                  <Text style={styles.filmographyCount}>
                    {personDetails.combined_credits.cast.length} film/dizi
                  </Text>
                  
                  <FlatList
                    data={personDetails.combined_credits.cast.slice(0, 20)}
                    renderItem={renderMovieItem}
                    keyExtractor={movieKeyExtractor}
                    horizontal
                    bounces={false}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.moviesList}
                    getItemLayout={getMovieItemLayout}
                    initialNumToRender={movieInitialNumToRender}
                    removeClippedSubviews={true}
                    maxToRenderPerBatch={4}
                    windowSize={5}
                    updateCellsBatchingPeriod={50}
                    scrollEventThrottle={16}
                  />
                </View>
              )}
            </LinearGradient>
          </View>
        </>
      ) : (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Oyuncu bilgileri yüklenemedi.</Text>
        </View>
      )}
    </View>
  ), [personLoading, personError, personDetails, selectedCastMember, renderMovieItem, movieKeyExtractor, getMovieItemLayout, movieInitialNumToRender]);

  return (
    <CustomBottomSheet
      isVisible={isVisible}
      onClose={onClose}
      index={0}
    >
      {renderCastMemberDetails()}
    </CustomBottomSheet>
  );
};

export default CastBottomSheet; 