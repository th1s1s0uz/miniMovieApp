import { StyleSheet } from "react-native";
import { colors } from "../../constants/colors";

export const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    scrollViewContent: {
        paddingBottom: 40,
    },
    searchResultsContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: colors.black,
        zIndex: 1,
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
    searchResultsRow: {
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        marginBottom: 16,
    },
    searchResultsContent: {
        paddingBottom: 20,
        paddingHorizontal: 8,
    },
    searchResultItem: {
        flex: 1,
        marginHorizontal: 4,
        marginBottom: 16,
        maxWidth: '48%',
    },
});