import { useCallback } from 'react';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { useApp } from '../state/AppContext';

// Hapus user yang login, lalu kembali ke layar Login dan kosongkan riwayat halaman.
export default function useLogout() {
  const navigation = useNavigation();
  const { logout } = useApp();

  return useCallback(() => {
    logout();
    navigation.dispatch(CommonActions.reset({ index: 0, routes: [{ name: 'Login' }] }));
  }, [logout, navigation]);
}
