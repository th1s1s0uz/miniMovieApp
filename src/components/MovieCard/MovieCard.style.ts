import { StyleSheet } from "react-native";
import { colors } from "../../constants/colors";

export const styles = StyleSheet.create({
    container: {
      width: 160,
      backgroundColor: colors.secondaryBlack,
      borderRadius: 12,
      overflow: 'hidden',
      marginHorizontal: 8,
      marginVertical: 8,
      elevation: 3,
      shadowColor: colors.shadow,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
    },
    imageContainer: {
      position: 'relative',
    },
    image: {
      width: '100%',
      height: 240,
    },
    ratingContainer: {
      position: 'absolute',
      top: 8,
      right: 8,
      backgroundColor: colors.green,
      borderRadius: 12,
      paddingHorizontal: 6,
      paddingVertical: 2,
    },
    ratingText: {
      color: colors.black,
      fontSize: 12,
      fontWeight: 'bold',
    },
    content: {
      padding: 12,
    },
    title: {
      color: colors.white,
      fontSize: 14,
      fontWeight: '600',
      marginBottom: 4,
      lineHeight: 18,
    },
    year: {
      color: colors.darkGray,
      fontSize: 12,
    },
  }); 