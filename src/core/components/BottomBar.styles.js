import { StyleSheet } from 'react-native';
import { BG, GREEN } from '../theme';

export const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: BG,
  },
  bottomNav: {
    height: 70,
    backgroundColor: GREEN,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  navLabel: {
    fontSize: 10,
    color: '#A9C5BC',
    marginTop: 3,
  },
});
