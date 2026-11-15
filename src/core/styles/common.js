import { StyleSheet } from 'react-native';
import { BG, DARK, GREEN } from '../theme';

// Style yang dipakai lebih dari satu layar/komponen.
export const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG,
  },
  smallText: {
    color: '#888',
    fontSize: 12,
  },
  section: {
    padding: 18,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: DARK,
    marginTop: 14,
    marginBottom: 10,
  },
  emptyText: {
    textAlign: 'center',
    color: '#888',
    marginTop: 35,
  },
  kostName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#222',
    flexShrink: 1,
  },
  location: {
    color: '#888',
    fontSize: 10,
    marginTop: 7,
  },
  rating: {
    color: GREEN,
    fontSize: 12,
    fontWeight: 'bold',
  },
  price: {
    color: GREEN,
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 9,
  },
});
