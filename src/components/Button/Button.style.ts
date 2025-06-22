import { StyleSheet } from 'react-native';
import { colors } from '../../constants/colors';

export const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 8,
    minWidth: 120,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  large: {
    paddingHorizontal: 40,
    paddingVertical: 16,
    minWidth: 160,
  },
  disabled: {
    backgroundColor: colors.lightGray,
  },
  disabledText: {
    color: colors.lightText,
  },
}); 