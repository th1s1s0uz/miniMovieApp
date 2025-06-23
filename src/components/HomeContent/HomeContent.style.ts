import { StyleSheet } from "react-native";
import { colors } from "../../constants/colors";

export const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    searchResultsContainer: {
        paddingTop: 100,
    },
    searchResultsTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.white,
        marginBottom: 16,
    },
    searchResultsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
});