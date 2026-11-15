import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { useApp } from '../state/AppContext';
import useOpenKost from '../hooks/useOpenKost';
import { formatPrice } from '../utils/format';
import { commonStyles } from '../styles/common';
import HeartIcon from './HeartIcon';
import { styles } from './KostCard.styles';

export default function KostCard({ item }) {
  const { favorites, toggleFavorite } = useApp();
  const openKost = useOpenKost();

  return (
    <TouchableOpacity
      style={styles.kostCard}
      onPress={() => openKost(item)}
      activeOpacity={0.85}
    >
      <Image source={{ uri: item.image }} style={styles.kostImage} />
      <View style={styles.cardInfo}>
        <View>
          <Text style={commonStyles.kostName}>{item.name}</Text>
        </View>
        <Text style={commonStyles.rating}>★ {item.rating}</Text>
        <Text style={commonStyles.location}>📍 {item.location}</Text>
        <Text style={commonStyles.price}>
          {formatPrice(item.price)}
          <Text style={styles.month}> / bulan</Text>
        </Text>
      </View>
      <TouchableOpacity
        style={styles.favoriteButton}
        onPress={() => toggleFavorite(item.id)}
      >
        <HeartIcon filled={favorites.includes(item.id)} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}
