import React, { useEffect, useCallback, useMemo } from 'react';
import { Text } from '@react-navigation/elements';
import { View, TouchableOpacity, Animated, FlatList, Dimensions, RefreshControl, ListRenderItem } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CustomHeader } from '../../components/CustomHeader/CustomHeader';
import { styles } from './Favorites.style';
import { colors } from '../../constants/colors';
import { LinearGradient } from 'expo-linear-gradient';
import { useFavorites } from '../../hooks/useFavorites';
import { useAppNavigation } from '../../navigation/AppNavigatorPaths';
import { MovieCard } from '../../components/MovieCard/MovieCard';
import { Movie } from '../../services/tmdbService';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList<Movie>);

const GRID_PADDING = 16;
const ITEM_SPACING = 12;
const ITEM_WIDTH = (screenWidth - (GRID_PADDING * 2) - ITEM_SPACING) / 2;
const ITEM_HEIGHT = ITEM_WIDTH * 1.5;
const ITEM_MARGIN = 6;

export function Favorites() {
  const navigation = useAppNavigation();
  const { favorites, loading, loadFavorites } = useFavorites();
  const scrollY = new Animated.Value(0);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    loadFavorites();
  }, []);

  const handleMoviePress = useCallback((movie: Movie) => {
    navigation.navigate('MovieDetail', { movieId: movie.id });
  }, [navigation]);

  const renderMovieCard: ListRenderItem<Movie> = useCallback(({ item }) => (
    <View style={styles.movieItem}>
      <MovieCard
        movie={item}
        onPress={handleMoviePress}
      />
    </View>
  ), [handleMoviePress]);

  const keyExtractor = useCallback((item: Movie) => `favorite-${item.id}`, []);

  const getItemLayout = useCallback((data: any, index: number) => {
    const rowIndex = Math.floor(index / 2); 
    const rowHeight = ITEM_HEIGHT + ITEM_MARGIN * 2 + 16;
    return {
      length: rowHeight,
      offset: rowHeight * rowIndex,
      index,
    };
  }, []);

  const initialNumToRender = useMemo(() => {
    const visibleRows = Math.ceil(screenHeight / (ITEM_HEIGHT + ITEM_MARGIN * 2 + 16)) + 1;
    const itemsPerRow = 2;
    return Math.min(visibleRows * itemsPerRow, favorites.length);
  }, [favorites.length]);

  const renderEmptyState = useCallback(() => (
    <View style={styles.emptyContainer}>
      <Ionicons name="heart-outline" size={64} color={colors.lightText} />
      <Text style={styles.emptyTitle}>Henüz favori filminiz yok</Text>
      <Text style={styles.emptySubtitle}>
        Filmleri beğenmek için kalp ikonuna tıklayın
      </Text>
    </View>
  ), []);

  const refreshControl = useMemo(() => (
    <RefreshControl
      refreshing={loading}
      onRefresh={loadFavorites}
      colors={[colors.blue]}
      tintColor={colors.blue}
    />
  ), [loading, loadFavorites]);

  const contentContainerStyle = useMemo(() => [
    styles.favoritesContent,
    {
      paddingTop: 60 + insets.top,
      paddingBottom: 60 + insets.bottom,
    },
    favorites.length === 0 && styles.emptyContentContainer
  ], [favorites.length, insets.top, insets.bottom]);

  return (
    <View style={styles.container}>
      <CustomHeader
        title="Favori Filmler"
        scrollY={scrollY}
      />
      <LinearGradient
        colors={colors.gradientBg}
        locations={[0, 0.3, 1]}
        start={{ x: 1, y: 1 }}
        end={{ x: 0, y: 0 }}
        style={styles.gradientBg}
      />
      
      <AnimatedFlatList
        data={favorites}
        renderItem={renderMovieCard}
        keyExtractor={keyExtractor}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        removeClippedSubviews={true}
        maxToRenderPerBatch={8}
        windowSize={7}
        initialNumToRender={initialNumToRender}
        getItemLayout={getItemLayout}
        contentContainerStyle={contentContainerStyle}
        updateCellsBatchingPeriod={50}
        disableVirtualization={false}
        scrollEventThrottle={16}
        onScroll={scrollY ? (event) => {
          const offsetY = event.nativeEvent.contentOffset.y;
          scrollY.setValue(offsetY);
        } : undefined}
        refreshControl={refreshControl}
        ListEmptyComponent={renderEmptyState}
      />
    </View>
  );
}