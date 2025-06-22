import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { useAppNavigation } from '../../navigation/AppNavigatorPaths';
import AppNavigatorPaths from '../../navigation/AppNavigatorPaths';
import { CustomHeader } from '../../components/CustomHeader/CustomHeader';
import { HomeContent } from '../../components/HomeContent/HomeContent';
import { Movie } from '../../services/tmdbService';
import { colors } from '../../constants/colors';
import { useMovies } from '../../hooks/useMovies';
import { styles } from './Home.style';

export function Home() {
  const navigation = useAppNavigation<keyof typeof AppNavigatorPaths>();
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

  const renderLoading = () => (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color={colors.green} />
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

  if (loading) {
    return (
      <View style={styles.container}>
        <CustomHeader title="Mini Movie App" />
        {renderLoading()}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CustomHeader title="Mini Movie App" />
      {error ? (
        renderError()
      ) : (
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
      )}
    </View>
  );
}

