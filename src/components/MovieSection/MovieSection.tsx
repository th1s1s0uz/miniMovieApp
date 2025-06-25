import React, { useCallback, useMemo } from 'react';
import { View, Text, FlatList, Dimensions } from 'react-native';
import { Movie } from '../../services/tmdbService';
import { MovieCard } from '../MovieCard/MovieCard';
import { styles } from './MovieSection.style';

interface MovieSectionProps {
  title: string;
  subtitle: string;
  movies: Movie[];
  onMoviePress: (movie: Movie) => void;
}

const { width: screenWidth } = Dimensions.get('window');
const CARD_WIDTH = (screenWidth - 32) / 2; // 2 sütun, 8px margin her yanda
const CARD_HEIGHT = CARD_WIDTH * 1.5; // 3:2 aspect ratio
const CARD_MARGIN = 8; // Horizontal margin between cards
const ITEM_WIDTH = CARD_WIDTH + CARD_MARGIN * 2; // Total item width including margins

export const MovieSection: React.FC<MovieSectionProps> = ({
  title,
  subtitle,
  movies,
  onMoviePress,
}) => {
  // Memoized render item
  const renderMovie = useCallback(({ item }: { item: Movie }) => (
    <MovieCard movie={item} onPress={onMoviePress} />
  ), [onMoviePress]);

  const keyExtractor = useCallback((item: Movie) => `section-${title}-${item.id}`, [title]);

  const getItemLayout = useCallback((data: any, index: number) => ({
    length: ITEM_WIDTH,
    offset: ITEM_WIDTH * index,
    index,
  }), []);

  const initialNumToRender = useMemo(() => {
    const visibleItems = Math.ceil(screenWidth / ITEM_WIDTH) + 1;
    return Math.min(visibleItems, movies.length);
  }, [movies.length]);

  if (movies.length === 0) {
    return null;
  }

  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{title}</Text>
      </View>
      
      <FlatList
        data={movies}
        renderItem={renderMovie}
        keyExtractor={keyExtractor}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        getItemLayout={getItemLayout}
        initialNumToRender={initialNumToRender}
        removeClippedSubviews={true}
        maxToRenderPerBatch={3}
        windowSize={5}
        contentContainerStyle={styles.flatListContent}
      />
    </View>
  );
};
 