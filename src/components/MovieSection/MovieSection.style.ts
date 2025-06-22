import { StyleSheet } from "react-native";
import { colors } from "../../constants/colors";

export const styles = StyleSheet.create({
    section: {
      marginBottom: 30,
    },
    sectionHeader: {
      paddingHorizontal: 20,
      paddingBottom: 15,
    },
    sectionTitle: {
      fontSize: 22,
      fontWeight: 'bold',
      color: colors.white,
      marginBottom: 5,
    },
    sectionSubtitle: {
      fontSize: 14,
      color: colors.darkGray,
    },
    horizontalList: {
      paddingHorizontal: 20,
    },
    separator: {
      width: 15,
    },
  });