import { colors } from "../../constants/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.secondaryBlack,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      paddingTop: 60,
      paddingBottom: 20,
      backgroundColor: colors.black,
      borderBottomWidth: 1,
      borderBottomColor: colors.black,
    },
    backButton: {
      padding: 8,
    },
    headerTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: '#333',
    },
    placeholder: {
      width: 40,
    },
    content: {
      flex: 1,
    },
    section: {
      marginTop: 20,
      backgroundColor: colors.black,
      marginHorizontal: 20,
      borderRadius: 12,
      overflow: 'hidden',
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.white,
      paddingHorizontal: 20,
      paddingVertical: 12,
      backgroundColor: colors.black,
    },
    settingItem: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      paddingVertical: 16,
      borderBottomWidth: 1,
      borderBottomColor: colors.white,
    },
    settingLeft: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    settingText: {
      fontSize: 16,
      color: colors.white,
      marginLeft: 12,
    },
    settingValue: {
      fontSize: 16,
      color: colors.white,
    },
  });