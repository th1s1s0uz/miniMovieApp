import React from 'react';
import { View, Text, Image, TouchableOpacity, Dimensions } from 'react-native';
import { Movie } from '../../services/tmdbService';
import { tmdbService } from '../../services/tmdbService';
import { styles } from './MovieBanner.style';

interface MovieBannerProps {
  movie: Movie;
  onPress: (movie: Movie) => void;
}

export const MovieBanner: React.FC<MovieBannerProps> = ({ movie, onPress }) => {
  const imageUrl = movie.poster_path 
    ? tmdbService.getImageUrl(movie.poster_path, 'w500')
    : 'https://via.placeholder.com/400x600/333/666?text=No+Image';

  return (
    <TouchableOpacity 
      style={styles.container} 
      onPress={() => onPress(movie)}
      activeOpacity={0.9}
    >
      <Image 
        source={{ uri: imageUrl }} 
        style={styles.backgroundImage}
        resizeMode="contain"
      />
      <View style={styles.overlay}>
        <View style={styles.content}>
          <View style={styles.header}>
            <View style={styles.ratingContainer}>
              <Text style={styles.rating}>⭐ {movie.vote_average.toFixed(1)}</Text>
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
      </View>
    </TouchableOpacity>
  );
};