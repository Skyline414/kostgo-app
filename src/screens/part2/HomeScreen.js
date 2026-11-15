import React from 'react';
import { Image, Pressable, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesomeFreeSolid } from '@react-native-vector-icons/fontawesome-free-solid';
import { FILTER_ALL, KOST_TYPES, KOSTS } from '../../core/data/kosts';
import useOpenKost from '../../core/hooks/useOpenKost';
import { useApp } from '../../core/state/AppContext';
import { formatPrice } from '../../core/utils/format';
import { commonStyles } from '../../core/styles/common';
import { GREEN } from '../../core/theme';
import KostCard from '../../core/components/KostCard';
import { styles } from './HomeScreen.styles';

const CATEGORY_ICONS = { Putri: '👩', Putra: '👨', Campur: '🏠' };

export default function HomeScreen() {
  const navigation = useNavigation();
  const { search, setSearch, setFilter } = useApp();
  const openKost = useOpenKost();

  const goToExplore = () => navigation.navigate('Explore');

  // Cari dari Home selalu mulai dari semua kategori.
  const handleSearch = () => {
    setFilter(FILTER_ALL);
    goToExplore();
  };

  const handleCategory = category => {
    setFilter(category);
    goToExplore();
  };

  return (
    <ScrollView style={commonStyles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.homeHeader}>
        <View>
          <Text style={commonStyles.smallText}>Selamat datang 👋</Text>
          <Text style={styles.welcome}>Temukan Kost Impianmu</Text>
        </View>
        <Pressable onPress={() => navigation.navigate('Profile')}>
          <FontAwesomeFreeSolid name="user" style={styles.profileIcon} />
        </Pressable>
      </View>

      <View style={styles.hero}>
        <Text style={styles.heroTitle}>Find your dream{'\n'}place to stay</Text>
        <Text style={styles.heroSubtitle}>Temukan tempat tinggal nyaman untukmu</Text>
        <View style={styles.searchBox}>
          <TextInput
            placeholder="Cari lokasi atau nama kost..."
            placeholderTextColor="#888"
            style={styles.searchInput}
            value={search}
            onChangeText={setSearch}
            onSubmitEditing={handleSearch}
            returnKeyType="search"
          />
          <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
            <Text style={styles.searchButtonIcon}>⌕</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.categoryRow}>
          {KOST_TYPES.map(item => (
            <TouchableOpacity key={item} style={styles.category} onPress={() => handleCategory(item)}>
              <Text style={styles.categoryIcon}>{CATEGORY_ICONS[item]}</Text>
              <Text style={styles.categoryText}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={commonStyles.section}>
        <View style={styles.sectionHeader}>
          <Text style={commonStyles.sectionTitle}>Explore Kost</Text>
          <TouchableOpacity onPress={handleSearch}>
            <Text style={styles.seeAll}>See all <FontAwesomeFreeSolid name="arrow-right" size={10} color={GREEN} /></Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {KOSTS.map(item => (
            <TouchableOpacity key={item.id} style={styles.homeCard} onPress={() => openKost(item)}>
              <Image source={{ uri: item.image }} style={styles.homeImage} />
              <View style={styles.homeCardInfo}>
                <Text style={commonStyles.kostName} numberOfLines={1}>{item.name}</Text>
                <Text style={commonStyles.rating}>★ {item.rating}</Text>
                <Text style={commonStyles.location} numberOfLines={1}>📍 {item.location}</Text>
                <Text style={commonStyles.price}>{formatPrice(item.price)}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={commonStyles.section}>
        <Text style={commonStyles.sectionTitle}>Recommended for you</Text>
        {KOSTS.slice(0, 2).map(item => <KostCard key={item.id} item={item} />)}
      </View>
    </ScrollView>
  );
}
