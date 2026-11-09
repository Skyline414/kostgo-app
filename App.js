import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';
import {
  SafeAreaView,
  SafeAreaProvider
} from 'react-native-safe-area-context';

const GREEN = '#075B4B';
const DARK = '#073F36';
const BG = '#F5F6F4';

const KOSTS = [
  {
    id: 1,
    name: 'Kost Oemah Kita',
    location: 'Purwokerto, Banyumas',
    price: 720000,
    rating: 4.8,
    type: 'Putri',
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800',
    description: 'Kost nyaman dengan desain modern dan lingkungan yang tenang. Memiliki fasilitas lengkap untuk menunjang aktivitas sehari-hari.',
    facilities: ['WiFi', 'AC', 'Kasur', 'Lemari', 'Kamar Mandi'],
  },
  {
    id: 2,
    name: 'Kost Putra Residence',
    location: 'Purwokerto, Banyumas',
    price: 640000,
    rating: 4.5,
    type: 'Putra',
    image: 'https://images.unsplash.com/photo-1617104678098-de229db51175?w=800',
    description: 'Hunian praktis dan nyaman dengan akses mudah ke kampus dan pusat kota.',
    facilities: ['WiFi', 'Kasur', 'Lemari', 'Parkir'],
  },
  {
    id: 3,
    name: 'Kost CCC Plus',
    location: 'Purwokerto, Banyumas',
    price: 1000000,
    rating: 4.7,
    type: 'Campur',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800',
    description: 'Kost modern dengan interior minimalis dan fasilitas yang memadai.',
    facilities: ['WiFi', 'AC', 'Laundry', 'Parkir'],
  },
];

