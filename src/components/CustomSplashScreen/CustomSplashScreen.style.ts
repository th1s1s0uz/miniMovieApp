import { StyleSheet } from "react-native";
import { colors } from "../../constants/colors";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.black,
    },
    gradient: {
      ...StyleSheet.absoluteFillObject,
    },
    content: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 40,
    },
    loaderContainer: {
      marginBottom: 40,
      justifyContent: 'center',
      alignItems: 'center',
    },
    loaderStyle: {
      padding: 0,
    },
    title: {
      fontSize: 32,
      fontWeight: 'bold',
      color: colors.white,
      textAlign: 'center',
      marginBottom: 12,
      letterSpacing: 1,
    },
    subtitle: {
      fontSize: 16,
      color: colors.lightGray,
      textAlign: 'center',
      marginBottom: 60,
      letterSpacing: 0.5,
    },
    versionContainer: {
      position: 'absolute',
      bottom: 40,
      left: 0,
      right: 0,
      alignItems: 'center',
    },
    versionText: {
      fontSize: 12,
      color: colors.darkGray,
      fontWeight: '400',
    },
  }); 