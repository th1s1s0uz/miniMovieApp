import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Movie, tmdbService } from '../../services/tmdbService';
import { styles } from './MovieCard.style';

interface MovieCardProps {
  movie: Movie;
  onPress?: (movie: Movie) => void;
}

export const MovieCard: React.FC<MovieCardProps> = ({ movie, onPress }) => {
  const handlePress = () => {
    if (onPress) {
      onPress(movie);
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.getFullYear().toString();
  };

  const formatRating = (rating: number) => {
    return rating.toFixed(1);
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress} activeOpacity={0.8}>
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: tmdbService.getImageUrl(movie.poster_path, 'w342')
          }}
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.ratingContainer}>
          <Text style={styles.ratingText}>★ {formatRating(movie.vote_average)}</Text>
        </View>
      </View>
      
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>
          {movie.title}
        </Text>
        <Text style={styles.year}>
          {formatDate(movie.release_date)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};