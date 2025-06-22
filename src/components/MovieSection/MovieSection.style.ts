import { StyleSheet } from "react-native";
import { colors } from "../../constants/colors";

export const styles = StyleSheet.create({
    section: {
      marginBottom: 16,
    },
    sectionHeader: {
      paddingHorizontal: 10,
      paddingBottom: 10,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: colors.white,
      marginBottom: 0,
    },
    horizontalList: {
      paddingHorizontal: 20,
    },
    separator: {
      width: 15,
    },
  });