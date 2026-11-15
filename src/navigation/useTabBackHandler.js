import { useCallback, useRef } from 'react';
import { BackHandler, ToastAndroid } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

// Tombol back Android: kembali ke tab sebelumnya, lalu tekan dua kali untuk keluar.
// Mengembalikan recordTab, yang dipanggil tiap kali sebuah tab mendapat fokus.
export default function useTabBackHandler(navigation) {
  const tabHistory = useRef(['Home']);

  const recordTab = useCallback(tab => {
    if (tabHistory.current[tabHistory.current.length - 1] !== tab) {
      tabHistory.current.push(tab);
    }
  }, []);

  useFocusEffect(useCallback(() => {
    let lastBack = 0;
    const handleBack = () => {
      if (tabHistory.current.length > 1) {
        tabHistory.current.pop();
        navigation.navigate('MainTabs', {
          screen: tabHistory.current[tabHistory.current.length - 1],
        });
        return true;
      }

      const now = Date.now();
      if (now - lastBack < 2000) {
        BackHandler.exitApp();
        return true;
      }

      lastBack = now;
      ToastAndroid.show('Tekan sekali lagi untuk keluar', ToastAndroid.SHORT);
      return true;
    };

    const subscription = BackHandler.addEventListener('hardwareBackPress', handleBack);
    return () => subscription.remove();
  }, [navigation]));

  return recordTab;
}
