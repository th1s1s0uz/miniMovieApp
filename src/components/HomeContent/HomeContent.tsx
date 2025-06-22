import React, { useMemo } from 'react';
import { View, ScrollView, RefreshControl } from 'react-native';
import { Movie } from '../../services/tmdbService';
import { MovieBanner } from '../MovieBanner/MovieBanner';
import { MovieSection } from '../MovieSection/MovieSection';
import { MovieCard } from '../MovieCard/MovieCard';
import { colors } from '../../constants/colors';
import { styles } from './HomeContent.style';

interface HomeContentProps {
    trendingMovies: Movie[];
    popularMovies: Movie[];
    nowPlayingMovies: Movie[];
    upcomingMovies: Movie[];
    topRatedMovies: Movie[];
    discoverMovies: Movie[];
    searchResults?: Movie[];
    onMoviePress: (movie: Movie) => void;
    refreshing: boolean;
    onRefresh: () => void;
    isSearchMode?: boolean;
}

export const HomeContent: React.FC<HomeContentProps> = ({
    trendingMovies,
    popularMovies,
    nowPlayingMovies,
    upcomingMovies,
    topRatedMovies,
    discoverMovies,
    searchResults = [],
    onMoviePress,
    refreshing,
    onRefresh,
    isSearchMode = false,
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
        if (!featuredMovie || isSearchMode) return null;

        return (
            <MovieBanner
                movie={featuredMovie}
                onPress={onMoviePress}
            />
        );
    };

    const renderSearchResults = () => {
        if (!isSearchMode || searchResults.length === 0) return null;

        return (
            <View style={styles.searchResultsContainer}>
                <View style={styles.searchResultsGrid}>
                    {searchResults.map((movie) => (
                        <MovieCard
                            key={movie.id}
                            movie={movie}
                            onPress={onMoviePress}
                        />
                    ))}
                </View>
            </View>
        );
    };

    const renderNormalContent = () => {
        if (isSearchMode) return null;

        return (
            <>
                <MovieSection
                    title="Trend Filmler"
                    subtitle="Bugün en çok konuşulan filmler"
                    movies={trendingMovies}
                    onMoviePress={onMoviePress}
                />

                <MovieSection
                    title="En Çok Oylanan Filmler"
                    subtitle="Kullanıcılar tarafından en yüksek puan alan filmler"
                    movies={topRatedMovies}
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
                    title="Keşfet"
                    subtitle="Yüksek puanlı gizli hazineler"
                    movies={discoverMovies}
                    onMoviePress={onMoviePress}
                />
            </>
        );
    };

    return (
        <ScrollView
            style={styles.scrollView}
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                    colors={[colors.blue]}
                    tintColor={colors.blue}
                />
            }
            showsVerticalScrollIndicator={false}
        >
            {renderBanner()}
            {renderSearchResults()}
            {renderNormalContent()}
        </ScrollView>
    );
};