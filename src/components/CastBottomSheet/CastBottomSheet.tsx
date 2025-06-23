import React from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator, FlatList } from 'react-native';
import CustomBottomSheet from '../BottomSheet/BottomSheet';
import { colors } from '../../constants/colors';
import { CastMember, Person, tmdbService } from '../../services/tmdbService';
import { styles } from './CastBottomSheet.style';
import { LinearGradient } from 'expo-linear-gradient';

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
  const [personDetails, setPersonDetails] = React.useState<Person | null>(null);
  const [loadingPerson, setLoadingPerson] = React.useState(false);

  const getImageUrl = (path?: string) => {
    if (!path) return null;
    return `https://image.tmdb.org/t/p/w200${path}`;
  };

  React.useEffect(() => {
    if (selectedCastMember) {
      fetchPersonDetails(selectedCastMember.id);
    }
  }, [selectedCastMember]);

  const fetchPersonDetails = async (personId: number) => {
    try {
      setLoadingPerson(true);
      const details = await tmdbService.getPersonDetails(personId);
      setPersonDetails(details);
    } catch (error) {
    } finally {
      setLoadingPerson(false);
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Bilinmiyor';
    return new Date(dateString).toLocaleDateString('tr-TR');
  };

  

  const renderMovieItem = ({ item: movie }: { item: any }) => (
    <View style={styles.movieItem}>
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
    </View>
  );

  const renderCastMemberDetails = () => (
    <View style={styles.container}>
      {loadingPerson ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.blue} />
          <Text style={styles.loadingText}>Oyuncu bilgileri yükleniyor...</Text>
        </View>
      ) : personDetails ? (
        <>
          <View style={styles.castHeader}>
            <LinearGradient
              colors={['rgba(255,255,255,0.1)', 'rgba(255,255,255,0.05)', 'rgba(255,255,255,0.02)']}
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
              colors={['rgba(255,255,255,0.08)', 'rgba(255,255,255,0.04)', 'rgba(255,255,255,0.02)']}
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
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.moviesList}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderMovieItem}
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
  );

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