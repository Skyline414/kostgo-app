import { StyleSheet } from 'react-native';
import { DARK, GREEN } from '../theme';

export const styles = StyleSheet.create({
  header: {
    height: 65,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: DARK,
  },
  backText: {
    color: GREEN,
  },
});
