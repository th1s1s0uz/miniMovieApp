import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Movie } from '../../services/tmdbService';
import { formatRating, formatDate, getPosterUrl } from '../../utils/movieUtils';
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

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress} activeOpacity={0.8}>
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: getPosterUrl(movie.poster_path, 'w342', '342x513')
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