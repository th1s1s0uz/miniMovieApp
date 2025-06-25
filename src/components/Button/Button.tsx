import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle, ColorValue, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../constants/colors';
import { styles } from './Button.style';

interface ButtonProps {
  title: string;
  onPress: () => void;
  backgroundColor?: string;
  textColor?: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
  gradientColors?: [ColorValue, ColorValue, ...ColorValue[]];
  gradientLocations?: [number, number, ...number[]];
  gradientStart?: { x: number; y: number };
  gradientEnd?: { x: number; y: number };
  icon?: string;
  iconSize?: number;
  iconColor?: string;
  iconPosition?: 'left' | 'right';
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  backgroundColor = colors.blue,
  textColor = colors.black,
  style,
  textStyle,
  disabled = false,
  gradientColors,
  gradientLocations,
  gradientStart = { x: 0, y: 0 },
  gradientEnd = { x: 1, y: 0 },
  icon,
  iconSize = 16,
  iconColor,
  iconPosition = 'left',
}) => {
  const buttonStyle = [
    styles.button,
    { backgroundColor: disabled ? colors.lightGray : backgroundColor },
    !title && { paddingHorizontal: 12, paddingVertical: 10 },
    style,
  ];

  const textStyleFinal = [
    styles.buttonText,
    { color: disabled ? colors.lightText : textColor },
    textStyle,
  ];

  const finalIconColor = iconColor || textColor;

  const renderContent = () => (
    <View style={[
      styles.contentContainer,
      !title && styles.iconOnlyContainer
    ]}>
      {icon && iconPosition === 'left' && (
        <Ionicons 
          name={icon as any} 
          size={iconSize} 
          color={disabled ? colors.lightText : finalIconColor} 
          style={title ? styles.leftIcon : undefined}
        />
      )}
      {title && <Text style={textStyleFinal}>{title}</Text>}
      {icon && iconPosition === 'right' && (
        <Ionicons 
          name={icon as any} 
          size={iconSize} 
          color={disabled ? colors.lightText : finalIconColor} 
          style={title ? styles.rightIcon : undefined}
        />
      )}
    </View>
  );

  if (gradientColors && !disabled) {
    const borderRadius = (style as any)?.borderRadius || 8;
    
    return (
      <TouchableOpacity
        style={buttonStyle}
        onPress={onPress}
        disabled={disabled}
        activeOpacity={0.8}
      >
        <LinearGradient
          colors={gradientColors}
          locations={gradientLocations}
          start={gradientStart}
          end={gradientEnd}
          style={[StyleSheet.absoluteFill, { borderRadius }]}
        />
        {renderContent()}
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      {renderContent()}
    </TouchableOpacity>
  );
};