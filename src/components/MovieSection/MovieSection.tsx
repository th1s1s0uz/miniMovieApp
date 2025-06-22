import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { Movie } from '../../services/tmdbService';
import { MovieCard } from '../MovieCard/MovieCard';
import { styles } from './MovieSection.style';

interface MovieSectionProps {
  title: string;
  subtitle: string;
  movies: Movie[];
  onMoviePress: (movie: Movie) => void;
}

export const MovieSection: React.FC<MovieSectionProps> = ({
  title,
  subtitle,
  movies,
  onMoviePress,
}) => {
  const renderMovie = ({ item }: { item: Movie }) => (
    <MovieCard movie={item} onPress={onMoviePress} />
  );

  if (movies.length === 0) {
    return null;
  }

  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <Text style={styles.sectionSubtitle}>{subtitle}</Text>
      </View>
      
      <FlatList
        data={movies}
        renderItem={renderMovie}
        keyExtractor={(item) => `section-${title}-${item.id}`}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalList}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
};
 