<<<<<<< HEAD
import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  Pressable,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from 'react-native';

const GREEN = '#075B4B';
const DARK = '#073F36';
const BG = '#F5F6F4';

// ==========================
// DATA KOST
// ==========================

const KOSTS = [
  {
    id: 1,
    name: 'Kost Oemah Kita',
    location: 'Panjer, Denpasar',
    price: 720000,
    rating: 4.8,
    type: 'Putri',
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800',
  },
  {
    id: 2,
    name: 'Kost Putra Residence',
    location: 'Dauh Puri Kaja, Denpasar',
    price: 640000,
    rating: 4.5,
    type: 'Putra',
    image: 'https://images.unsplash.com/photo-1617104678098-de229db51175?w=800',
  },
  {
    id: 3,
    name: 'Kost CCC Plus',
    location: 'Teuku Umar, Denpasar',
    price: 1000000,
    rating: 4.7,
    type: 'Campur',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800',
  },
];

const App = () => {

  // ==========================
  // Start State
  // ==========================

  const [page, setPage] = useState('Home');
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('Semua');
  const [favorites, setFavorites] = useState([]);

  // ==========================
  // End State
  // ==========================


  // ==========================
  // Start Filter Kost
  // ==========================

  const filteredKosts = KOSTS.filter((item) => {

    const keyword = search.trim().toLowerCase();

    const matchSearch =
      item.name.toLowerCase().includes(keyword) ||
      item.location.toLowerCase().includes(keyword);

    const matchFilter =
      filter === 'Semua' || item.type === filter;

    return matchSearch && matchFilter;

  });

  // ==========================
  // End Filter Kost
  // ==========================


  // ==========================
  // Start Fungsi Pencarian
  // ==========================

  const handleSearch = () => {
    setFilter('Semua');
    setPage('Explore');
  };

  // ==========================
  // End Fungsi Pencarian
  // ==========================


  // ==========================
  // Start Fungsi Favorit
  // ==========================

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };

  // ==========================
  // End Fungsi Favorit
  // ==========================


  // ==========================
  // Start Format Harga
  // ==========================

  const formatPrice = (price) => {
    return 'Rp ' + price.toLocaleString('id-ID');
  };

  // ==========================
  // End Format Harga
  // ==========================


  // ==========================
  // Start Kost Card
  // ==========================

  const KostCard = ({ item, horizontal }) => (
    <Pressable
      style={horizontal ? styles.homeCard : styles.kostCard}
    >

      <Image
        source={{ uri: item.image }}
        style={horizontal ? styles.homeImage : styles.kostImage}
      />

      <View style={horizontal ? styles.homeCardInfo : styles.cardInfo}>

        <Text style={styles.kostName} numberOfLines={1}>
          {item.name}
        </Text>

        <Text style={styles.rating}>
          ★ {item.rating}
        </Text>

        <Text style={styles.location} numberOfLines={1}>
          📍 {item.location}
        </Text>

        <Text style={styles.price}>
          {formatPrice(item.price)}
          {!horizontal && (
            <Text style={styles.month}> / bulan</Text>
          )}
        </Text>

      </View>

      {!horizontal && (
        <Pressable
          style={styles.favoriteButton}
          onPress={() => toggleFavorite(item.id)}
        >
          <Text style={styles.favoriteIcon}>
            {favorites.includes(item.id) ? '♥' : '♡'}
          </Text>
        </Pressable>
      )}

    </Pressable>
  );

  // ==========================
  // End Kost Card
  // ==========================


  // ==========================
  // Start Halaman Home
  // ==========================

  const HomeScreen = () => (
    <ScrollView showsVerticalScrollIndicator={false}>

      {/* USER CONTAINER */}

      <View style={styles.homeHeader}>

        <View>
          <Text style={styles.smallText}>
            Selamat datang 👋
          </Text>

          <Text style={styles.welcome}>
            Temukan Kost Impianmu
          </Text>
        </View>

        <Pressable onPress={() => setPage('Profile')}>
          <Text style={styles.profileIcon}>👤</Text>
        </Pressable>

      </View>


      {/* HERO CONTAINER */}

      <View style={styles.hero}>

        <Text style={styles.heroTitle}>
          Find your dream
          {'\n'}
          place to stay
        </Text>

        <Text style={styles.heroSubtitle}>
          Temukan tempat tinggal nyaman untukmu
        </Text>


        {/* SEARCH HOME */}

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

          <Pressable
            style={styles.searchButton}
            onPress={handleSearch}
          >
            <Text style={styles.searchIcon}>⌕</Text>
          </Pressable>

        </View>


        {/* CATEGORY */}

        <View style={styles.categoryRow}>

          {['Putri', 'Putra', 'Campur'].map((item) => (

            <Pressable
              key={item}
              style={styles.category}
              onPress={() => {
                setFilter(item);
                setPage('Explore');
              }}
            >

              <Text style={styles.categoryIcon}>
                {item === 'Putri'
                  ? '👩'
                  : item === 'Putra'
                  ? '👨'
                  : '🏠'}
              </Text>

              <Text style={styles.categoryText}>
                {item}
              </Text>

            </Pressable>

          ))}

        </View>

      </View>


      {/* EXPLORE KOST */}

      <View style={styles.section}>

        <View style={styles.sectionHeader}>

          <Text style={styles.sectionTitle}>
            Explore Kost
          </Text>

          <Pressable
            onPress={() => {
              setFilter('Semua');
              setPage('Explore');
            }}
          >
            <Text style={styles.seeAll}>
              See all →
            </Text>
          </Pressable>

        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
        >

          {KOSTS.map((item) => (
            <KostCard
              key={item.id}
              item={item}
              horizontal={true}
            />
          ))}

        </ScrollView>

      </View>

    </ScrollView>
  );

  // ==========================
  // End Halaman Home
  // ==========================


  // ==========================
  // Start Halaman Explore
  // ==========================

  const ExploreScreen = () => (

    <ScrollView
      style={styles.exploreScreen}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >

      <Text style={styles.exploreTitle}>
        Explore Places
      </Text>


      {/* SEARCH EXPLORE */}

      <View style={styles.exploreSearch}>

        <TextInput
          placeholder="Cari nama kost atau lokasi..."
          placeholderTextColor="#999"
          style={styles.searchInput}
          value={search}
          onChangeText={setSearch}
          returnKeyType="search"
        />

        <Text style={styles.exploreSearchIcon}>
          🔍
        </Text>

      </View>


      {/* FILTER CONTAINER */}

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filters}
      >

        {['Semua', 'Putri', 'Putra', 'Campur'].map((item) => (

          <Pressable
            key={item}
            onPress={() => setFilter(item)}
            style={[
              styles.filterButton,
              filter === item && styles.activeFilter,
            ]}
          >

            <Text
              style={[
                styles.filterText,
                filter === item && styles.activeFilterText,
              ]}
            >
              {item}
            </Text>

          </Pressable>

        ))}

      </ScrollView>


      {/* LIST KOST */}

      <Text style={styles.resultTitle}>
        {filteredKosts.length} Kost ditemukan
      </Text>

      {filteredKosts.map((item) => (

        <KostCard
          key={item.id}
          item={item}
          horizontal={false}
        />

      ))}

      {filteredKosts.length === 0 && (

        <Text style={styles.emptyText}>
          Kost tidak ditemukan. Coba kata kunci lain.
        </Text>

      )}

    </ScrollView>

  );

  // ==========================
  // End Halaman Explore
  // ==========================


  // ==========================
  // Start Halaman Map
  // Dikerjakan oleh teman
  // ==========================


  // ==========================
  // End Halaman Map
  // ==========================


  // ==========================
  // Start Halaman Profile
  // Dikerjakan oleh teman
  // ==========================


  // ==========================
  // End Halaman Profile
  // ==========================


  // ==========================
  // Start Bottom Navigation
  // ==========================

  const BottomNavigation = () => (

    <View style={styles.bottomNav}>

      {[
        ['🏠', 'Home'],
        ['🔍', 'Explore'],
        ['🗺️', 'Map'],
        ['👤', 'Profile'],
      ].map(([icon, title]) => (

        <Pressable
          key={title}
          style={styles.navItem}
          onPress={() => setPage(title)}
        >

          <Text
            style={[
              styles.navIcon,
              page === title && styles.activeNav,
            ]}
          >
            {icon}
          </Text>

          <Text
            style={[
              styles.navLabel,
              page === title && styles.activeNav,
            ]}
          >
            {title}
          </Text>

        </Pressable>

      ))}

    </View>

  );

  // ==========================
  // End Bottom Navigation
  // ==========================


  // ==========================
  // Start Main Container
  // ==========================

  return (

    <SafeAreaView style={styles.container}>

      <StatusBar
        barStyle="dark-content"
        backgroundColor={BG}
      />

      <View style={styles.content}>

        {page === 'Home' && <HomeScreen />}

        {page === 'Explore' && <ExploreScreen />}

        {/* Map dan Profile disediakan untuk teman */}

      </View>

      <BottomNavigation />

    </SafeAreaView>

  );

  // ==========================
  // End Main Container
  // ==========================

};


