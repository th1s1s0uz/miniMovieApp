import { StyleSheet } from 'react-native';
import { colors } from '../../constants/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.black,
  },
  loadingText: {
    color: colors.white,
    fontSize: 16,
    marginTop: 16,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.black,
    padding: 20,
  },
  errorText: {
    color: colors.white,
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: colors.blue,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  retryButtonText: {
    color: colors.black,
    fontSize: 16,
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  heroSection: {
    position: 'relative',
    height: 500,
  },
  backdropImage: {
    width: '100%',
    height: '100%',
  },
  heroContent: {
    flexDirection: 'row',
    paddingVertical: 24,
    paddingHorizontal: 12,
    alignItems: 'flex-end',
  },
  posterContainer: {
    position: 'relative',
    marginRight: 20,
  },
  posterImage: {
    width: 120,
    height: 180,
    borderRadius: 16,
  },
  favoriteButton: {
    position: 'absolute',
    top: -10,
    right: -10,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  heroOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 4,
    backgroundColor: 'rgba(13, 13, 13, 0.7)',
    justifyContent: 'flex-end',
  },
  heroInfo: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  movieTitle: {
    color: colors.white,
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  movieYear: {
    color: colors.lightGray,
    fontSize: 12,
    marginBottom: 12,
    alignSelf: 'flex-end',
    fontWeight: '500',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(7, 160, 255, 0.3)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: 'flex-end',
  },
  ratingText: {
    color: colors.blue,
    fontSize: 12,
    fontWeight: '700',
    marginRight: 8,
  },
  voteCount: {
    color: colors.lightGray,
    fontSize: 14,
    fontWeight: '500',
  },
  contentSection: {
    paddingHorizontal: 24,
    paddingVertical: 24,
    backgroundColor: colors.black,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -20,
  },
  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    paddingTop: 24,
    color: colors.white,
    fontSize: 24,
    paddingBottom: 24,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  overviewFavoriteButton: {
    borderRadius: 50,
    height: 50,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  overviewText: {
    color: colors.lightGray,
    fontSize: 16,
    lineHeight: 28,
    fontWeight: '400',
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    padding: 20,
    borderRadius: 16,
    borderLeftWidth: 3,
    borderLeftColor: colors.blue,
  },
  taglineText: {
    color: colors.blue,
    fontSize: 16,
    fontStyle: 'italic',
    textAlign: 'center',
    fontWeight: '600',
    backgroundColor: 'rgba(7, 160, 255, 0.1)',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(7, 160, 255, 0.2)',
  },
  genresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  genreItem: {
    backgroundColor: 'rgba(7, 160, 255, 0.15)',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    marginBottom: 6,
    borderWidth: 1,
    borderColor: 'rgba(7, 160, 255, 0.3)',
  },
  genreText: {
    color: colors.blue,
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  castContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  castListContainer: {
    paddingHorizontal: 4,
  },
  similarMoviesContainer: {
    paddingHorizontal: 4,
  },
  similarMovieItem: {
    marginRight: 16,
  },
  detailText: {
    color: colors.lightGray,
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '400',
  },
  statsSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: 8,
  },
  statLabel: {
    fontSize: 12,
    marginBottom: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
    color: colors.blue,
    opacity: 0.8,
  },
  statValue: {
    color: colors.white,
    fontSize: 20,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  detailsSection: {
    marginTop: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: 24,
    padding: 28,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.05)',
  },
  detailRowLast: {
    borderBottomWidth: 0,
  },
  detailLabel: {
    color: colors.blue,
    fontSize: 15,
    fontWeight: '600',
    letterSpacing: 0.3,
    flex: 1,
  },
  detailValue: {
    color: colors.white,
    fontSize: 15,
    fontWeight: '500',
    textAlign: 'right',
    flex: 1,
    marginLeft: 16,
  },
  castButton: {
    alignSelf: 'flex-start',
    marginTop: 8,
  },
  gradientBg: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 0,
  },
}); 