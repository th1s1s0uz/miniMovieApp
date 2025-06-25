import { StyleSheet } from "react-native";
import { colors } from "../../constants/colors";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: 40,
    },
    bottomSheetBackground: {
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    castHeader: {
        marginHorizontal: 12,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 24,
        borderRadius: 24,
        borderWidth: 1,
        borderColor: colors.darkGray,
    },
    castHeaderGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 24,
        borderRadius: 24,
        flex: 1,
    },
    avatarContainer: {
        marginRight: 24,
    },
    avatar: {
        width: 130,
        height: 200,
        borderRadius: 10,
    },
    placeholderAvatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: colors.shadow,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,
        borderColor: colors.simpleShadow3,
    },
    placeholderText: {
        fontSize: 40,
        fontWeight: '700',
        color: colors.white,
    },
    castInfo: {
        flex: 1,
    },
    castName: {
        fontSize: 20,
        fontWeight: '800',
        color: colors.white,
        marginBottom: 6,
        letterSpacing: -0.5,
    },
    castCharacter: {
        fontSize: 16,
        color: colors.darkGray,
        marginBottom: 10,
    },
    castDepartment: {
        fontSize: 16,
        color: colors.blue,
        fontStyle: 'italic',
    },
    detailsContainer: {
        borderRadius: 24,
        marginHorizontal: 12,


        borderWidth: 1,
        borderColor: colors.darkGray
    },
    detailsGradient: {
        borderRadius: 24,
        padding: 24,
    },
    detailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: colors.simpleShadow8,
    },
    detailLabel: {
        fontSize: 16,
        fontWeight: '700',
        color: colors.blue,
    },
    detailValue: {
        fontSize: 16,
        color: colors.white,
        textAlign: 'right',
        flex: 1,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 60,
    },
    loadingText: {
        fontSize: 18,
        color: colors.white,
        fontWeight: '600',
        marginTop: 16,
    },
    biographySection: {
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '800',
        color: colors.white,
        marginBottom: 8,
        paddingTop: 16,
    },
    biographyText: {
        fontSize: 16,
        color: colors.lightGray,
        fontWeight: '500',
        lineHeight: 24,
    },
    filmographySection: {
        marginBottom: 24,
    },
    filmographyCount: {
        fontSize: 16,
        color: colors.lightGray,
        fontWeight: '500',
        marginBottom: 16,
    },
    moviesList: {
        paddingHorizontal: 8,
    },
    movieItem: {
        width: 120,
        marginRight: 12,
        alignItems: 'center',
    },
    movieInfo: {
        marginTop: 8,
        alignItems: 'center',
    },
    movieTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: colors.white,
        marginBottom: 4,
        textAlign: 'center',
    },
    movieCharacter: {
        fontSize: 12,
        color: colors.lightGray,
        marginBottom: 2,
        textAlign: 'center',
    },
    movieYear: {
        fontSize: 11,
        color: colors.blue,
        fontWeight: '500',
    },
    moviePoster: {
        width: 100,
        height: 150,
        borderRadius: 8,
    },
    moviePosterPlaceholder: {
        width: 100,
        height: 150,
        borderRadius: 8,
        backgroundColor:colors.shadow,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: colors.simpleShadow3,
    },
    moviePosterPlaceholderText: {
        fontSize: 24,
        fontWeight: '700',
        color: colors.white,
    },
    moreMoviesText: {
        fontSize: 14,
        color: colors.blue,
        fontWeight: '600',
        textAlign: 'center',
        marginTop: 8,
        fontStyle: 'italic',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 60,
    },
    errorText: {
        fontSize: 18,
        color: colors.error,
        fontWeight: '600',
    },
});