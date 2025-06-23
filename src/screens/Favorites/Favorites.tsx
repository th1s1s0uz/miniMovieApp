import React from 'react';
import { Text } from '@react-navigation/elements';
import { View, TouchableOpacity, Animated, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CustomHeader } from '../../components/CustomHeader/CustomHeader';
import { styles } from './Favorites.style';
import { colors } from '../../constants/colors';
import { LinearGradient } from 'expo-linear-gradient';
import { useFavorites } from '../../hooks/useFavorites';
import { useAppNavigation } from '../../navigation/AppNavigatorPaths';
import { MovieCard } from '../../components/MovieCard/MovieCard';
import { Movie } from '../../services/tmdbService';

export function Favorites() {
  const navigation = useAppNavigation();
  const { favorites } = useFavorites();
  const scrollY = new Animated.Value(0);

  const handleMoviePress = (movie: Movie) => {
    navigation.navigate('MovieDetail', { movieId: movie.id });
  };

  const renderMovieCard = ({ item }: { item: Movie }) => (
    <MovieCard
      movie={item}
      onPress={handleMoviePress}
    />
  );

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Ionicons name="heart-outline" size={64} color={colors.lightText} />
      <Text style={styles.emptyTitle}>Henüz favori filminiz yok</Text>
      <Text style={styles.emptySubtitle}>
        Filmleri beğenmek için kalp ikonuna tıklayın
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <CustomHeader
        title="Favori Filmler"
        scrollY={scrollY}
      />
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
      <Animated.ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        bounces={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={8}
      >
        <View style={styles.content}>
          {favorites.length > 0 ? (
            <>
              <FlatList
                data={favorites}
                renderItem={renderMovieCard}
                keyExtractor={(item) => item.id.toString()}
                numColumns={2}
                columnWrapperStyle={styles.movieRow}
                showsVerticalScrollIndicator={false}
                scrollEnabled={false}
              />
            </>
          ) : (
            renderEmptyState()
          )}
        </View>
      </Animated.ScrollView>
    </View>
  );
}