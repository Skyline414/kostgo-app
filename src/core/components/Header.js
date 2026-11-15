import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesomeFreeSolid } from '@react-native-vector-icons/fontawesome-free-solid';
import { styles } from './Header.styles';

export default function Header({ title, back = false }) {
  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      {back && (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesomeFreeSolid name="chevron-left" style={styles.backText} size={15} />
        </TouchableOpacity>
      )}
      <Text style={styles.headerTitle}>{title}</Text>
    </View>
  );
}
