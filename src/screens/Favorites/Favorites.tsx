import { Text } from '@react-navigation/elements';
import { View, TouchableOpacity, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CustomHeader } from '../../components/CustomHeader/CustomHeader';
import { styles } from './Favorites.style';
import { colors } from '../../constants/colors';
import { LinearGradient } from 'expo-linear-gradient';

export function Favorites() {
  const mockFavorites = [
    { id: 1, title: 'Inception', year: 2010, rating: 8.8 },
    { id: 2, title: 'The Dark Knight', year: 2008, rating: 9.0 },
    { id: 3, title: 'Interstellar', year: 2014, rating: 8.6 },
    { id: 4, title: 'Pulp Fiction', year: 1994, rating: 8.9 },
  ];

  const scrollY = new Animated.Value(0);

  const removeFavorite = (id: number) => {
    // TODO: Implement remove from favorites
  };

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
          <Text style={styles.subtitle}>Favori filmleriniz burada görünecek</Text>

          <View style={styles.favoritesList}>
            {mockFavorites.map((movie) => (
              <View key={movie.id} style={styles.movieItem}>
                <View style={styles.movieInfo}>
                  <Text style={styles.movieTitle}>{movie.title}</Text>
                  <Text style={styles.movieYear}>{movie.year}</Text>
                  <Text style={styles.movieRating}>⭐ {movie.rating}</Text>
                </View>
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => removeFavorite(movie.id)}
                >
                  <Ionicons name="heart-dislike" size={20} color={colors.error} />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>
      </Animated.ScrollView>
    </View>
  );
}