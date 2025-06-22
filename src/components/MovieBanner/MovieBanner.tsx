import React from 'react';
import { View, Text, Image, TouchableOpacity, Dimensions } from 'react-native';
import { Movie } from '../../services/tmdbService';
import { getPosterUrl, formatRating } from '../../utils/movieUtils';
import { styles } from './MovieBanner.style';

interface MovieBannerProps {
  movie: Movie;
  onPress: (movie: Movie) => void;
}

export const MovieBanner: React.FC<MovieBannerProps> = ({ movie, onPress }) => {
  const imageUrl = getPosterUrl(movie.poster_path, 'w500', '500x750');

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
        <View style={styles.header}>
          <View style={styles.ratingContainer}>
            <Text style={styles.rating}>⭐ {formatRating(movie.vote_average)}</Text>
          </View>
          <Text style={styles.releaseDate}>
            {new Date(movie.release_date).getFullYear()}
          </Text>
        </View>
        
        <View style={styles.bottomContent}>
          <Text style={styles.title} numberOfLines={2}>
            {movie.title}
          </Text>
          
          <TouchableOpacity 
            style={styles.exploreButton}
            onPress={() => onPress(movie)}
            activeOpacity={0.8}
          >
            <Text style={styles.exploreButtonText}>İncele</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};