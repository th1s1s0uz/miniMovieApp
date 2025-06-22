import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, Animated } from 'react-native';
import { Movie } from '../../services/tmdbService';
import { formatRating, formatDate, getPosterUrl } from '../../utils/movieUtils';
import { styles } from './MovieCard.style';

interface MovieCardProps {
    movie: Movie;
    onPress?: (movie: Movie) => void;
}

export const MovieCard: React.FC<MovieCardProps> = ({ movie, onPress }) => {
    const [isPressed, setIsPressed] = useState(false);
    const scaleAnim = useState(new Animated.Value(1))[0];

    const handlePress = () => {
        if (onPress) {
            onPress(movie);
        }
    };

    const handlePressIn = () => {
        setIsPressed(true);
        Animated.spring(scaleAnim, {
            toValue: 0.95,
            useNativeDriver: true,
        }).start();
    };

    const handlePressOut = () => {
        setIsPressed(false);
        Animated.spring(scaleAnim, {
            toValue: 1,
            useNativeDriver: true,
        }).start();
    };

    return (
        <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
            <TouchableOpacity
                style={[styles.container, isPressed && styles.containerActive]}
                onPress={handlePress}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                activeOpacity={1}
            >
                <View style={styles.imageContainer}>
                    <Image
                        source={{
                            uri: getPosterUrl(movie.poster_path, 'w342', '342x513')
                        }}
                        style={styles.image}
                        resizeMode="cover"
                    />
                    <View style={styles.glassOverlay} />
                    <View style={styles.ratingContainer}>
                        <Text style={styles.ratingText}>★ {formatRating(movie.vote_average)}</Text>
                    </View>
                </View>

                <View style={styles.content}>
                    <Text style={styles.title} numberOfLines={2}>
                        {movie.title}
                    </Text>
                </View>
            </TouchableOpacity>
        </Animated.View>
    );
};