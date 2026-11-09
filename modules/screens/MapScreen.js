import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Header from '../components/Header';
import KostCard from '../components/KostCard';
import { formatPrice, KOSTS } from '../data';

export default function MapScreen({ styles, onOpen, favorites, onToggleFavorite }) {
  return (
    <ScrollView>
      <Header title="Find Location" styles={styles} />
      <View style={styles.mapSearch}><Text>📍 Denpasar, Bali</Text></View>
      <View style={styles.mapContainer}>
        <View style={styles.mapRoad1} />
        <View style={styles.mapRoad2} />
        <View style={styles.mapRoad3} />
        <Text style={styles.mapLabel}>Jalan Mahendradatta</Text>
        <Text style={styles.mapLabel2}>Area Denpasar</Text>
        {KOSTS.map((item, index) => (
          <TouchableOpacity
            key={item.id}
            style={[styles.mapPin, { top: 85 + index * 95, left: 60 + index * 65 }]}
            onPress={() => onOpen(item)}
          >
            <Text style={{ fontSize: 25 }}>📍</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Nearby Kost</Text>
        {KOSTS.map(item => (
          <KostCard
            key={item.id}
            item={{ ...item, formattedPrice: formatPrice(item.price) }}
            styles={styles}
            onOpen={onOpen}
            isFavorite={favorites.includes(item.id)}
            onToggleFavorite={onToggleFavorite}
          />
        ))}
      </View>
    </ScrollView>
  );
}
