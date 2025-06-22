import React from 'react';
import { View, Text, Image, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Movie } from '../../services/tmdbService';
import { getPosterUrl, formatRating } from '../../utils/movieUtils';
import { colors } from '../../constants/colors';
import { styles } from './MovieBanner.style';

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
  isFavorite = false 
}) => {
  const imageUrl = getPosterUrl(movie.poster_path, 'w500', '500x750');

  const handleShare = () => {
    if (onShare) {
      onShare(movie);
    }
  };

  const handleFavorite = () => {
    if (onFavorite) {
      onFavorite(movie);
    }
  };

  return (
    <TouchableOpacity 
      style={styles.container} 
      onPress={() => onPress(movie)}
      activeOpacity={0.9}
    >
      <Image 
        source={{ uri: imageUrl }} 
        style={styles.backgroundImage}
        resizeMode="cover"
      />
      
      <View style={styles.content}>
        {/* Top Section - Action Buttons */}
        <View style={styles.topSection}>
          <View style={styles.actionButtons}>
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={handleShare}
              activeOpacity={0.8}
            >
              <Ionicons 
                name="share-outline" 
                size={20} 
                color={colors.white} 
              />
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={handleFavorite}
              activeOpacity={0.8}
            >
              <Ionicons 
                name={isFavorite ? "heart" : "heart-outline"} 
                size={20} 
                color={isFavorite ? colors.blue : colors.white} 
              />
            </TouchableOpacity>
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
            
            <TouchableOpacity 
              style={styles.exploreButton}
              onPress={() => onPress(movie)}
              activeOpacity={0.8}
            >
              <Text style={styles.exploreButtonText}>İncele</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};