import { StyleSheet } from 'react-native';
import { colors } from '../../constants/colors';

export const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconOnlyContainer: {
    justifyContent: 'center',
  },
  leftIcon: {
    marginRight: 8,
  },
  rightIcon: {
    marginLeft: 8,
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