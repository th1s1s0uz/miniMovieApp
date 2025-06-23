import React from 'react';
import { View, Text, Image, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Movie } from '../../services/tmdbService';
import { getPosterUrl, formatRating } from '../../utils/movieUtils';
import { colors } from '../../constants/colors';
import { styles } from './MovieBanner.style';
import { Button } from '../Button/Button';
import { useFavorites } from '../../hooks/useFavorites';

interface MovieBannerProps {
  movie: Movie;
  onPress: (movie: Movie) => void;
  onShare?: (movie: Movie) => void;
  onFavorite?: (movie: Movie) => void;
  isFavorite?: boolean;
}

export const MovieBanner: React.FC<MovieBannerProps> = ({ 
  movie, 
  onPress, 
  onShare, 
  onFavorite, 
  isFavorite: propIsFavorite = false 
}) => {
  const { toggleFavoriteMovie, isFavorite } = useFavorites();
  const imageUrl = getPosterUrl(movie.poster_path, 'w500', '500x750');

  const handleShare = () => {
    if (onShare) {
      onShare(movie);
    }
  };

  const handleFavorite = () => {
    toggleFavoriteMovie(movie);
    if (onFavorite) {
      onFavorite(movie);
    }
  };

  // Use Redux state if no prop is provided, otherwise use prop
  const isMovieFavorite = propIsFavorite !== false ? propIsFavorite : isFavorite(movie.id);

  return (
    <View 
      style={styles.container} 
    >
      <Image 
        source={{ uri: imageUrl }} 
        style={styles.backgroundImage}
        resizeMode="cover"
      />
      
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.3)', 'rgba(0,0,0,0.8)']}
        locations={[0, 0.5, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.gradientOverlay}
      />
      
      <View style={styles.content}>
        <View style={styles.topSection}>
          <View style={styles.actionButtons}>
            <Button
              title=""
              onPress={handleShare}
              backgroundColor="rgba(0, 0, 0, 0.4)"
              textColor={colors.white}
              style={styles.actionButton}
              icon="share-outline"
              iconSize={20}
              iconColor={colors.white}
            />
            
            <Button
              title=""
              onPress={handleFavorite}
              backgroundColor="rgba(0, 0, 0, 0.4)"
              textColor={colors.white}
              style={styles.actionButton}
              icon={isMovieFavorite ? "heart" : "heart-outline"}
              iconSize={20}
              iconColor={isMovieFavorite ? colors.blue : colors.white}
            />
          </View>
        </View>
        
        {/* Bottom Section - Content */}
        <View style={styles.bottomContent}>
          <Text style={styles.title} numberOfLines={2}>
            {movie.title}
          </Text>
          
          <View style={styles.bottomActions}>
            <View style={styles.leftInfo}>
              <Text style={styles.rating}>⭐ {formatRating(movie.vote_average)}</Text>
              <Text style={styles.releaseDate}>
                {new Date(movie.release_date).getFullYear()}
              </Text>
            </View>
            <Button
              title="İncele"
              onPress={() => onPress(movie)}
              gradientColors={[colors.blue, '#2a8fd9', '#1a6bb8']}
              gradientLocations={[0, 0.5, 1]}
              gradientStart={{ x: 0, y: 0 }}
              gradientEnd={{ x: 1, y: 0 }}
              textColor={colors.white}
              style={styles.exploreButton}
              icon="play"
              iconSize={18}
              iconColor={colors.white}
              iconPosition="left"
            />
          </View>
        </View>
      </View>
    </View>
  );
};