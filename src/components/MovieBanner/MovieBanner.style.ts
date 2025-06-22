import { Dimensions, StyleSheet } from "react-native";
import { colors } from "../../constants/colors";
const { width, height } = Dimensions.get('window');

const getBannerHeight = () => {
  const calculatedHeight = width * 1.5;
  
  const maxHeight = height * 0.7; 
  
  return Math.min(calculatedHeight, maxHeight);
};

const bannerHeight = getBannerHeight();

export const styles = StyleSheet.create({
    container: {
      height: bannerHeight,
      width: '100%',
      overflow: 'hidden',
      position: 'relative',
      backgroundColor: colors.secondaryBlack,
      marginBottom: 15,
    },
    backgroundImage: {
      width: '100%',
      height: '100%',
    },
    overlay: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    content: {
      padding: 20,
      paddingBottom: 25,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 15,
    },
    ratingContainer: {
      backgroundColor: colors.green,
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 8,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 3,
    },
    rating: {
      fontSize: 13,
      fontWeight: 'bold',
      color: colors.black,
    },
    releaseDate: {
      fontSize: 15,
      color: colors.white,
      fontWeight: '600',
      textShadowColor: 'rgba(0, 0, 0, 0.8)',
      textShadowOffset: { width: 1, height: 1 },
      textShadowRadius: 2,
    },
    bottomContent: {
      flexDirection: 'row',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: colors.white,
      flex: 1,
      marginRight: 15,
      textShadowColor: 'rgba(0, 0, 0, 0.9)',
      textShadowOffset: { width: 2, height: 2 },
      textShadowRadius: 4,
    },
    exploreButton: {
      backgroundColor: colors.green,
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 8,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.4,
      shadowRadius: 6,
      elevation: 4,
    },
    exploreButtonText: {
      fontSize: 15,
      fontWeight: 'bold',
      color: colors.black,
    },
  }); 