import React, { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react';
import { BackHandler, ToastAndroid } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer, useFocusEffect } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FontAwesomeFreeSolid } from '@react-native-vector-icons/fontawesome-free-solid';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { BG, KOSTS } from './modules/data';
import { styles } from './modules/styles';
import BottomBar from './modules/components/BottomBar';
import HomeScreen from './modules/screens/HomeScreen';
import ExploreScreen from './modules/screens/ExploreScreen';
import DetailScreen from './modules/screens/DetailScreen';
import MapScreen from './modules/screens/MapScreen';
import { ProfileScreen } from './modules/screens/ProfileScreen';
import { FavoritesScreen } from './modules/screens/FavoritesScreen';
import BookingsScreen from './modules/screens/BookingsScreen';

const Stack = createNativeStackNavigator();
const Tabs = createBottomTabNavigator();
const AppContext = createContext(null);

function useApp() {
  const value = useContext(AppContext);
  if (!value) throw new Error('useApp must be used inside AppProvider');
  return value;
}

function AppProvider({ children }) {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('Semua');
  const [favorites, setFavorites] = useState([]);
  const [bookings, setBookings] = useState([]);

  const filteredKosts = useMemo(() => KOSTS.filter(item => {
    const query = search.toLowerCase();
    return (item.name.toLowerCase().includes(query) || item.location.toLowerCase().includes(query))
      && (filter === 'Semua' || item.type === filter);
  }), [filter, search]);

  const toggleFavorite = id => setFavorites(previous => (
    previous.includes(id)
      ? previous.filter(item => item !== id)
      : [...previous, id]
  ));
  const addBooking = id => setBookings(previous => (
    previous.includes(id) ? previous : [...previous, id]
  ));

  return (
    <AppContext.Provider value={{
      search, setSearch, filter, setFilter, favorites, bookings,
      filteredKosts, toggleFavorite, addBooking,
    }}>
      {children}
    </AppContext.Provider>
  );
}

function MainTabs({ navigation }) {
  const app = useApp();
  const tabHistory = useRef(['Home']);
  const recordTab = tab => {
    if (tabHistory.current[tabHistory.current.length - 1] !== tab) {
      tabHistory.current.push(tab);
    }
  };
  useFocusEffect(useCallback(() => {
    let lastBack = 0;
    const handleBack = () => {
      if (tabHistory.current.length > 1) {
        tabHistory.current.pop();
        navigation.navigate('MainTabs', {
          screen: tabHistory.current[tabHistory.current.length - 1],
        });
        return true;
      }

      const now = Date.now();
      if (now - lastBack < 2000) {
        BackHandler.exitApp();
        return true;
      }

      lastBack = now;
      ToastAndroid.show('Tekan sekali lagi untuk keluar', ToastAndroid.SHORT);
      return true;
    };

    const subscription = BackHandler.addEventListener('hardwareBackPress', handleBack);
    return () => subscription.remove();
  }, [navigation]));

  const openDetail = kost => navigation.navigate('Detail', { kostId: kost.id });
  const sharedProps = {
    styles,
    onOpen: openDetail,
    favorites: app.favorites,
    onToggleFavorite: app.toggleFavorite,
  };
  return (
    <Tabs.Navigator
      tabBar={props => <BottomBar {...props} onTabChange={recordTab} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="Home"
        options={{ tabBarIcon: ({ color }) => <FontAwesomeFreeSolid name="home" size={20} color={color} /> }}
      >
        {({ navigation: tabNavigation }) => (
          <HomeScreen
            {...sharedProps}
            search={app.search}
            setSearch={app.setSearch}
            setFilter={app.setFilter}
            setPage={page => {
              recordTab(page);
              tabNavigation.navigate(page);
            }}
          />
        )}
      </Tabs.Screen>
      <Tabs.Screen
        name="Explore"
        options={{ tabBarIcon: ({ color }) => <FontAwesomeFreeSolid name="compass" size={20} color={color} /> }}
      >
        {() => (
          <ExploreScreen
            {...sharedProps}
            search={app.search}
            setSearch={app.setSearch}
            filter={app.filter}
            setFilter={app.setFilter}
            filteredKosts={app.filteredKosts}
          />
        )}
      </Tabs.Screen>
      <Tabs.Screen
        name="Map"
        options={{ tabBarIcon: ({ color }) => <FontAwesomeFreeSolid name="map-marker-alt" size={20} color={color} /> }}
      >
        {() => <MapScreen {...sharedProps} />}
      </Tabs.Screen>
      <Tabs.Screen
        name="Profile"
        options={{ tabBarIcon: ({ color }) => <FontAwesomeFreeSolid name="user" size={20} color={color} /> }}
      >
        {() => <ProfileScreen styles={styles} setPage={page => navigation.navigate(page)} />}
      </Tabs.Screen>
    </Tabs.Navigator>
  );
}

function DetailRoute({ route, navigation }) {
  const { favorites, bookings, toggleFavorite, addBooking } = useApp();
  const kost = KOSTS.find(item => item.id === route.params.kostId);

  if (!kost) throw new Error(`Kost ${route.params.kostId} was not found`);

  return (
    <DetailScreen
      styles={styles}
      kost={kost}
      favorites={favorites}
      booking={bookings.includes(kost.id)}
      setBooking={() => addBooking(kost.id)}
      onBack={() => navigation.goBack()}
      onToggleFavorite={toggleFavorite}
    />
  );
}

function FavoritesRoute({ navigation }) {
  const { favorites, toggleFavorite } = useApp();
  return (
    <FavoritesScreen
      styles={styles}
      favorites={favorites}
      onOpen={kost => kost ? navigation.push('Detail', { kostId: kost.id }) : navigation.goBack()}
      onToggleFavorite={toggleFavorite}
    />
  );
}

function BookingsRoute({ navigation }) {
  const { bookings, favorites, toggleFavorite } = useApp();
  return (
    <BookingsScreen
      styles={styles}
      bookings={bookings}
      favorites={favorites}
      onOpen={kost => navigation.push('Detail', { kostId: kost.id })}
      onToggleFavorite={toggleFavorite}
      onBack={() => navigation.goBack()}
    />
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <AppProvider>
        <StatusBar style="dark" backgroundColor={BG} />
        <SafeAreaView style={styles.container} edges={['top']}>
          <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              <Stack.Screen name="MainTabs" component={MainTabs} />
              <Stack.Screen name="Detail" component={DetailRoute} />
              <Stack.Screen name="Favorites" component={FavoritesRoute} />
              <Stack.Screen name="Bookings" component={BookingsRoute} />
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaView>
      </AppProvider>
    </SafeAreaProvider>
  );
}
