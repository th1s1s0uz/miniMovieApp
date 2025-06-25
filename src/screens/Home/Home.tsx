import React, { useCallback, useEffect, useRef } from 'react';
import { View, Text, Animated, RefreshControl } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useAppNavigation } from '../../navigation/AppNavigatorPaths';
import AppNavigatorPaths from '../../navigation/AppNavigatorPaths';
import { CustomHeader } from '../../components/CustomHeader/CustomHeader';
import { HomeContent } from '../../components/HomeContent/HomeContent';
import { CustomLoader } from '../../components/CustomLoader/CustomLoader';
import { Movie } from '../../services/tmdbService';
import { colors } from '../../constants/colors';
import { useMovies } from '../../hooks/useMovies';
import { useFavorites } from '../../hooks/useFavorites';
import { useSearch } from '../../hooks/useSearch';
import { useAppSelector } from '../../store/hooks';
import { styles } from './Home.style';

export function Home() {
  const navigation = useAppNavigation<keyof typeof AppNavigatorPaths>();
  const scrollY = new Animated.Value(0);
  const scrollViewRef = useRef<any>(null);
  
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

  // Favorites hook
  const { loadFavorites } = useFavorites();

  // Search hook
  const { 
    searchResults, 
    searchQuery,
    loading: searchLoading, 
    error: searchError, 
    hasSearched,
    searchMovies, 
    clearSearch 
  } = useSearch();

  // Load favorites from storage when component mounts
  useEffect(() => {
    loadFavorites();
  }, []);

  // Scroll to top only when switching to search mode
  useEffect(() => {
    if (scrollViewRef.current && hasSearched) {
      scrollViewRef.current.scrollTo({ y: 0, animated: true });
    }
  }, [hasSearched]);

  const handleMoviePress = (movie: Movie) => {
    navigation.navigate('MovieDetail', { movieId: movie.id });
  };

  const handleSearch = useCallback((query: string) => {
    searchMovies(query);
  }, [searchMovies]);

  const handleClearSearch = useCallback(() => {
    clearSearch();
  }, [clearSearch]);

  const renderLoading = () => (
    <View style={styles.loadingContainer}>
      <CustomLoader
        size="large"
        text="Filmler yükleniyor..."
        showText={true}
      />
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
      if (searchLoading) {
        return (
          <View style={styles.loadingContainer}>
            <CustomLoader
              size="medium"
              text="Aranıyor..."
              showText={true}
            />
          </View>
        );
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
            scrollY={scrollY}
          />
        );
      } else {
        return (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Arama sonucu bulunamadı</Text>
          </View>
        );
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
          scrollY={scrollY}
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
          isSearchLoading={searchLoading}
          searchQuery={searchQuery}
          scrollY={scrollY}
        />
        {renderLoading()}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={colors.gradientBg}
        locations={[0, 0.3, 1]}
        start={{ x: 1, y: 1 }}
        end={{ x: 0, y: 0 }}
        style={styles.gradientBg}
      />
      <CustomHeader
        showSearch={true}
        onSearch={handleSearch}
        onClearSearch={handleClearSearch}
        isSearchLoading={searchLoading}
        searchQuery={searchQuery}
        scrollY={scrollY}
      />
      {renderContent()}
    </View>
  );
}

