import { StyleSheet } from "react-native";
import { colors } from "../../constants/colors";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.secondaryBlack,
    },
    content: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      gap: 15,
      padding: 20,
    },
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      color: colors.white,
      textAlign: 'center',
    },
    subtitle: {
      fontSize: 18,
      color: colors.white,
      textAlign: 'center',
    },
    buttonContainer: {
      gap: 15,
    },
  });
  