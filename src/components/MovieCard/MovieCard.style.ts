import { StyleSheet, Dimensions } from "react-native";
import { colors } from "../../constants/colors";

const { width } = Dimensions.get('window');
const cardWidth = (width - 32) / 2;

export const styles = StyleSheet.create({
    container: {
        width: cardWidth,
        backgroundColor: 'transparent',
        overflow: 'hidden',
        marginHorizontal: 4,
        marginVertical: 8,
        borderRadius: 24,
        shadowColor: colors.shadowDark,
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.3,
        shadowRadius: 16,
        elevation: 8,
    },
    imageContainer: {
        borderRadius: 24,
        position: 'relative',
        backgroundColor: colors.black,
        overflow: 'hidden',
    },
    image: {
        borderRadius: 24,
        width: '100%',
        height: cardWidth * 1.5, 
        backgroundColor: colors.black,
    },
    glassOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderRadius: 24,
        borderWidth: 1,
        borderColor: colors.simpleShadow1,
    },
    ratingContainer: {
        position: 'absolute',
        top: 12,
        right: 12,
        backgroundColor: colors.rgbaBlue9,
        borderRadius: 20,
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderWidth: 1,
        borderColor: colors.simpleShadow2,
        shadowColor: colors.shadowDark,
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 6,
    },
    ratingText: {
        color: colors.white,
        fontSize: 13,
        fontWeight: '800',
        letterSpacing: 0.3,
    },
    yearText: {
        color: colors.white,
        fontSize: 13,
        fontWeight: '700',
        letterSpacing: 0.3,
    },
    content: {
        paddingTop: 12,
        paddingHorizontal: 4,
        alignItems: 'center',
    },
    title: {
        color: colors.white,
        fontSize: 15,
        fontWeight: '700',
        marginBottom: 4,
        lineHeight: 20,
        letterSpacing: -0.2,
        textAlign: 'center',
    },
    containerActive: {
        transform: [{ scale: 0.98 }],
        elevation: 12,
        shadowOpacity: 0.4,
    },
    iconContainer: {
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
        width: 32,
        height: 32,
    },
    favoriteButton: {
        position: 'absolute',
        top: 12,
        left: 12,
        borderRadius: 20,
        zIndex: 10,
    },
    tabLabel: {
        color: colors.blue,
        fontSize: 10,
        fontWeight: '600'
    },
}); 