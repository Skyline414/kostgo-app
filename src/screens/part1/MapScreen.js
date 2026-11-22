import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useApp } from '../../core/state/AppContext';
import useOpenKost from '../../core/hooks/useOpenKost';
import { commonStyles } from '../../core/styles/common';
import Header from '../../core/components/Header';
import KostCard from '../../core/components/KostCard';
import { styles } from './MapScreen.styles';

export default function MapScreen() {
  const openKost = useOpenKost();
  const { kosts } = useApp();

  return (
    <ScrollView style={commonStyles.container}>
      <Header title="Find Location" />
      <View style={styles.mapSearch}><Text>📍 Denpasar, Bali</Text></View>
      <View style={styles.mapContainer}>
        <View style={styles.mapRoad1} />
        <View style={styles.mapRoad2} />
        <View style={styles.mapRoad3} />
        <Text style={styles.mapLabel}>Jalan Mahendradatta</Text>
        <Text style={styles.mapLabel2}>Area Denpasar</Text>
        {kosts.map((item, index) => (
          <TouchableOpacity
            key={item.id}
            style={[styles.mapPin, { top: 85 + index * 95, left: 60 + index * 65 }]}
            onPress={() => openKost(item)}
          >
            <Text style={styles.mapPinIcon}>📍</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={commonStyles.section}>
        <Text style={commonStyles.sectionTitle}>Nearby Kost</Text>
        {kosts.map(item => <KostCard key={item.id} item={item} />)}
      </View>
    </ScrollView>
  );
}
