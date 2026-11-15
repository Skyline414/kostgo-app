import React from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { FILTER_ALL, KOST_TYPES } from '../../core/data/kosts';
import { useApp } from '../../core/state/AppContext';
import { commonStyles } from '../../core/styles/common';
import Header from '../../core/components/Header';
import KostCard from '../../core/components/KostCard';
import { styles } from './ExploreScreen.styles';

const FILTERS = [FILTER_ALL, ...KOST_TYPES];

export default function ExploreScreen() {
  const { search, setSearch, filter, setFilter, filteredKosts } = useApp();

  return (
    <ScrollView
      style={commonStyles.container}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      <Header title="Explore Places" />
      <View style={styles.exploreSearch}>
        <TextInput
          placeholder="Cari nama kost atau lokasi..."
          placeholderTextColor="#999"
          value={search}
          onChangeText={setSearch}
          style={styles.searchInput}
          returnKeyType="search"
        />
        <Text style={styles.searchIcon}>⌕</Text>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filters}>
        {FILTERS.map(item => (
          <TouchableOpacity
            key={item}
            onPress={() => setFilter(item)}
            style={[styles.filterButton, filter === item && styles.activeFilter]}
          >
            <Text style={[styles.filterText, filter === item && styles.activeFilterText]}>{item}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <View style={commonStyles.section}>
        <Text style={commonStyles.sectionTitle}>{filteredKosts.length} Kost ditemukan</Text>
        {filteredKosts.map(item => <KostCard key={item.id} item={item} />)}
        {filteredKosts.length === 0 && (
          <Text style={commonStyles.emptyText}>Kost tidak ditemukan. Coba kata kunci lain.</Text>
        )}
      </View>
    </ScrollView>
  );
}