export default function App() {
  const [page, setPage] = useState('Home');
  const [selectedKost, setSelectedKost] = useState(null);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('Semua');
  const [favorites, setFavorites] = useState([]);
  const [booking, setBooking] = useState(false);

  const filteredKosts = KOSTS.filter(item => {
    const matchSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.location.toLowerCase().includes(search.toLowerCase());

    const matchFilter =
      filter === 'Semua' || item.type === filter;

    return matchSearch && matchFilter;
  });

  const openDetail = (item) => {
    setSelectedKost(item);
    setBooking(false);
    setPage('Detail');
  };

  const toggleFavorite = (id) => {
    setFavorites(prev =>
      prev.includes(id)
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const formatPrice = (price) =>
    'Rp ' + price.toLocaleString('id-ID');

  const KostCard = ({ item }) => (
    <TouchableOpacity
      style={styles.kostCard}
      onPress={() => openDetail(item)}
      activeOpacity={0.85}
    >
      <Image source={{ uri: item.image }} style={styles.kostImage} />

      <View style={styles.cardInfo}>
        <View style={styles.cardTop}>
          <Text style={styles.kostName}>{item.name}</Text>
          <Text style={styles.rating}>★ {item.rating}</Text>
        </View>

        <Text style={styles.location}>📍 {item.location}</Text>

        <Text style={styles.price}>
          {formatPrice(item.price)}
          <Text style={styles.month}> / bulan</Text>
        </Text>
      </View>

      <TouchableOpacity
        style={styles.favoriteButton}
        onPress={() => toggleFavorite(item.id)}
      >
        <Text style={{ fontSize: 19 }}>
          {favorites.includes(item.id) ? '❤️' : '♡'}
        </Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const Header = ({ title, back = false }) => (
    <View style={styles.header}>
      {back && (
        <TouchableOpacity onPress={() => setPage('Home')}>
          <Text style={styles.backText}>‹</Text>
        </TouchableOpacity>
      )}
      <Text style={styles.headerTitle}>{title}</Text>
      {!back && <Text style={styles.headerIcon}>⌕</Text>}
    </View>
  );

  const HomeScreen = () => (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.homeHeader}>
        <View>
          <Text style={styles.smallText}>Selamat datang 👋</Text>
          <Text style={styles.welcome}>Temukan Kost Impianmu</Text>
        </View>
        <Text style={styles.profileIcon}>👤</Text>
      </View>

      <View style={styles.hero}>
        <Text style={styles.heroTitle}>
          Find your dream{'\n'}place to stay
        </Text>
        <Text style={styles.heroSubtitle}>
          Temukan tempat tinggal nyaman untukmu
        </Text>

        <View style={styles.searchBox}>
          <TextInput
            placeholder="Cari lokasi atau nama kost..."
            placeholderTextColor="#888"
            style={styles.searchInput}
            value={search}
            onChangeText={setSearch}
            onSubmitEditing={() => setPage('Explore')}
          />
          <TouchableOpacity
            style={styles.searchButton}
            onPress={() => setPage('Explore')}
          >
            <Text style={{ color: 'white', fontSize: 18 }}>⌕</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.categoryRow}>
          {['Putri', 'Putra', 'Campur'].map((item) => (
            <TouchableOpacity
              key={item}
              style={styles.category}
              onPress={() => {
                setFilter(item);
                setPage('Explore');
              }}
            >
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
            <Text style={styles.seeAll}>See all →</Text>
          </TouchableOpacity>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {KOSTS.map(item => (
            <TouchableOpacity
              key={item.id}
              style={styles.homeCard}
              onPress={() => openDetail(item)}
            >
              <Image source={{ uri: item.image }} style={styles.homeImage} />
              <View style={styles.homeCardInfo}>
                <Text style={styles.kostName}>{item.name}</Text>
                <Text style={styles.location}>📍 {item.location}</Text>
                <Text style={styles.rating}>★ {item.rating}</Text>
                <Text style={styles.price}>{formatPrice(item.price)}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recommended for you</Text>
        {KOSTS.slice(0, 2).map(item => (
          <KostCard key={item.id} item={item} />
        ))}
      </View>
    </ScrollView>
  );

  const ExploreScreen = () => (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Header title="Explore Places" />

      <View style={styles.exploreSearch}>
        <TextInput
          placeholder="Cari kost..."
          value={search}
          onChangeText={setSearch}
          style={styles.searchInput}
        />
        <Text style={{ fontSize: 20 }}>⌕</Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filters}
      >
        {['Semua', 'Putri', 'Putra', 'Campur'].map(item => (
          <TouchableOpacity
            key={item}
            onPress={() => setFilter(item)}
            style={[
              styles.filterButton,
              filter === item && styles.activeFilter
            ]}
          >
            <Text style={[
              styles.filterText,
              filter === item && { color: 'white' }
            ]}>
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          {filteredKosts.length} Kost ditemukan
        </Text>

        {filteredKosts.map(item => (
          <KostCard key={item.id} item={item} />
        ))}

        {filteredKosts.length === 0 && (
          <Text style={styles.emptyText}>
            Kost tidak ditemukan. Coba kata kunci lain.
          </Text>
        )}
      </View>
    </ScrollView>
  );

  const DetailScreen = () => (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.detailImageContainer}>
        <Image
          source={{ uri: selectedKost.image }}
          style={styles.detailImage}
        />
        <TouchableOpacity
          style={styles.imageBack}
          onPress={() => setPage('Home')}
        >
          <Text style={styles.backText}>‹</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.imageFavorite}
          onPress={() => toggleFavorite(selectedKost.id)}
        >
          <Text style={{ fontSize: 23 }}>
            {favorites.includes(selectedKost.id) ? '❤️' : '♡'}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.detailContent}>
        <View style={styles.cardTop}>
          <Text style={styles.detailTitle}>{selectedKost.name}</Text>
          <Text style={styles.rating}>★ {selectedKost.rating}</Text>
        </View>

        <Text style={styles.location}>
          📍 {selectedKost.location}
        </Text>

        <Text style={styles.sectionTitle}>About</Text>
        <Text style={styles.description}>
          {selectedKost.description}
        </Text>

        <Text style={styles.sectionTitle}>Facilities</Text>
        <View style={styles.facilityContainer}>
          {selectedKost.facilities.map((item, index) => (
            <View style={styles.facility} key={index}>
              <Text style={styles.facilityText}>✓ {item}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Gallery</Text>
        <Image
          source={{ uri: selectedKost.image }}
          style={styles.galleryImage}
        />

        <View style={styles.bookingRow}>
          <View>
            <Text style={styles.smallText}>Price / month</Text>
            <Text style={styles.bookingPrice}>
              {formatPrice(selectedKost.price)}
            </Text>
          </View>

          <TouchableOpacity
            style={styles.bookButton}
            onPress={() => setBooking(true)}
          >
            <Text style={styles.bookText}>
              {booking ? 'Booking Berhasil ✓' : 'Book Now'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );

  const MapScreen = () => (
    <ScrollView>
      <Header title="Find Location" />

      <View style={styles.mapSearch}>
        <Text>📍 Purwokerto, Banyumas</Text>
      </View>

      <View style={styles.mapContainer}>
        <View style={styles.mapRoad1} />
        <View style={styles.mapRoad2} />
        <View style={styles.mapRoad3} />

        <Text style={styles.mapLabel}>Jalan Jenderal Sudirman</Text>
        <Text style={styles.mapLabel2}>Area Purwokerto</Text>

        {KOSTS.map((item, index) => (
          <TouchableOpacity
            key={item.id}
            style={[
              styles.mapPin,
              { top: 75 + index * 85, left: 75 + index * 65 }
            ]}
            onPress={() => openDetail(item)}
          >
            <Text style={{ fontSize: 25 }}>📍</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Nearby Kost</Text>
        {KOSTS.map(item => (
          <KostCard key={item.id} item={item} />
        ))}
      </View>
    </ScrollView>
  );

  const ProfileScreen = () => (
    <ScrollView>
      <Header title="My Profile" />

      <View style={styles.profileContainer}>
        <View style={styles.avatar}>
          <Text style={{ fontSize: 45 }}>👩🏻</Text>
        </View>
        <Text style={styles.profileName}>Cynthya</Text>
        <Text style={styles.smallText}>kostmate@email.com</Text>
      </View>

      <View style={styles.profileMenu}>
        {[
          ['👤', 'Edit Profile'],
          ['❤️', 'My Favorites'],
          ['📅', 'My Booking'],
          ['⚙️', 'Settings'],
          ['❓', 'Help Center'],
          ['🚪', 'Log Out'],
        ].map(([icon, title]) => (
          <TouchableOpacity
            key={title}
            style={styles.menuItem}
            onPress={() => {
              if (title === 'My Favorites') setPage('Favorites');
            }}
          >
            <Text style={styles.menuText}>{icon}   {title}</Text>
            <Text style={styles.menuArrow}>›</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );

  const FavoritesScreen = () => (
    <ScrollView>
      <Header title="My Favorites" back />
      <View style={styles.section}>
        {KOSTS.filter(item => favorites.includes(item.id)).map(item => (
          <KostCard key={item.id} item={item} />
        ))}
        {favorites.length === 0 && (
          <Text style={styles.emptyText}>
            Belum ada kost yang disimpan.
          </Text>
        )}
      </View>
    </ScrollView>
  );

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor={BG} />

        <View style={styles.content}>
          {page === 'Home' && <HomeScreen />}
          {page === 'Explore' && <ExploreScreen />}
          {page === 'Detail' && <DetailScreen />}
          {page === 'Map' && <MapScreen />}
          {page === 'Profile' && <ProfileScreen />}
          {page === 'Favorites' && <FavoritesScreen />}
        </View>

        {page !== 'Detail' &&
        page !== 'Favorites' && (
          <View style={styles.bottomNav}>
            {[
              ['⌂', 'Home'],
              ['⌕', 'Explore'],
              ['◎', 'Map'],
              ['♙', 'Profile'],
            ].map(([icon, title]) => (
              <TouchableOpacity
                key={title}
                style={styles.navItem}
                onPress={() => setPage(title)}
              >
                <Text style={[
                  styles.navIcon,
                  page === title && styles.activeNav
                ]}>
                  {icon}
                </Text>
                <Text style={[
                  styles.navLabel,
                  page === title && styles.activeNav
                ]}>
                  {title}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG,
  },
  content: {
    flex: 1,
  },
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
  },
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
  searchBox: {
    backgroundColor: 'white',
    borderRadius: 30,
    marginTop: 22,
    paddingLeft: 15,
    paddingRight: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    height: 45,
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
  section: {
    padding: 18,
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
    marginBottom: 14,
  },
  seeAll: {
    color: GREEN,
    fontSize: 13,
  },
  homeCard: {
    width: 220,
    backgroundColor: 'white',
    borderRadius: 15,
    overflow: 'hidden',
    marginRight: 13,
    elevation: 3,
    marginBottom: 5,
  },
  homeImage: {
    width: '100%',
    height: 140,
  },
  homeCardInfo: {
    padding: 12,
  },
  kostCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    marginBottom: 15,
    overflow: 'hidden',
    elevation: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  kostImage: {
    width: 110,
    height: 115,
  },
  cardInfo: {
    flex: 1,
    padding: 11,
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  kostName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#222',
    flexShrink: 1,
  },
  location: {
    color: '#888',
    fontSize: 10,
    marginTop: 7,
  },
  rating: {
    color: GREEN,
    fontSize: 12,
    fontWeight: 'bold',
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
  favoriteButton: {
    position: 'absolute',
    right: 12,
    top: 10,
    backgroundColor: 'white',
    borderRadius: 20,
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    height: 65,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: DARK,
  },
  headerIcon: {
    fontSize: 25,
    color: GREEN,
  },
  backText: {
    fontSize: 35,
    color: GREEN,
  },
  exploreSearch: {
    backgroundColor: 'white',
    marginHorizontal: 18,
    paddingHorizontal: 15,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  filters: {
    paddingHorizontal: 15,
    marginTop: 18,
    maxHeight: 45,
  },
  filterButton: {
    backgroundColor: 'white',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginHorizontal: 4,
  },
  activeFilter: {
    backgroundColor: GREEN,
  },
  filterText: {
    color: GREEN,
    fontSize: 12,
  },
  emptyText: {
    textAlign: 'center',
    color: '#888',
    marginTop: 35,
  },
  detailImageContainer: {
    height: 300,
  },
  detailImage: {
    width: '100%',
    height: '100%',
  },
  imageBack: {
    position: 'absolute',
    top: 20,
    left: 18,
    backgroundColor: 'white',
    borderRadius: 25,
    width: 42,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageFavorite: {
    position: 'absolute',
    top: 20,
    right: 18,
    backgroundColor: 'white',
    borderRadius: 25,
    width: 42,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailContent: {
    padding: 20,
  },
  detailTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: DARK,
  },
  description: {
    fontSize: 13,
    lineHeight: 22,
    color: '#777',
    marginBottom: 22,
  },
  facilityContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  facility: {
    backgroundColor: '#E4F0EC',
    padding: 10,
    borderRadius: 10,
    marginRight: 8,
    marginBottom: 8,
  },
  facilityText: {
    color: GREEN,
    fontSize: 11,
  },
  galleryImage: {
    width: '100%',
    height: 180,
    borderRadius: 15,
    marginBottom: 20,
  },
  bookingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: '#eee',
    paddingTop: 18,
    paddingBottom: 20,
  },
  bookingPrice: {
    color: GREEN,
    fontSize: 19,
    fontWeight: 'bold',
  },
  bookButton: {
    backgroundColor: GREEN,
    paddingHorizontal: 28,
    paddingVertical: 15,
    borderRadius: 12,
  },
  bookText: {
    color: 'white',
    fontWeight: 'bold',
  },
  mapSearch: {
    backgroundColor: 'white',
    margin: 18,
    padding: 16,
    borderRadius: 12,
  },
  mapContainer: {
    height: 400,
    backgroundColor: '#E8EAE6',
    marginHorizontal: 15,
    borderRadius: 15,
    overflow: 'hidden',
    position: 'relative',
  },
  mapRoad1: {
    position: 'absolute',
    backgroundColor: 'white',
    width: 550,
    height: 35,
    top: 170,
    left: -50,
    transform: [{ rotate: '35deg' }],
  },
  mapRoad2: {
    position: 'absolute',
    backgroundColor: 'white',
    width: 500,
    height: 28,
    top: 70,
    left: -70,
    transform: [{ rotate: '-30deg' }],
  },
  mapRoad3: {
    position: 'absolute',
    backgroundColor: 'white',
    width: 30,
    height: 500,
    left: 180,
    top: -40,
    transform: [{ rotate: '15deg' }],
  },
  mapLabel: {
    position: 'absolute',
    top: 35,
    left: 15,
    color: '#888',
    fontSize: 11,
  },
  mapLabel2: {
    position: 'absolute',
    bottom: 35,
    right: 20,
    color: '#888',
    fontSize: 12,
  },
  mapPin: {
    position: 'absolute',
  },
  profileContainer: {
    alignItems: 'center',
    padding: 30,
  },
  avatar: {
    width: 100,
    height: 100,
    backgroundColor: '#DCEBE4',
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileName: {
    fontSize: 21,
    fontWeight: 'bold',
    color: DARK,
    marginTop: 15,
  },
  profileMenu: {
    backgroundColor: 'white',
    margin: 18,
    borderRadius: 15,
    paddingHorizontal: 18,
  },
  menuItem: {
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderColor: '#eee',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  menuText: {
    fontSize: 14,
    color: '#333',
  },
  menuArrow: {
    fontSize: 20,
    color: '#999',
  },
  bottomNav: {
    height: 70,
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
