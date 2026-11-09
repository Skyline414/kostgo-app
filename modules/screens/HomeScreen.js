import React from 'react';
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { FontAwesomeFreeRegular } from "@react-native-vector-icons/fontawesome-free-regular";
import { FontAwesomeFreeSolid } from "@react-native-vector-icons/fontawesome-free-solid";
import KostCard from '../components/KostCard';
import { formatPrice, KOSTS } from '../data';

export default function HomeScreen({
  styles, search, setSearch, setFilter, setPage, onOpen, favorites, onToggleFavorite,
}) {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.homeHeader}>
        <View>
          <Text style={styles.smallText}>Selamat datang 👋</Text>
          <Text style={styles.welcome}>Temukan Kost Impianmu</Text>
        </View>
        <FontAwesomeFreeSolid name="user" style={styles.profileIcon}></FontAwesomeFreeSolid>
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
            onSubmitEditing={() => setPage('Explore')}
          />
          <TouchableOpacity style={styles.searchButton} onPress={() => setPage('Explore')}>
            <Text style={{ color: 'white', fontSize: 18 }}>⌕</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.categoryRow}>
          {['Putri', 'Putra', 'Campur'].map(item => (
            <TouchableOpacity key={item} style={styles.category} onPress={() => {
              setFilter(item);
              setPage('Explore');
            }}>
              <Text style={styles.categoryIcon}>
                {item === 'Putri' ? '👩' : item === 'Putra' ? '👨' : '🏠'}
              </Text>
              <Text style={styles.categoryText}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Explore Kost</Text>
          <TouchableOpacity onPress={() => setPage('Explore')}>
            <Text style={styles.seeAll}>See all <FontAwesomeFreeSolid name="arrow-right" size={10} color="#075B4B" /></Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {KOSTS.map(item => (
            <TouchableOpacity key={item.id} style={styles.homeCard} onPress={() => onOpen(item)}>
              <Image source={{ uri: item.image }} style={styles.homeImage} />
              <View style={styles.homeCardInfo}>
                <Text style={styles.kostName}>{item.name}</Text>
                <Text style={styles.rating}>★ {item.rating}</Text>
                <Text style={styles.location}>📍 {item.location}</Text>
                <Text style={styles.price}>{formatPrice(item.price)}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recommended for you</Text>
        {KOSTS.slice(0, 2).map(item => (
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
