import { colors } from "../../constants/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    bottomSheetBackground: {
      backgroundColor: colors.black,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
    },
    contentContainer: {
      flex: 1,
    },
    scrollContent: {
      paddingBottom: 40,
      paddingTop: 20,
    },
    indicator: {
      backgroundColor: colors.blue,
      width: 40,
      height: 4,
    },
  });