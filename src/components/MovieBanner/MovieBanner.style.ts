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
    backgroundColor: colors.black,
    marginBottom: 24,
    borderRadius: 12,
    elevation: 12,
    shadowColor: colors.shadowDark,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
  },
  content: {
    flex: 1,
    paddingHorizontal: 28,
    paddingBottom: 32,
    paddingTop: 90,
    justifyContent: 'space-between',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 2,
  },
  topSection: {
    alignItems: 'flex-end',
    marginTop: 24,
  },
  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  actionButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderRadius: 16,
  },
  bottomContent: {
  },
  bottomActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  leftInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  rating: {
    fontSize: 14,
    color: colors.white,
    fontWeight: '600',
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 4,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  releaseDate: {
    fontSize: 14,
    color: colors.white,
    fontWeight: '600',
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 4,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  title: {
    fontSize: 32,
    fontWeight: '900',
    color: colors.white,
    marginBottom: 16,
    textShadowColor: 'rgba(0, 0, 0, 0.9)',
    textShadowOffset: { width: 2, height: 3 },
    textShadowRadius: 8,
    lineHeight: 38,
    letterSpacing: -0.8,
  },
  exploreButton: {
    backgroundColor: colors.blue,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  gradientOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
  },
}); 