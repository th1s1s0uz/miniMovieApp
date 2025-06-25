import React, { useState, useRef, useEffect } from 'react';
import { View, TouchableOpacity, Animated, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../constants/colors';
import { styles } from './CustomTabBar.style';
import AppNavigatorPaths from '../../navigation/AppNavigatorPaths';

interface TabItem {
  name: string;
  icon: string;
}

interface CustomTabBarProps {
  state: any;
  descriptors: any;
  navigation: any;
}

const tabItems: TabItem[] = [
  {
    name: AppNavigatorPaths.Home,
    icon: 'home-outline',
  },
  {
    name: AppNavigatorPaths.Favorites,
    icon: 'heart-outline',
  },
];

const { width: screenWidth } = Dimensions.get('window');
const tabCount = tabItems.length;
const tabWidth = screenWidth / tabCount;

export const CustomTabBar: React.FC<CustomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  const [pressedTab, setPressedTab] = useState<number | null>(null);
  const scaleAnims = useRef(state.routes.map(() => new Animated.Value(1))).current;
  const opacityAnims = useRef(state.routes.map(() => new Animated.Value(1))).current;
  const translateYAnims = useRef(state.routes.map(() => new Animated.Value(0))).current;
  const containerScaleAnims = useRef(state.routes.map(() => new Animated.Value(1))).current;
  const activeIndicatorTranslateX = useRef(new Animated.Value(0)).current;
  const activeIndicatorOpacity = useRef(new Animated.Value(0)).current;

  const animatePress = (index: number, pressed: boolean) => {
    const scaleAnim = scaleAnims[index];
    const opacityAnim = opacityAnims[index];

    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: pressed ? 0.9 : 1,
        useNativeDriver: true,
        tension: 100,
        friction: 8,
      }),
      Animated.timing(opacityAnim, {
        toValue: pressed ? 0.8 : 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const animateActiveTab = (activeIndex: number) => {
    const targetX = activeIndex * tabWidth;

    const animations = state.routes.map((_: any, index: number) => {
      const isActive = index === activeIndex;
      const translateYAnim = translateYAnims[index];
      const containerScaleAnim = containerScaleAnims[index];

      return Animated.parallel([
        Animated.spring(translateYAnim, {
          toValue: 0,
          useNativeDriver: true,
          tension: 80,
          friction: 10,
        }),
        Animated.spring(containerScaleAnim, {
          toValue: 1,
          useNativeDriver: true,
          tension: 80,
          friction: 10,
        }),
      ]);
    });

    Animated.parallel([
      ...animations,
      Animated.spring(activeIndicatorTranslateX, {
        toValue: targetX,
        useNativeDriver: true,
        tension: 80,
        friction: 10,
      }),
      Animated.timing(activeIndicatorOpacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  useEffect(() => {
    animateActiveTab(state.index);
  }, [state.index]);

  return (
    <View style={styles.container}>
      <View style={styles.glassContainer}>
        <Animated.View 
          style={[
            styles.activeTopIndicator,
            {
              transform: [{ translateX: activeIndicatorTranslateX }],
              opacity: activeIndicatorOpacity,
            }
          ]}
        />
        
      {state.routes.map((route: any, index: number) => {
        const { options } = descriptors[route.key];
        const tabItem = tabItems.find(item => item.name === route.name);
        const isFocused = state.index === index;
          const isPressed = pressedTab === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

          const onPressIn = () => {
            setPressedTab(index);
            animatePress(index, true);
          };

          const onPressOut = () => {
            setPressedTab(null);
            animatePress(index, false);
          };

        const iconName = isFocused 
          ? tabItem?.icon.replace('-outline', '') 
          : tabItem?.icon;

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
              onPressIn={onPressIn}
              onPressOut={onPressOut}
            style={styles.tabItem}
              activeOpacity={1}
          >
              <Animated.View 
                style={[
                  styles.tabContent, 
                  {
                    transform: [
                      { scale: Animated.multiply(scaleAnims[index], containerScaleAnims[index]) },
                      { translateY: translateYAnims[index] }
                    ],
                    opacity: opacityAnims[index],
                  }
                ]}
              >
                <Animated.View style={styles.iconContainer}>
                <Ionicons
                  name={iconName as any}
                  size={24}
                  color={isFocused ? colors.blue : colors.lightText}
                />
                </Animated.View>
              </Animated.View>
          </TouchableOpacity>
        );
      })}
      </View>
    </View>
  );
}; 