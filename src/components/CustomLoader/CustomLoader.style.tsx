import { Dimensions, StyleSheet } from "react-native";
import { colors } from "../../constants/colors";

export const styles = StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    loaderContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 12,
    },
    lottieAnimation: {
      // Size will be set dynamically
    },
    loadingText: {
      color: colors.lightGray,
      fontWeight: '500',
      textAlign: 'center',
    },
  }); 