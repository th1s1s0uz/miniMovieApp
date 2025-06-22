import React, { useMemo } from 'react';
import { View, ScrollView, RefreshControl, StyleSheet } from 'react-native';
import { Movie } from '../../services/tmdbService';
import { MovieBanner } from '../MovieBanner/MovieBanner';
import { MovieSection } from '../MovieSection/MovieSection';
import { colors } from '../../constants/colors';

interface HomeContentProps {
  trendingMovies: Movie[];
  popularMovies: Movie[];
  nowPlayingMovies: Movie[];
  upcomingMovies: Movie[];
  topRatedMovies: Movie[];
  discoverMovies: Movie[];
  onMoviePress: (movie: Movie) => void;
  refreshing: boolean;
  onRefresh: () => void;
}

export const HomeContent: React.FC<HomeContentProps> = ({
  trendingMovies,
  popularMovies,
  nowPlayingMovies,
  upcomingMovies,
  topRatedMovies,
  discoverMovies,
  onMoviePress,
  refreshing,
  onRefresh,
}) => {
  // Get featured movie for banner (random from trending movies) - useMemo ile sabit
  const featuredMovie = useMemo((): Movie | null => {
    if (trendingMovies.length > 0) {
      const randomIndex = Math.floor(Math.random() * trendingMovies.length);
      return trendingMovies[randomIndex];
    }
    return null;
  }, [trendingMovies]); // Sadece trendingMovies değiştiğinde yeniden hesapla

  const renderBanner = () => {
    if (!featuredMovie) return null;

    return (
      <MovieBanner 
        movie={featuredMovie} 
        onPress={onMoviePress}
      />
    );
  };

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={[colors.green]}
          tintColor={colors.green}
        />
      }
      showsVerticalScrollIndicator={false}
    >
      {renderBanner()}
      
      <MovieSection
        title="Trend Filmler"
        subtitle="Bugün en çok konuşulan filmler"
        movies={trendingMovies}
        onMoviePress={onMoviePress}
      />
      
      <MovieSection
        title="En Popüler Filmler"
        subtitle="Şu anda en çok izlenen filmler"
        movies={popularMovies}
        onMoviePress={onMoviePress}
      />
      
      <MovieSection
        title="Vizyondaki Filmler"
        subtitle="Sinemalarda şu anda gösterilen filmler"
        movies={nowPlayingMovies}
        onMoviePress={onMoviePress}
      />
      
      <MovieSection
        title="Yakında Gelecek Filmler"
        subtitle="Çok yakında vizyona girecek filmler"
        movies={upcomingMovies}
        onMoviePress={onMoviePress}
      />
      
      <MovieSection
        title="En Çok Oylanan Filmler"
        subtitle="Kullanıcılar tarafından en yüksek puan alan filmler"
        movies={topRatedMovies}
        onMoviePress={onMoviePress}
      />
      
      <MovieSection
        title="Keşfet"
        subtitle="Yüksek puanlı gizli hazineler"
        movies={discoverMovies}
        onMoviePress={onMoviePress}
      />
    </ScrollView>
  );
};