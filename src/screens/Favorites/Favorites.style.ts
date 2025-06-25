import { colors } from "../../constants/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.secondaryBlack,
    },
    scrollView: {
      flex: 1,
    },
    scrollContent: {
      paddingTop: 100,
      paddingBottom: 60, 
    },
    content: {
      flex: 1,
      padding: 12,
    },
    favoritesContent: {
      paddingHorizontal: 8,
      // paddingTop and paddingBottom will be set dynamically based on safe area insets
    },
    emptyContentContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 60,
    },
    movieItem: {
      flex: 1,
      marginHorizontal: 4,
      marginBottom: 16,
      maxWidth: '48%',
    },
    subtitle: {
      fontSize: 16,
      color: colors.white,
      textAlign: 'center',
      marginTop: 8,
      marginBottom: 30,
    },
 
   
    movieInfo: {
      flex: 1,
    },
    movieTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: colors.white,
      marginBottom: 4,
    },
    movieYear: {
      fontSize: 14,
      color: colors.darkGray,
      marginBottom: 4,
    },
    movieRating: {
      fontSize: 14,
      color: colors.blue,
      fontWeight: '500',
    },
    removeButton: {
      padding: 8,
      borderRadius: 20,
      backgroundColor: colors.secondaryBlack,
    },
    movieRow: {
      justifyContent: 'space-between',
    },
    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 60,
    },
    emptyTitle: {
      fontSize: 20,
      fontWeight: '600',
      color: colors.white,
      marginTop: 16,
      marginBottom: 8,
      textAlign: 'center',
    },
    emptySubtitle: {
      fontSize: 14,
      color: colors.lightText,
      textAlign: 'center',
      lineHeight: 20,
    },
    gradientBg: {
      ...StyleSheet.absoluteFillObject,
      zIndex: 0,
    },
  }); 