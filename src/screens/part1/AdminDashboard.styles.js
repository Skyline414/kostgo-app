import { StyleSheet } from 'react-native';
import { DARK, GREEN } from '../../core/theme';

export const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: DARK,
    marginBottom: 4,
  },
  logoutButton: {
    backgroundColor: GREEN,
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderRadius: 20,
  },
  logoutText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    width: '48%',
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
  },
  wideCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
  },
  statValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: GREEN,
  },
  statLabel: {
    fontSize: 12,
    color: '#888',
    marginTop: 4,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: DARK,
  },
  categoryRow: {
    flexDirection: 'row',
    marginTop: 12,
  },
  categoryItem: {
    flex: 1,
    alignItems: 'center',
  },
  categoryCount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: GREEN,
  },
  categoryLabel: {
    fontSize: 12,
    color: '#888',
    marginTop: 2,
  },
  kostRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 10,
    marginBottom: 10,
    elevation: 2,
  },
  kostImage: {
    width: 56,
    height: 56,
    borderRadius: 10,
  },
  kostInfo: {
    flex: 1,
    marginHorizontal: 10,
  },
  kostMeta: {
    color: GREEN,
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 5,
  },
});
