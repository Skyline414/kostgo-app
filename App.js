import React, { useState } from 'react';
import { StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { FontAwesomeFreeSolid } from "@react-native-vector-icons/fontawesome-free-solid";
import { BG, KOSTS } from './modules/data';
import { styles } from './modules/styles';
import HomeScreen from './modules/screens/HomeScreen';
import ExploreScreen from './modules/screens/ExploreScreen';
import DetailScreen from './modules/screens/DetailScreen';
import MapScreen from './modules/screens/MapScreen';
import { FavoritesScreen, ProfileScreen } from './modules/screens/ProfileScreen';

export default function App() {
  const [page, setPage] = useState('Home');
  const [selectedKost, setSelectedKost] = useState(null);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('Semua');
  const [favorites, setFavorites] = useState([]);
  const [booking, setBooking] = useState(false);

  const filteredKosts = KOSTS.filter(item => {
    const query = search.toLowerCase();
    const matchSearch = item.name.toLowerCase().includes(query) || item.location.toLowerCase().includes(query);
    return matchSearch && (filter === 'Semua' || item.type === filter);
  });

  const openDetail = item => {
    setSelectedKost(item);
    setBooking(false);
    setPage('Detail');
  };

  const toggleFavorite = id => {
    setFavorites(prev => prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]);
  };

  const goBackHome = () => setPage('Home');
  const screenProps = { styles, onOpen: openDetail, favorites, onToggleFavorite: toggleFavorite };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor={BG} />
        <View style={styles.content}>
          {page === 'Home' && (
            <HomeScreen {...screenProps} search={search} setSearch={setSearch} setFilter={setFilter} setPage={setPage} />
          )}
          {page === 'Explore' && (
            <ExploreScreen {...screenProps} search={search} setSearch={setSearch} filter={filter} setFilter={setFilter} filteredKosts={filteredKosts} />
          )}
          {page === 'Detail' && selectedKost && (
            <DetailScreen styles={styles} kost={selectedKost} favorites={favorites} booking={booking} setBooking={setBooking} onBack={goBackHome} onToggleFavorite={toggleFavorite} />
          )}
          {page === 'Map' && <MapScreen {...screenProps} />}
          {page === 'Profile' && <ProfileScreen styles={styles} setPage={setPage} />}
          {page === 'Favorites' && (
            <FavoritesScreen {...screenProps} onOpen={item => item ? openDetail(item) : setPage('Profile')} />
          )}
        </View>
        {page !== 'Detail' && page !== 'Favorites' && (
          <View style={styles.bottomNav}>
            {[
              ['home', 'Home'],
              ['compass', 'Explore'],
              ['map-marker-alt', 'Map'],
              ['user', 'Profile'],
            ].map(([icon, title]) => (
              <TouchableOpacity key={title} style={styles.navItem} onPress={() => setPage(title)}>
                <FontAwesomeFreeSolid
                  name={icon}
                  size={20}
                  color={page === title ? '#FFFFFF' : '#A9C5BC'}
                />
                <Text style={[styles.navLabel, page === title && styles.activeNav]}>{title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
