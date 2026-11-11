import React from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Header from '../components/Header';
import KostCard from '../components/KostCard';
import { formatPrice } from '../data';

export default function ExploreScreen({
  styles, search, setSearch, filter, setFilter, filteredKosts, onOpen, favorites, onToggleFavorite,
}) {
  return (
    <View>
      <Header title="Explore Places" styles={styles} />
      <View style={styles.exploreSearch}>
        <TextInput
          placeholder="Cari kost..."
          value={search}
          onChangeText={setSearch}
          style={styles.searchInput}
        />
        <Text style={{ fontSize: 20 }}>⌕</Text>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filters}>
        {['Semua', 'Putri', 'Putra', 'Campur'].map(item => (
          <TouchableOpacity
            key={item}
            onPress={() => setFilter(item)}
            style={[styles.filterButton, filter === item && styles.activeFilter]}
          >
            <Text style={[styles.filterText, filter === item && { color: 'white' }]}>{item}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{filteredKosts.length} Kost ditemukan</Text>
        {filteredKosts.map(item => (
          <KostCard
            key={item.id}
            item={{ ...item, formattedPrice: formatPrice(item.price) }}
            styles={styles}
            onOpen={onOpen}
            isFavorite={favorites.includes(item.id)}
            onToggleFavorite={onToggleFavorite}
          />
        ))}
        {filteredKosts.length === 0 && (
          <Text style={styles.emptyText}>Kost tidak ditemukan. Coba kata kunci lain.</Text>
        )}
      </View>
    </View>
  );
}
