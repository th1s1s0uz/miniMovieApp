import { colors } from "../../constants/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.backgroundColor,
    },
    content: {
      flex: 1,
      padding: 20,
    },
    subtitle: {
      fontSize: 16,
      color: colors.secondaryText,
      textAlign: 'center',
      marginTop: 8,
      marginBottom: 30,
    },
    favoritesList: {
      flex: 1,
    },
    movieItem: {
      backgroundColor: colors.cardBackground,
      borderRadius: 12,
      padding: 16,
      marginBottom: 12,
      flexDirection: 'row',
      alignItems: 'center',
      shadowColor: colors.shadow,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 3.84,
      elevation: 5,
    },
    movieInfo: {
      flex: 1,
    },
    movieTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: colors.primaryText,
      marginBottom: 4,
    },
    movieYear: {
      fontSize: 14,
      color: colors.secondaryText,
      marginBottom: 4,
    },
    movieRating: {
      fontSize: 14,
      color: colors.warning,
      fontWeight: '500',
    },
    removeButton: {
      padding: 8,
      borderRadius: 20,
      backgroundColor: colors.lightGray,
    },
  }); 