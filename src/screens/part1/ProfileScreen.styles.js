import { StyleSheet } from 'react-native';
import { DARK } from '../../core/theme';

export const styles = StyleSheet.create({
  profileContainer: {
    alignItems: 'center',
    padding: 30,
  },
  avatar: {
    width: 100,
    height: 100,
    backgroundColor: '#DCEBE4',
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarEmoji: {
    fontSize: 45,
  },
  profileName: {
    fontSize: 21,
    fontWeight: 'bold',
    color: DARK,
    marginTop: 15,
  },
  profileMenu: {
    backgroundColor: 'white',
    margin: 18,
    borderRadius: 15,
    paddingHorizontal: 18,
  },
  menuItem: {
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderColor: '#eee',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  menuText: {
    fontSize: 14,
    color: '#333',
  },
  menuArrow: {
    color: '#999',
  },
});
