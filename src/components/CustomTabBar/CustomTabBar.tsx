import React from 'react';
import { View, TouchableOpacity } from 'react-native';
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

export const CustomTabBar: React.FC<CustomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  return (
    <View style={styles.container}>
      {state.routes.map((route: any, index: number) => {
        const { options } = descriptors[route.key];
        const tabItem = tabItems.find(item => item.name === route.name);
        const isFocused = state.index === index;

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
            style={styles.tabItem}
            activeOpacity={0.8}
          >
            <View style={styles.tabContent}>
              <View style={styles.iconContainer}>
                <Ionicons
                  name={iconName as any}
                  size={24}
                  color={isFocused ? colors.green : colors.lightText}
                />
              </View>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}; 