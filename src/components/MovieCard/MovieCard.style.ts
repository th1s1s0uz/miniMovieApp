import { StyleSheet, Dimensions } from "react-native";
import { colors } from "../../constants/colors";

const { width } = Dimensions.get('window');
const cardWidth = (width - 48) / 2; // 2 sütun, 16px margin her yanda

export const styles = StyleSheet.create({
    container: {
      width: cardWidth,
      backgroundColor: colors.secondaryBlack,
      overflow: 'hidden',
      marginHorizontal: 8,
      marginVertical: 12,
      elevation: 8,
      shadowColor: colors.shadowDark,
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.3,
      shadowRadius: 12,
    },
    imageContainer: {
        borderRadius: 20,

      position: 'relative',
      backgroundColor: colors.black,
    },
    image: {
        borderRadius: 20,

      width: '100%',
      height: cardWidth * 1.5, // 3:2 aspect ratio
      backgroundColor: colors.black,
    },
    ratingContainer: {
      position: 'absolute',
      top: 12,
      right: 12,
      backgroundColor: 'rgba(180, 212, 41, 0.95)',
      borderRadius: 16,
      paddingHorizontal: 10,
      paddingVertical: 6,
      borderWidth: 1,
      borderColor: 'rgba(255, 255, 255, 0.1)',
      shadowColor: colors.shadowDark,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.4,
      shadowRadius: 6,
      elevation: 4,
    },
    ratingText: {
      color: colors.black,
      fontSize: 13,
      fontWeight: '800',
      letterSpacing: 0.3,
    },
    content: {
      padding: 16,
      paddingTop: 12,
    },
    title: {
      color: colors.white,
      fontSize: 15,
      fontWeight: '700',
      marginBottom: 6,
      lineHeight: 20,
      letterSpacing: -0.2,
    },
    year: {
      color: colors.darkGray,
      fontSize: 13,
      fontWeight: '500',
      letterSpacing: 0.2,
    },
    // Hover/Active state için ek stiller
    containerActive: {
      transform: [{ scale: 0.98 }],
      elevation: 12,
      shadowOpacity: 0.4,
    },
  }); 