import { Dimensions, StyleSheet } from "react-native";
import { colors } from "../../constants/colors";
const { width, height } = Dimensions.get('window');

const getBannerHeight = () => {
  const calculatedHeight = width * 1.6;
  const maxHeight = height * 0.75; 
  return Math.min(calculatedHeight, maxHeight);
};

const bannerHeight = getBannerHeight();

export const styles = StyleSheet.create({
  container: {
    height: bannerHeight,
    width: '100%',
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: colors.secondaryBlack,
    marginBottom: 20,
    elevation: 8,
    shadowColor: colors.shadowDark,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: 'space-between',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(13, 13, 13, 0.4)',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  ratingContainer: {
    backgroundColor: 'rgba(180, 212, 41, 0.95)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    shadowColor: colors.shadowDark,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  rating: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.black,
    letterSpacing: 0.5,
  },
  releaseDate: {
    fontSize: 18,
    color: colors.white,
    fontWeight: '700',
    textShadowColor: 'rgba(0, 0, 0, 0.9)',
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 4,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    overflow: 'hidden',
  },
  bottomContent: {
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: '900',
    color: colors.white,
    marginBottom: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.9)',
    textShadowOffset: { width: 2, height: 3 },
    textShadowRadius: 6,
    lineHeight: 38,
    letterSpacing: -0.5,
  },
  exploreButton: {
    backgroundColor: colors.green,
    paddingHorizontal: 28,
    paddingVertical: 14,
    borderRadius: 16,
    shadowColor: colors.shadowDark,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  exploreButtonText: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.black,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
}); 