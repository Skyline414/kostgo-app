import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import Header from '../components/Header';
import KostCard from '../components/KostCard';
import { formatPrice, KOSTS } from '../data';

export function FavoritesScreen({ styles, favorites, onOpen, onToggleFavorite }) {
  return (
    <ScrollView style={styles.container}>
      <Header title="My Favorites" back styles={styles} onBack={() => onOpen(null)} />
      <View style={styles.section}>
        {KOSTS.filter(item => favorites.includes(item.id)).map(item => (
          <KostCard
            key={item.id}
            item={{ ...item, formattedPrice: formatPrice(item.price) }}
            styles={styles}
            onOpen={onOpen}
            isFavorite
            onToggleFavorite={onToggleFavorite}
          />
        ))}
        {favorites.length === 0 && <Text style={styles.emptyText}>Belum ada kost yang disimpan.</Text>}
      </View>
    </ScrollView>
  );
}
