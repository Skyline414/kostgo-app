import React from 'react';
import { FontAwesomeFreeRegular } from '@react-native-vector-icons/fontawesome-free-regular';
import { FontAwesomeFreeSolid } from '@react-native-vector-icons/fontawesome-free-solid';
import { GREEN } from '../theme';

export default function HeartIcon({ filled }) {
  const Icon = filled ? FontAwesomeFreeSolid : FontAwesomeFreeRegular;
  return <Icon name="heart" size={18} color={GREEN} />;
}
