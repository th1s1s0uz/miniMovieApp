import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CastMember } from '../../services/tmdbService';
import { colors } from '../../constants/colors';
import { styles } from './CastCard.style';

interface CastCardProps {
  actor: CastMember;
  onPress: (actor: CastMember) => void;
}

export const CastCard: React.FC<CastCardProps> = ({ actor, onPress }) => {
  const handlePress = () => {
    onPress(actor);
  };

  return (
    <TouchableOpacity 
      style={styles.castItem}
      onPress={handlePress}
      activeOpacity={0.7}
    >
      {actor.profile_path ? (
        <Image
          source={{
            uri: `https://image.tmdb.org/t/p/w92${actor.profile_path}`
          }}
          style={styles.castImage}
          resizeMode="cover"
        />
      ) : (
        <View style={styles.castImagePlaceholder}>
          <Ionicons name="help-circle" size={32} color={colors.lightGray} />
        </View>
      )}
      <Text style={styles.castName} numberOfLines={2}>
        {actor.name}
      </Text>
      <Text style={styles.castCharacter} numberOfLines={1}>
        {actor.character}
      </Text>
    </TouchableOpacity>
  );
}; 