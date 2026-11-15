import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  mapSearch: {
    backgroundColor: 'white',
    margin: 18,
    marginTop: 0,
    padding: 16,
    borderRadius: 12,
  },
  mapContainer: {
    height: 400,
    backgroundColor: '#E8EAE6',
    marginHorizontal: 15,
    borderRadius: 15,
    overflow: 'hidden',
    position: 'relative',
  },
  mapRoad1: {
    position: 'absolute',
    backgroundColor: 'white',
    width: 550,
    height: 35,
    top: 170,
    left: -50,
    transform: [{ rotate: '35deg' }],
  },
  mapRoad2: {
    position: 'absolute',
    backgroundColor: 'white',
    width: 500,
    height: 28,
    top: 70,
    left: -70,
    transform: [{ rotate: '-30deg' }],
  },
  mapRoad3: {
    position: 'absolute',
    backgroundColor: 'white',
    width: 30,
    height: 500,
    left: 180,
    top: -40,
    transform: [{ rotate: '15deg' }],
  },
  mapLabel: {
    position: 'absolute',
    top: 35,
    left: 15,
    color: '#888',
    fontSize: 11,
  },
  mapLabel2: {
    position: 'absolute',
    bottom: 35,
    right: 20,
    color: '#888',
    fontSize: 12,
  },
  mapPin: {
    position: 'absolute',
  },
  mapPinIcon: {
    fontSize: 25,
  },
});
