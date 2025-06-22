import { StyleSheet } from "react-native";
import { colors } from "../../constants/colors";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.secondaryBlack,
    },
    content: {
      paddingHorizontal: 0
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
    // Section styles
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
    // Legacy styles for backward compatibility
    header: {
      padding: 20,
      paddingBottom: 10,
    },
    listContainer: {
      paddingBottom: 20,
    },
    row: {
      justifyContent: 'space-between',
      paddingHorizontal: 16,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      gap: 15,
    },
    loadingText: {
      color: colors.white,
      fontSize: 16,
    },
    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 40,
    },
    emptyText: {
      color: colors.darkGray,
      fontSize: 16,
      textAlign: 'center',
    },
  });
  