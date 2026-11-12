import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import Header from '../components/Header';
import KostCard from '../components/KostCard';
import { formatPrice, KOSTS } from '../data';

export default function BookingsScreen({
  styles, bookings, favorites, onOpen, onToggleFavorite, onBack,
}) {
  const bookedKosts = KOSTS.filter(item => bookings.includes(item.id));

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Header title="My Booking" back styles={styles} onBack={onBack} />
      <View style={styles.section}>
        {bookedKosts.map(item => (
          <KostCard
            key={item.id}
            item={{ ...item, formattedPrice: formatPrice(item.price) }}
            styles={styles}
            onOpen={onOpen}
            isFavorite={favorites.includes(item.id)}
            onToggleFavorite={onToggleFavorite}
          />
        ))}
        {bookedKosts.length === 0 && (
          <Text style={styles.emptyText}>Belum ada kost yang dibooking.</Text>
        )}
      </View>
    </ScrollView>
  );
}
