import React, { useMemo, useRef, useEffect, useCallback } from 'react';
import { View, ScrollView, RefreshControl, FlatList, Dimensions, Animated } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
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
    scrollY?: Animated.Value;
}

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// Search results grid dimensions
const SEARCH_GRID_PADDING = 16;
const SEARCH_ITEM_SPACING = 12;
const SEARCH_ITEM_WIDTH = (screenWidth - (SEARCH_GRID_PADDING * 2) - SEARCH_ITEM_SPACING) / 2;
const SEARCH_ITEM_HEIGHT = SEARCH_ITEM_WIDTH * 1.5; // 3:2 aspect ratio
const SEARCH_ITEM_MARGIN = 6;

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
    scrollY,
}) => {
    const scrollViewRef = useRef<any>(null);
    const insets = useSafeAreaInsets();

    // Get featured movie for banner (random from trending movies) - useMemo ile sabit
    const featuredMovie = useMemo((): Movie | null => {
        if (trendingMovies.length > 0) {
            const randomIndex = Math.floor(Math.random() * trendingMovies.length);
            return trendingMovies[randomIndex];
        }
        return null;
    }, [trendingMovies]); // Sadece trendingMovies değiştiğinde yeniden hesapla

    // Scroll to top only when switching to search mode
    useEffect(() => {
        if (scrollViewRef.current && isSearchMode) {
            scrollViewRef.current.scrollTo({ y: 0, animated: true });
        }
    }, [isSearchMode]);

    // Memoized render item for search results
    const renderSearchResultItem = useCallback(({ item }: { item: Movie }) => (
        <View style={styles.searchResultItem}>
            <MovieCard
                movie={item}
                onPress={onMoviePress}
            />
        </View>
    ), [onMoviePress]);

    // Memoized key extractor for search results
    const keyExtractor = useCallback((item: Movie) => `search-${item.id}`, []);

    // Memoized getItemLayout for search results FlatList (vertical grid)
    const getItemLayout = useCallback((data: any, index: number) => {
        const rowIndex = Math.floor(index / 2); // 2 columns
        const rowHeight = SEARCH_ITEM_HEIGHT + SEARCH_ITEM_MARGIN * 2 + 16; // 16 is marginBottom
        return {
            length: rowHeight,
            offset: rowHeight * rowIndex,
            index,
        };
    }, []);

    // Calculate initial number to render based on screen height
    const searchInitialNumToRender = useMemo(() => {
        const visibleRows = Math.ceil(screenHeight / (SEARCH_ITEM_HEIGHT + SEARCH_ITEM_MARGIN * 2 + 16)) + 1;
        const itemsPerRow = 2;
        return Math.min(visibleRows * itemsPerRow, searchResults.length);
    }, [searchResults.length]);

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
                <FlatList
                    data={searchResults}
                    renderItem={renderSearchResultItem}
                    keyExtractor={keyExtractor}
                    numColumns={2}
                    showsVerticalScrollIndicator={false}
                    removeClippedSubviews={true}
                    maxToRenderPerBatch={8}
                    windowSize={7}
                    initialNumToRender={searchInitialNumToRender}
                    getItemLayout={getItemLayout}
                    contentContainerStyle={[
                        styles.searchResultsContent, 
                        { 
                            paddingTop: 60 + insets.top,
                            paddingBottom: 20 + insets.bottom 
                        }
                    ]}
                    updateCellsBatchingPeriod={50}
                    disableVirtualization={false}
                    scrollEventThrottle={16}
                    onScroll={scrollY ? (event) => {
                        const offsetY = event.nativeEvent.contentOffset.y;
                        scrollY.setValue(offsetY);
                    } : undefined}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                            colors={[colors.blue]}
                            tintColor={colors.blue}
                        />
                    }
                />
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

    // If in search mode, return only FlatList
    if (isSearchMode) {
        return renderSearchResults();
    }

    // Otherwise return normal ScrollView content
    return (
        <ScrollView
            ref={scrollViewRef}
            style={styles.scrollView}
            contentContainerStyle={styles.scrollViewContent}
            onScroll={scrollY ? (event) => {
                const offsetY = event.nativeEvent.contentOffset.y;
                scrollY.setValue(offsetY);
            } : undefined}
            scrollEventThrottle={16}
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
            {renderNormalContent()}
        </ScrollView>
    );
};