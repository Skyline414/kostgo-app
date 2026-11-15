import { StyleSheet } from 'react-native';
import { DARK, GREEN } from '../../core/theme';

export const styles = StyleSheet.create({
  homeHeader: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  welcome: {
    fontSize: 20,
    fontWeight: 'bold',
    color: DARK,
    marginTop: 5,
  },
  profileIcon: {
    fontSize: 27,
  },
  hero: {
    marginHorizontal: 16,
    backgroundColor: GREEN,
    borderRadius: 20,
    padding: 22,
    paddingTop: 28,
  },
  heroTitle: {
    fontSize: 25,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 33,
  },
  heroSubtitle: {
    color: '#D2E5DF',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 10,
  },
  searchBox: {
    backgroundColor: 'white',
    borderRadius: 30,
    marginTop: 22,
    paddingLeft: 15,
    paddingRight: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    height: 45,
    color: '#333',
    fontSize: 13,
  },
  searchButton: {
    backgroundColor: GREEN,
    width: 36,
    height: 36,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchButtonIcon: {
    color: 'white',
    fontSize: 18,
  },
  categoryRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 25,
  },
  category: {
    alignItems: 'center',
  },
  categoryIcon: {
    fontSize: 23,
    backgroundColor: '#FFFFFF25',
    padding: 10,
    borderRadius: 30,
  },
  categoryText: {
    color: 'white',
    fontSize: 12,
    marginTop: 7,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  seeAll: {
    color: GREEN,
    fontSize: 13,
  },
  homeCard: {
    width: 220,
    backgroundColor: 'white',
    borderRadius: 15,
    overflow: 'hidden',
    marginRight: 13,
    elevation: 3,
    marginBottom: 5,
  },
  homeImage: {
    width: '100%',
    height: 140,
  },
  homeCardInfo: {
    padding: 12,
  },
});