// ==========================
// Start StyleSheet
// ==========================

const styles = StyleSheet.create({

  // MAIN CONTAINER

  container: {
    flex: 1,
    backgroundColor: BG,
  },

  content: {
    flex: 1,
  },


  // HOME HEADER

  homeHeader: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  smallText: {
    color: '#888',
    fontSize: 12,
  },

  welcome: {
    fontSize: 20,
    fontWeight: 'bold',
    color: DARK,
    marginTop: 5,
  },

  profileIcon: {
    fontSize: 27,
    color: DARK,
  },


  // HERO CONTAINER

  hero: {
    marginHorizontal: 16,
    backgroundColor: GREEN,
    borderRadius: 20,
    padding: 22,
    paddingTop: 28,
  },

  heroTitle: {
    fontSize: 25,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 33,
  },

  heroSubtitle: {
    color: '#D2E5DF',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 10,
  },


  // SEARCH CONTAINER

  searchBox: {
    backgroundColor: 'white',
    borderRadius: 30,
    marginTop: 22,
    paddingLeft: 18,
    paddingRight: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },

  searchInput: {
    flex: 1,
    height: 46,
    color: '#333',
    fontSize: 13,
  },

  searchButton: {
    backgroundColor: GREEN,
    width: 36,
    height: 36,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },

  searchIcon: {
    color: 'white',
    fontSize: 20,
  },


  // CATEGORY CONTAINER

  categoryRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 25,
  },

  category: {
    alignItems: 'center',
  },

  categoryIcon: {
    fontSize: 23,
    backgroundColor: '#FFFFFF25',
    padding: 10,
    borderRadius: 30,
  },

  categoryText: {
    color: 'white',
    fontSize: 12,
    marginTop: 7,
  },


  // EXPLORE KOST

  section: {
    paddingHorizontal: 18,
    paddingTop: 22,
    paddingBottom: 12,
  },

  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: DARK,
  },

  seeAll: {
    color: GREEN,
    fontSize: 13,
  },

  homeCard: {
    width: 232,
    backgroundColor: 'white',
    borderRadius: 15,
    overflow: 'hidden',
    marginRight: 13,
    elevation: 3,
    marginBottom: 5,
  },

  homeImage: {
    width: '100%',
    height: 145,
  },

  homeCardInfo: {
    padding: 12,
  },


  // EXPLORE SCREEN

  exploreScreen: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
  },

  exploreTitle: {
    fontSize: 19,
    fontWeight: 'bold',
    color: DARK,
    marginBottom: 22,
  },

  exploreSearch: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },

  exploreSearchIcon: {
    fontSize: 22,
    color: '#222',
  },


  // FILTER CONTAINER

  filters: {
    marginTop: 17,
    marginBottom: 20,
    maxHeight: 43,
  },

  filterButton: {
    backgroundColor: 'white',
    borderRadius: 22,
    paddingHorizontal: 21,
    paddingVertical: 11,
    marginRight: 8,
  },

  activeFilter: {
    backgroundColor: GREEN,
  },

  filterText: {
    color: GREEN,
    fontSize: 12,
  },

  activeFilterText: {
    color: 'white',
  },


  // LIST KOST

  resultTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: DARK,
    marginBottom: 14,
  },

  kostCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    marginBottom: 15,
    overflow: 'hidden',
    elevation: 2,
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 120,
  },

  kostImage: {
    width: 115,
    height: 120,
  },

  cardInfo: {
    flex: 1,
    paddingHorizontal: 11,
    paddingVertical: 12,
    paddingRight: 35,
  },

  kostName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#222',
  },

  rating: {
    color: GREEN,
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 3,
  },

  location: {
    color: '#888',
    fontSize: 10,
    marginTop: 7,
  },

  price: {
    color: GREEN,
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 9,
  },

  month: {
    color: '#888',
    fontSize: 10,
    fontWeight: 'normal',
  },


  // FAVORITE

  favoriteButton: {
    position: 'absolute',
    right: 12,
    top: 13,
    backgroundColor: 'white',
    width: 28,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },

  favoriteIcon: {
    color: GREEN,
    fontSize: 24,
  },


  // EMPTY RESULT

  emptyText: {
    textAlign: 'center',
    color: '#888',
    marginTop: 35,
  },


  // BOTTOM NAVIGATION

  bottomNav: {
    height: 72,
    backgroundColor: GREEN,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },

  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },

  navIcon: {
    fontSize: 24,
    color: '#A9C5BC',
  },

  navLabel: {
    fontSize: 10,
    color: '#A9C5BC',
    marginTop: 3,
  },

  activeNav: {
    color: 'white',
    fontWeight: 'bold',
  },

});

// ==========================
// End StyleSheet
// ==========================

export default App;
=======
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { AppProvider } from './src/core/state/AppContext';
import { BG } from './src/core/theme';
import { commonStyles } from './src/core/styles/common';
import RootNavigator from './src/navigation/RootNavigator';

export default function App() {
  return (
    <SafeAreaProvider>
      <AppProvider>
        <StatusBar style="dark" backgroundColor={BG} />
        <SafeAreaView style={commonStyles.container} edges={['top']}>
          <RootNavigator />
        </SafeAreaView>
      </AppProvider>
    </SafeAreaProvider>
  );
}
>>>>>>> 08ca74c9d580789e32f2d5347fb6fa0b5e2f2f1a
