import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { useApp } from '../../core/state/AppContext';
import { commonStyles } from '../../core/styles/common';
import Header from '../../core/components/Header';
import KostCard from '../../core/components/KostCard';

export default function BookingsScreen() {
  const { kosts, bookings } = useApp();
  const bookedKosts = kosts.filter(item => bookings.includes(item.id));

  return (
    <ScrollView style={commonStyles.container} showsVerticalScrollIndicator={false}>
      <Header title="My Booking" back />
      <View style={commonStyles.section}>
        {bookedKosts.map(item => <KostCard key={item.id} item={item} />)}
        {bookedKosts.length === 0 && (
          <Text style={commonStyles.emptyText}>Belum ada kost yang dibooking.</Text>
        )}
      </View>
    </ScrollView>
  );
}
