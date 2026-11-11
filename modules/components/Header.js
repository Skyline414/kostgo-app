import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { FontAwesomeFreeSolid } from "@react-native-vector-icons/fontawesome-free-solid";

export default function Header({ title, back = false, styles, onBack }) {
  return (
    <View style={styles.header}>
      {back && (
        <TouchableOpacity onPress={onBack}>
          <FontAwesomeFreeSolid name="chevron-left" style={styles.backText} size={15}></FontAwesomeFreeSolid>
        </TouchableOpacity>
      )}
      <Text style={styles.headerTitle}>{title}</Text>
    </View>
  );
}
