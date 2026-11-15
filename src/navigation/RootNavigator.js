import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainTabs from './MainTabs';
import DetailScreen from '../features/account/DetailScreen';
import FavoritesScreen from '../features/account/FavoritesScreen';
import BookingsScreen from '../features/account/BookingsScreen';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="MainTabs" component={MainTabs} />
        <Stack.Screen name="Detail" component={DetailScreen} />
        <Stack.Screen name="Favorites" component={FavoritesScreen} />
        <Stack.Screen name="Bookings" component={BookingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
