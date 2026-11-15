import { StyleSheet } from 'react-native';
import { DARK, GREEN } from '../../core/theme';

export const styles = StyleSheet.create({
  detailImageContainer: {
    height: 300,
  },
  detailImage: {
    width: '100%',
    height: '100%',
  },
  imageBack: {
    position: 'absolute',
    top: 20,
    left: 18,
    backgroundColor: 'white',
    borderRadius: 25,
    width: 42,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageFavorite: {
    position: 'absolute',
    top: 20,
    right: 18,
    backgroundColor: 'white',
    borderRadius: 25,
    width: 42,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageFavoriteIcon: {
    fontSize: 23,
  },
  detailContent: {
    padding: 20,
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: DARK,
  },
  description: {
    fontSize: 13,
    lineHeight: 22,
    color: '#777',
    marginBottom: 22,
  },
  facilityContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  facility: {
    backgroundColor: '#E4F0EC',
    padding: 10,
    borderRadius: 10,
    marginRight: 8,
    marginBottom: 8,
  },
  facilityText: {
    color: GREEN,
    fontSize: 11,
  },
  galleryImage: {
    width: '100%',
    height: 180,
    borderRadius: 15,
    marginBottom: 20,
  },
  bookingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: '#eee',
    paddingTop: 18,
    paddingBottom: 20,
  },
  bookingPrice: {
    color: GREEN,
    fontSize: 19,
    fontWeight: 'bold',
  },
  bookButton: {
    backgroundColor: GREEN,
    paddingHorizontal: 28,
    paddingVertical: 15,
    borderRadius: 12,
  },
  bookText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
