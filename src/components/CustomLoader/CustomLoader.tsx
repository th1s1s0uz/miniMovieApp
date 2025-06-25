import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
} from 'react-native';
import LottieView from 'lottie-react-native';
import { styles } from './CustomLoader.style';


interface CustomLoaderProps {
  size?: 'small' | 'medium' | 'large';
  text?: string;
  showText?: boolean;
  containerStyle?: any;
  speed?: number;
}

export const CustomLoader: React.FC<CustomLoaderProps> = ({
  size = 'medium',
  text = 'Yükleniyor...',
  showText = true,
  containerStyle,
  speed = 1,
}) => {
  const animation = useRef<LottieView>(null);

  useEffect(() => {
    animation.current?.play();
  }, []);

  const getSize = () => {
    switch (size) {
      case 'small':
        return 40;
      case 'large':
        return 120;
      default:
        return 80;
    }
  };

  const getTextSize = () => {
    switch (size) {
      case 'small':
        return 12;
      case 'large':
        return 16;
      default:
        return 14;
    }
  };

  const loaderSize = getSize();
  const textSize = getTextSize();

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={[styles.loaderContainer, { width: loaderSize, height: loaderSize }]}>
        <LottieView
          autoPlay
          ref={animation}
          style={[styles.lottieAnimation, { width: loaderSize, height: loaderSize }]}
          source={require('../../assets/loading.json')}
          loop={true}
          speed={speed}
        />
      </View>
      
      {showText && text && (
        <Text style={[styles.loadingText, { fontSize: textSize }]}>
          {text}
        </Text>
      )}
    </View>
  );
};