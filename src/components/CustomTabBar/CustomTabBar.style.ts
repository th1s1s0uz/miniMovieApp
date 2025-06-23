import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '../../constants/colors';

const { width: screenWidth } = Dimensions.get('window');
const tabCount = 2; // Home and Favorites
const tabWidth = screenWidth / tabCount;

export const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
    height: 70,
  },
  glassContainer: {
    flexDirection: 'row',
    backgroundColor: colors.shadow8,
    borderRadius: 0,
    borderTopWidth: 1,
    borderColor: colors.simpleShadow1,
    shadowColor: colors.shadowDark,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 12,
    overflow: 'visible',
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    position: 'relative',
  },
  tabContent: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    paddingHorizontal: 16,
    paddingVertical: 12,
    minWidth: 56,
    minHeight: 56,
    backgroundColor: 'transparent',
  },
  iconContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    width: 32,
    height: 32,
  },
  tabLabel: {
    color: colors.blue,
    fontSize: 10,
    fontWeight: '600'
  },
  activeTopIndicator: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: tabWidth,
    height: 3,
    backgroundColor: colors.blue,
    borderRadius: 2,
    zIndex: 10,
  },
}); 