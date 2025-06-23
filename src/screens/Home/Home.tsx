import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, ActivityIndicator, Animated, RefreshControl } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useAppNavigation } from '../../navigation/AppNavigatorPaths';
import AppNavigatorPaths from '../../navigation/AppNavigatorPaths';
import { CustomHeader } from '../../components/CustomHeader/CustomHeader';
import { HomeContent } from '../../components/HomeContent/HomeContent';
import { Movie, tmdbService } from '../../services/tmdbService';
import { colors } from '../../constants/colors';
import { useMovies } from '../../hooks/useMovies';
import { useAppDispatch } from '../../store/hooks';
import { loadFavorites } from '../../store/favoritesThunks';
import { styles } from './Home.style';

export function Home() {
  const navigation = useAppNavigation<keyof typeof AppNavigatorPaths>();
  const dispatch = useAppDispatch();
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const scrollY = new Animated.Value(0);
  
  const {
    trendingMovies,
    popularMovies,
    nowPlayingMovies,
    upcomingMovies,
    topRatedMovies,
    discoverMovies,
    loading,
    refreshing,
    error,
    onRefresh,
  } = useMovies();

  // Load favorites from storage when component mounts
  useEffect(() => {
    dispatch(loadFavorites());
  }, [dispatch]);

  const handleMoviePress = (movie: Movie) => {
    navigation.navigate('MovieDetail', { movieId: movie.id });
  };

  const handleSearch = useCallback(async (query: string) => {

    if (!query.trim()) {
      setSearchResults([]);
      setHasSearched(false);
      return;
    }

    setIsSearching(true);
    try {
      const response = await tmdbService.searchMovies(query);
      setSearchResults(response.results);
      setHasSearched(true);
    } catch (error) {
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  }, []);

  const handleClearSearch = useCallback(() => {
    setSearchResults([]);
    setHasSearched(false);
  }, []);

  const renderLoading = () => (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color={colors.blue} />
      <Text style={styles.loadingText}>Filmler yükleniyor...</Text>
    </View>
  );

  const renderError = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>
        {error || 'Henüz film bulunmuyor'}
      </Text>
    </View>
  );

  const renderContent = () => {
    if (hasSearched) {
      if (isSearching) {
        return null;
      } else if (searchResults.length > 0) {
  return (
          <HomeContent
            trendingMovies={trendingMovies}
            popularMovies={popularMovies}
            nowPlayingMovies={nowPlayingMovies}
            upcomingMovies={upcomingMovies}
            topRatedMovies={topRatedMovies}
            discoverMovies={discoverMovies}
            searchResults={searchResults}
            onMoviePress={handleMoviePress}
            refreshing={refreshing}
            onRefresh={onRefresh}
            isSearchMode={true}
          />
        );
      } else {
        return null;
      }
    } else if (error) {
      return renderError();
    } else {
      return (
        <HomeContent
          trendingMovies={trendingMovies}
          popularMovies={popularMovies}
          nowPlayingMovies={nowPlayingMovies}
          upcomingMovies={upcomingMovies}
          topRatedMovies={topRatedMovies}
          discoverMovies={discoverMovies}
          onMoviePress={handleMoviePress}
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      );
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <CustomHeader
          showSearch={true}
          onSearch={handleSearch}
          onClearSearch={handleClearSearch}
          isSearchLoading={isSearching}
          scrollY={scrollY}
        />
        {renderLoading()}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[
          '#1a3d6d', // Sağ alt: açık mavi
          '#0d0d0d',   // Üst: siyah
          '#0d0d0d',   // Orta: siyah
        ]}
        locations={[0, 0.3, 1]}
        start={{ x: 1, y: 1 }}   // Sağ alt köşe
        end={{ x: 0, y: 0 }}     // Sol üst köşe
        style={styles.gradientBg}
      />
      <CustomHeader
        showSearch={true}
        onSearch={handleSearch}
        onClearSearch={handleClearSearch}
        isSearchLoading={isSearching}
        scrollY={scrollY}
      />
      {hasSearched && isSearching ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.blue} />
          <Text style={styles.loadingText}>Aranıyor...</Text>
        </View>
      ) : hasSearched && searchResults.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Arama sonucu bulunamadı</Text>
        </View>
      ) : (
        <Animated.ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: true }
          )}
          scrollEventThrottle={8}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={colors.blue}
              colors={[colors.blue]}
            />
          }
        >
          {renderContent()}
        </Animated.ScrollView>
      )}
    </View>
  );
}

