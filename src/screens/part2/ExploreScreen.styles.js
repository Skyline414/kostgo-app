import { StyleSheet } from 'react-native';
import { GREEN } from '../../core/theme';

export const styles = StyleSheet.create({
  exploreSearch: {
    backgroundColor: 'white',
    marginHorizontal: 18,
    paddingHorizontal: 15,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    height: 45,
    color: '#333',
    fontSize: 13,
  },
  searchIcon: {
    fontSize: 20,
  },
  filters: {
    paddingHorizontal: 15,
    marginTop: 18,
    maxHeight: 45,
  },
  filterButton: {
    backgroundColor: 'white',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginHorizontal: 4,
  },
  activeFilter: {
    backgroundColor: GREEN,
  },
  filterText: {
    color: GREEN,
    fontSize: 12,
  },
  activeFilterText: {
    color: 'white',
  },
});
