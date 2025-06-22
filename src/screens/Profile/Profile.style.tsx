import { colors } from "../../constants/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.secondaryBlack,
    },
    backButton: {
      padding: 8,
    },
    settingsButton: {
      padding: 8,
    },
    content: {
      flex: 1,
    },
    profileSection: {
      alignItems: 'center',
      paddingVertical: 30,
      backgroundColor: colors.secondaryBlack,
      marginBottom: 20,
    },
    avatarContainer: {
      marginBottom: 16,
    },
    userName: {
      fontSize: 24,
      fontWeight: 'bold',
      color: colors.white,
      marginBottom: 4,
    },
    userEmail: {
      fontSize: 16,
      color: colors.white,
    },
    menuSection: {
      backgroundColor: colors.black,
      marginHorizontal: 20,
      borderRadius: 12,
      overflow: 'hidden',
    },
    menuItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingVertical: 16,
      borderBottomWidth: 1,
      borderBottomColor: colors.green,
    },
    menuText: {
      flex: 1,
      fontSize: 16,
      color: colors.white,
      marginLeft: 12,
    },
  });