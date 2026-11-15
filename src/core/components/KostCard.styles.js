import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  kostCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    marginBottom: 15,
    overflow: 'hidden',
    elevation: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  kostImage: {
    width: 110,
    height: 115,
  },
  cardInfo: {
    flex: 1,
    padding: 11,
  },
  month: {
    color: '#888',
    fontSize: 10,
    fontWeight: 'normal',
  },
  favoriteButton: {
    position: 'absolute',
    right: 12,
    top: 10,
    backgroundColor: 'white',
    borderRadius: 20,
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
