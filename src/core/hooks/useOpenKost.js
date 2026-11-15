import { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';

export default function useOpenKost() {
  const navigation = useNavigation();
  return useCallback(
    kost => navigation.navigate('Detail', { kostId: kost.id }),
    [navigation],
  );
}
