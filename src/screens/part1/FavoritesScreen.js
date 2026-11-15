import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { KOSTS } from '../../core/data/kosts';
import { useApp } from '../../core/state/AppContext';
import { commonStyles } from '../../core/styles/common';
import Header from '../../core/components/Header';
import KostCard from '../../core/components/KostCard';

export default function FavoritesScreen() {
  const { favorites } = useApp();

  return (
    <ScrollView style={commonStyles.container}>
      <Header title="My Favorites" back />
      <View style={commonStyles.section}>
        {KOSTS.filter(item => favorites.includes(item.id)).map(item => (
          <KostCard key={item.id} item={item} />
        ))}
        {favorites.length === 0 && <Text style={commonStyles.emptyText}>Belum ada kost yang disimpan.</Text>}
      </View>
    </ScrollView>
  );
}
