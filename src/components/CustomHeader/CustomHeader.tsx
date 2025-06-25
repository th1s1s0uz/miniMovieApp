import React, { useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../../constants/colors';
import { styles } from './CustomHeader.style';
import { SearchBar } from '../SearchBar/SearchBar';

interface CustomHeaderProps {
  title?: string;
  showBackButton?: boolean;
  onBackPress?: () => void;
  rightComponent?: React.ReactNode;
  leftComponent?: React.ReactNode;
  showSearch?: boolean;
  onSearch?: (query: string) => void;
  onClearSearch?: () => void;
  isSearchLoading?: boolean;
  searchQuery?: string;
  scrollY?: Animated.Value;
}

export const CustomHeader: React.FC<CustomHeaderProps> = ({
  title,
  showBackButton = false,
  onBackPress,
  rightComponent,
  leftComponent,
  showSearch = false,
  onSearch,
  onClearSearch,
  isSearchLoading = false,
  searchQuery = '',
  scrollY,
}) => {
  const insets = useSafeAreaInsets();
  const headerHeight = 60 + insets.top;
  const lastScrollY = useRef(0);
  const headerTranslateY = useRef(new Animated.Value(0)).current;
  const headerOpacity = useRef(new Animated.Value(1)).current;
  const isAnimating = useRef(false);

  useEffect(() => {
    if (!scrollY) return;

    const listener = scrollY.addListener(({ value }) => {
      const currentScrollY = value;
      const scrollDirection = currentScrollY > lastScrollY.current ? 'down' : 'up';
      const scrollDelta = Math.abs(currentScrollY - lastScrollY.current);

      // Prevent multiple animations at once
      if (isAnimating.current) return;

      // More sensitive scroll detection
      if (scrollDelta > 2) {
        isAnimating.current = true;

        if (scrollDirection === 'down' && currentScrollY > 5) {
          // Scrolling down - hide header quickly
          Animated.parallel([
            Animated.timing(headerTranslateY, {
              toValue: -headerHeight,
              duration: 50,
              useNativeDriver: true,
            }),
            Animated.timing(headerOpacity, {
              toValue: 0,
              duration: 50,
              useNativeDriver: true,
            }),
          ]).start(() => {
            isAnimating.current = false;
          });
        } else if (scrollDirection === 'up') {
          // Scrolling up - show header quickly
          Animated.parallel([
            Animated.timing(headerTranslateY, {
              toValue: 0,
              duration: 50,
              useNativeDriver: true,
            }),
            Animated.timing(headerOpacity, {
              toValue: 1,
              duration: 50,
              useNativeDriver: true,
            }),
          ]).start(() => {
            isAnimating.current = false;
          });
        } else {
          isAnimating.current = false;
        }
      }

      lastScrollY.current = currentScrollY;
    });

    return () => {
      scrollY.removeListener(listener);
    };
  }, [scrollY, headerTranslateY, headerOpacity, headerHeight]);

  return (
    <Animated.View 
      style={[
        styles.header,
        {
          paddingTop: insets.top,
          height: headerHeight,
          transform: [{ translateY: headerTranslateY }],
          opacity: headerOpacity,
        }
      ]}
    >
      <View style={styles.leftContainer}>
        {showBackButton && (
          <TouchableOpacity style={styles.iconButton} onPress={onBackPress}>
            <Ionicons name="chevron-back" size={24} color={colors.white} />
          </TouchableOpacity>
        )}
        {leftComponent}
      </View>

      {showSearch ? (
        <View style={styles.searchContainer}>
          <SearchBar
            onSearch={onSearch || (() => {})}
            onClear={onClearSearch}
            isLoading={isSearchLoading}
            compact={true}
            searchQuery={searchQuery}
          />
        </View>
      ) : (
        title && <Text style={styles.title}>{title}</Text>
      )}

      <View style={styles.rightContainer}>
        {rightComponent}
      </View>
    </Animated.View>
  );
}; 