import React, { useState, useCallback } from 'react';
import { View, Text, ActivityIndicator, Animated, RefreshControl } from 'react-native';
import { useAppNavigation } from '../../navigation/AppNavigatorPaths';
import AppNavigatorPaths from '../../navigation/AppNavigatorPaths';
import { CustomHeader } from '../../components/CustomHeader/CustomHeader';
import { HomeContent } from '../../components/HomeContent/HomeContent';
import { Movie, tmdbService } from '../../services/tmdbService';
import { colors } from '../../constants/colors';
import { useMovies } from '../../hooks/useMovies';
import { styles } from './Home.style';

export function Home() {
  const navigation = useAppNavigation<keyof typeof AppNavigatorPaths>();
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

  const handleMoviePress = (movie: Movie) => {
    navigation.navigate('MovieDetail', { movieId: movie.id });
  };

  const handleSearch = useCallback(async (query: string) => {
    console.log('🎬 Home handleSearch called:', { query, timestamp: new Date().toISOString() });
    
    if (!query.trim()) {
      console.log('🎬 Clearing search results');
      setSearchResults([]);
      setHasSearched(false);
      return;
    }

    console.log('🎬 Starting search for:', query);
    setIsSearching(true);
    try {
      const response = await tmdbService.searchMovies(query);
      console.log('🎬 Search completed:', { query, resultsCount: response.results.length });
      setSearchResults(response.results);
      setHasSearched(true);
    } catch (error) {
      console.error('🎬 Search error:', error);
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
          bounces={false}
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

