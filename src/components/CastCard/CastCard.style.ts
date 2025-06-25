import { StyleSheet } from 'react-native';
import { colors } from '../../constants/colors';

export const styles = StyleSheet.create({
  castItem: {
    width: 80,
    alignItems: 'center',
    marginRight: 16,
  },
  castImage: {
    width: 80,
    height: 120,
    borderRadius: 12,
    marginBottom: 8,
    backgroundColor: colors.black,
  },
  castImagePlaceholder: {
    width: 80,
    height: 120,
    borderRadius: 12,
    marginBottom: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.simpleShadow1,
  },
  castName: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 16,
  },
  castCharacter: {
    color: colors.lightGray,
    fontSize: 10,
    fontWeight: '500',
    textAlign: 'center',
    lineHeight: 14,
  },
}); 