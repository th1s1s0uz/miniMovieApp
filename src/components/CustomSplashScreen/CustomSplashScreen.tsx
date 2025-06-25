import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../../constants/colors';
import { CustomLoader } from '../CustomLoader/CustomLoader';
import { styles } from './CustomSplashScreen.style';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

interface CustomSplashScreenProps {
  onFinish: () => void;
}

export const CustomSplashScreen: React.FC<CustomSplashScreenProps> = ({ onFinish }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.black} />
      <LinearGradient
        colors={colors.gradientBg}
        locations={[0, 0.3, 1]}
        start={{ x: 1, y: 1 }}
        end={{ x: 0, y: 0 }}
        style={styles.gradient}
      />
      
      <View style={styles.content}>
        <View style={styles.loaderContainer}>
          <CustomLoader
            size="large"
            text=""
            showText={false}
            containerStyle={styles.loaderStyle}
          />
        </View>

        <Text style={styles.title}>
          Mini Movie App
        </Text>

        <Text style={styles.subtitle}>
          Film dünyasını keşfedin
        </Text>
      </View>

      <View style={styles.versionContainer}>
        <Text style={styles.versionText}>v1.0.0</Text>
      </View>
    </View>
  );
};